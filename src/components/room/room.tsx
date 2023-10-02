import styles from './room.module.css'
import VotingOption from '../voting-option/voting-option'
import { FormEvent, useState, useEffect } from 'react'
import { AvailableRoomSettings } from '@/utils/types'
import DisplayTimeLimit from './display-time-limit'
import { hasTimeLimitElapsed } from '@/utils/time-util'
import RoomSharing from '../room-sharing/room-sharing'

type VotingRoomData = {
   votingRoomData: {
      roomId: string
      roomName: string
      votingOptions: string[]
      creationTime: number
      roomSettings: AvailableRoomSettings
   }
}

interface RoomVote {
   _id: string
   roomId: string
   selectedOption: string
}

interface VoteCount {
   [key: string]: number
}

const Room = ({ votingRoomData }: VotingRoomData) => {
   const { roomId, roomName, votingOptions, creationTime, roomSettings } = votingRoomData
   const { login_required, time_limit } = roomSettings
   const readableCreationDate = new Date(creationTime).toLocaleString()
   const [selectedOption, setSelectedOption] = useState<string>()
   const [roomVotes, setRoomVotes] = useState<any[]>() // all raw votes for the room
   const [voteCounts, setVoteCounts] = useState<VoteCount>() // neatly counted votes, an obj of {option: count} items
   const [userAlreadyVoted, setUserAlreadyVoted] = useState<boolean>(false)
   const [votingEnabled, setVotingEnabled] = useState<boolean>(true)

   useEffect(() => {
      if (roomVotes) {
         const voteCounts = countVotes(roomVotes)
         if (voteCounts) {
            setVoteCounts(voteCounts)
         }
      }
   }, [roomVotes])

   useEffect(() => {
      if (localStorage.getItem(roomId)) {
         const previouslySelectedOption = localStorage.getItem(roomId)
         console.log(`%cUser has voted already for: ${previouslySelectedOption}.`, 'color: yellow')
         setUserAlreadyVoted(true)
         setVotingEnabled(false)
         getRoomVotes(roomId)
         if (previouslySelectedOption) {
            setSelectedOption(previouslySelectedOption) // does not work
         }
      }

      if (time_limit && hasTimeLimitElapsed(time_limit)) {
         setVotingEnabled(false)
         getRoomVotes(roomId)
      }
   }, [])

   const countVotes = (roomVotes: RoomVote[]) => {
      // create the voteCounts object which holds votingOption strings as keys and numbers as values
      const voteCounts = {} as VoteCount
      for (let option of votingOptions) {
         voteCounts[option as keyof typeof voteCounts] = 0
      }

      // count the votes
      roomVotes.forEach((vote) => {
         voteCounts[vote.selectedOption]++
      })

      return voteCounts
   }

   const handleChange = (e: any) => {
      setSelectedOption(e.target.value)
   }

   const submitVote = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('Submitting vote for', selectedOption)

      fetch('/api/submit-vote', {
         method: 'POST',
         body: JSON.stringify({
            roomId: roomId,
            selectedOption: selectedOption,
         }),
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log('[submit-vote]', data)
            getRoomVotes(roomId)
            setUserAlreadyVoted(true)
            setVotingEnabled(false)

            if (data.acknowledged && selectedOption) {
               localStorage.setItem(roomId, selectedOption)
            }
         })
   }

   const getRoomVotes = (roomId: string) => {
      fetch('/api/get-room-votes', {
         method: 'POST',
         body: JSON.stringify({
            roomId: roomId,
         }),
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log('[get-room-results]', data)
            setRoomVotes(data.payload)
         })
   }

   return (
      <section className={styles.room}>
         <header>
            <h1>{roomName}</h1>
            <time>{readableCreationDate}</time>
         </header>

         {time_limit && <DisplayTimeLimit timeLimit={time_limit} />}

         <form onChange={handleChange} onSubmit={submitVote}>
            {votingOptions.map((option) => {
               return (
                  <VotingOption
                     voteCounts={voteCounts}
                     key={option}
                     name={option}
                     userAlreadyVoted={userAlreadyVoted}
                     enabled={votingEnabled}
                     previouslySelectedOption={selectedOption}
                  />
               )
            })}

            <div className={styles.controls}>
               {!userAlreadyVoted && (
                  <button disabled={!selectedOption}>
                     {!selectedOption && !userAlreadyVoted && 'Select an option'}
                     {selectedOption && 'Vote for ' + selectedOption}
                  </button>
               )}

               {userAlreadyVoted && (
                  <div className={styles.infoUserAlreadyVoted}>
                     <span>You have voted for: {selectedOption}</span>
                     <button
                        className={styles.resetButton}
                        onClick={() => {
                           setUserAlreadyVoted(false)
                           setVotingEnabled(true)
                        }}
                     >
                        [DEV] Enable voting
                     </button>
                  </div>
               )}

               <RoomSharing />
            </div>
         </form>
      </section>
   )
}

export default Room
