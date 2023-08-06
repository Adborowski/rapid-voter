import { useState, useRef } from "react";
import styles from "./room-editor.module.css";
import VotingOption from "../voting-option/voting-option";
import VotingOptionAdder from "../voting-option/voting-option-adder";
import RoomLink from "../room-link/room-link";
import { v4 as uuidv4 } from "uuid";

const RoomEditor = (props: any) => {
    const [votingOptions, setVotingOptions] = useState<string[]>([]);
    const [roomId, setRoomId] = useState();
    const [isSaving, setIsSaving] = useState<Boolean>();
    const [roomName, setRoomName] = useState<String>();

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
        setIsSaving(true);

        const newRoom = {
            roomName: roomName
                ? roomName
                : `Voting Room ${Math.floor(Math.random() * 10000)}`,
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
                console.log("[create-room]", data);
                setRoomId(data.roomId);
                setIsSaving(false);
            });
    };

    return (
        <div className={styles.roomEditor}>
            <div className={styles.roomNameInput}>
                <input
                    onChange={(e) => {
                        setRoomName(e.target.value);
                    }}
                    placeholder={"Enter your question"}
                ></input>
            </div>
            <div className={styles.votingOptions}>
                {votingOptions.map((option, index) => (
                    <VotingOption
                        name={option}
                        key={option}
                        removable={true}
                        removeOptionHandler={removeOptionHandler}
                        userAlreadyVoted={false}
                    />
                ))}
                <VotingOptionAdder addOptionHandler={addOptionHandler} />
            </div>
            <div className={styles.controls}>
                {!roomId && (
                    <button
                        disabled={votingOptions.length < 2}
                        onClick={() => {
                            createVotingRoom(votingOptions);
                        }}
                        className={styles.save}
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                )}
            </div>
            {roomId && <RoomLink roomId={roomId} />}
        </div>
    );
};

export default RoomEditor;
