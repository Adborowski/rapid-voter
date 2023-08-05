import styles from "./room.module.css";
import VotingOption from "../voting-option/voting-option";
import { FormEvent, useState, useEffect } from "react";

type VotingRoomData = {
    votingRoomData: {
        roomId: string;
        roomName: string;
        votingOptions: string[];
        creationTime: number;
    };
};

interface RoomVote {
    _id: string;
    roomId: string;
    selectedOption: string;
}

interface VoteCount {
    [key: string]: number;
}

const Room = ({ votingRoomData }: VotingRoomData) => {
    const { roomId, roomName, votingOptions, creationTime } = votingRoomData;
    const readableDate = new Date(creationTime).toLocaleString();
    const [selectedOption, setSelectedOption] = useState();
    const [roomVotes, setRoomVotes] = useState<any[]>(); // all raw votes for the room
    const [voteCounts, setVoteCounts] = useState<VoteCount>(); // neatly counted votes, an obj of {option: count} items
    const [userAlreadyVoted, setUserAlreadyVoted] = useState<Boolean>(false);

    useEffect(() => {
        if (roomVotes) {
            const voteCounts = countVotes(roomVotes);
            if (voteCounts) {
                setVoteCounts(voteCounts);
            }
        }
    }, [roomVotes]);

    useEffect(() => {
        console.log("User voted already?", localStorage.getItem(roomId));
        if (localStorage.getItem(roomId)) {
            setUserAlreadyVoted(true);
            getRoomVotes(roomId);
        }
    }, []);

    const countVotes = (roomVotes: RoomVote[]) => {
        // create the voteCounts object which holds votingOption strings as keys and numbers as values
        const voteCounts = {} as VoteCount;
        for (let option of votingOptions) {
            voteCounts[option as keyof typeof voteCounts] = 0;
        }

        // count the votes
        roomVotes.forEach((vote) => {
            voteCounts[vote.selectedOption]++;
        });

        return voteCounts;
    };

    const handleChange = (e: any) => {
        console.log("handleChange");
        setSelectedOption(e.target.value);
    };

    const submitVote = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting vote for", selectedOption);

        fetch("/api/submit-vote", {
            method: "POST",
            body: JSON.stringify({
                roomId: roomId,
                selectedOption: selectedOption,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("[submit-vote]", data);
                getRoomVotes(roomId);
                setUserAlreadyVoted(true);

                if (data.acknowledged) {
                    localStorage.setItem(roomId, "1");
                }
            });
    };

    const getRoomVotes = (roomId: string) => {
        fetch("/api/get-room-votes", {
            method: "POST",
            body: JSON.stringify({
                roomId: roomId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("[get-room-results]", data);
                setRoomVotes(data.payload);
            });
    };

    return (
        <section className={styles.room}>
            <header>
                <h1>{roomName}</h1>
                <time>{readableDate}</time>
            </header>

            <form onChange={handleChange} onSubmit={submitVote}>
                {votingOptions.map((option) => {
                    return (
                        <VotingOption
                            voteCounts={voteCounts}
                            key={option}
                            name={option}
                            userAlreadyVoted={userAlreadyVoted}
                        />
                    );
                })}

                <div className={styles.controls}>
                    {!userAlreadyVoted && (
                        <button disabled={!selectedOption}>
                            {!selectedOption &&
                                !userAlreadyVoted &&
                                "Select an option"}
                            {selectedOption && "Vote for " + selectedOption}
                        </button>
                    )}

                    {userAlreadyVoted && (
                        <div className={styles.infoUserAlreadyVoted}>
                            <span>You have already voted.</span>
                        </div>
                    )}
                </div>
            </form>
        </section>
    );
};

export default Room;
