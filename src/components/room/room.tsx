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

interface VoteCount {
    [key: string]: number;
}

const Room = ({ votingRoomData }: VotingRoomData) => {
    const { roomId, roomName, votingOptions, creationTime } = votingRoomData;
    const readableDate = new Date(creationTime).toLocaleString();
    const [selectedOption, setSelectedOption] = useState();
    const [roomVotes, setRoomVotes] = useState<any[]>();

    useEffect(() => {
        if (roomVotes) {
            // create the voteCounts option which holds votingOptions as keys and numbers as values
            const voteCounts = {} as VoteCount;
            for (let option of votingOptions) {
                voteCounts[option as keyof typeof voteCounts] = 0;
            }

            // count the votes
            roomVotes.forEach((vote) => {
                voteCounts[vote.selectedOption]++;
            });

            console.log("voteCounts", voteCounts);
        }
    }, [roomVotes]);

    const handleChange = (e: any) => {
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
                    return <VotingOption key={option} name={option} />;
                })}

                <div className={styles.controls}>
                    <button disabled={!selectedOption}>
                        {!selectedOption && "Select an option"}
                        {selectedOption && "Vote for " + selectedOption}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Room;
