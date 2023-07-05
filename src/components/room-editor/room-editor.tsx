import { FormEvent, useState } from "react";
import styles from "./room-editor.module.css";
import VotingOption from "../voting-option/voting-option";
import VotingOptionAdder from "../voting-option/voting-option-adder";
import { v4 as uuidv4 } from "uuid";

const RoomEditor = (props: any) => {
    const [votingOptions, setVotingOptions] = useState<string[]>([]);

    const addOptionHandler = (newOption: string) => {
        if (!votingOptions.includes(newOption)) {
            setVotingOptions((options) => [...options, newOption]);
        } else {
            console.error("ERROR: Option ", newOption, " already exists.");
        }
    };

    const removeOptionHandler = (optionToRemove: string) => {
        setVotingOptions((options) =>
            options.filter((option) => option !== optionToRemove)
        );
    };

    const createVotingRoom = (votingOptions: string[]) => {
        const newRoom = {
            roomName: `Sample Room ${Math.floor(Math.random() * 10000)}`,
            creationTime: Date.now(),
            roomId: uuidv4(),
            votingOptions: votingOptions,
        };

        fetch("/api/create-room", {
            method: "POST",
            body: JSON.stringify(newRoom),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Voting room created", data);
            });
    };

    return (
        <div className={styles.roomEditor}>
            <div className={styles.votingOptions}>
                {votingOptions.map((option, index) => (
                    <VotingOption
                        name={option}
                        key={option}
                        removable={true}
                        removeOptionHandler={removeOptionHandler}
                    />
                ))}
                <VotingOptionAdder addOptionHandler={addOptionHandler} />
            </div>
            <div className={styles.controls}>
                <button
                    onClick={() => {
                        createVotingRoom(votingOptions);
                    }}
                    className={styles.save}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default RoomEditor;
