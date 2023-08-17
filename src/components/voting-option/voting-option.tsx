import styles from './voting-option.module.css'

interface VoteCount {
   [key: string]: number
}

// it's a string for purposes of CSS and display
interface VotePercentage {
   [key: string]: string
}

interface VotingOptionProps {
   name: string
   removable?: boolean
   removeOptionHandler?: (name: string) => any
   voteHandler?: (name: string) => any
   voteCounts?: VoteCount
   userAlreadyVoted: boolean
   enabled: boolean
   previouslySelectedOption?: string
}

const VotingOption = (props: VotingOptionProps) => {
   const {
      name,
      removable,
      removeOptionHandler,
      voteCounts,
      userAlreadyVoted,
      enabled,
      previouslySelectedOption,
   } = props

   // sum the votecount and arrive at one number
   // used to determine % of vote
   const sumVotes = (voteCounts: VoteCount) => {
      return Object.values(voteCounts).reduce((a, b) => a + b, 0)
   }

   const getVotePercentages = (voteCounts: VoteCount) => {
      const totalVotes = sumVotes(voteCounts) // how many votes casted in total in this room
      let votePercentages: VotePercentage = {}
      Object.keys(voteCounts).forEach((key) => {
         votePercentages[key] = ((voteCounts[key] / totalVotes) * 100).toFixed(0).toString() + '%'
      })
      return votePercentages
   }

   if (voteCounts && voteCounts[name]) {
      getVotePercentages(voteCounts)
   }

   return (
      <label
         htmlFor={name}
         className={`${styles.votingOption} ${removable ? styles.removable : ''} ${
            !enabled ? styles.votingDisabled : ''
         }`}
         onClick={() => {
            removeOptionHandler ? removeOptionHandler(name) : ''
         }}
      >
         {removable && (
            <button tabIndex={-1} type="button" className={styles.btnRemoveOption}></button>
         )}
         {!removable && (
            <input
               id={name}
               value={name}
               name="votingOption"
               type="radio"
               defaultChecked={previouslySelectedOption === name ? true : false}
               disabled={!enabled}
            />
         )}
         <div className={styles.optionInfo}>
            <div className={styles.optionNameWrapper}>
               <span>{name}</span>
            </div>

            {voteCounts && voteCounts[name] > 0 && (
               <div className={styles.voteStats}>
                  <div className={styles.voteStatWrapper}>
                     <span>{voteCounts[name]}</span>
                  </div>
                  <div className={`${styles.voteStatWrapper} ${styles.votePercentage}`}>
                     <span>{getVotePercentages(voteCounts)[name]}</span>
                  </div>
               </div>
            )}
         </div>

         <div
            style={{
               maxWidth: voteCounts ? getVotePercentages(voteCounts)[name] : '0%',
            }}
            className={styles.percentageBar}
         ></div>
      </label>
   )
}

export default VotingOption
