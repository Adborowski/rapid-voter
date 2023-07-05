import { FormEvent, useState } from "react";
import styles from "./room-editor.module.css";
import VotingOption from "../voting-option/voting-option";
import VotingOptionAdder from "../voting-option/voting-option-adder";

const RoomEditor = (props: any) => {
    const [votingOptions, setVotingOptions] = useState<string[]>([]);

    const addOptionHandler = (name: string) => {
        console.log("adding option...", name);
        setVotingOptions((options) => [...options, name]);
    };

    const removeOptionHandler = () => {
        console.log("removing option...");
    };

    return (
        <div className={styles.roomEditor}>
            <div className={styles.votingOptions}>
                {votingOptions.map((option) => (
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
                <button className={styles.save}>Save</button>
            </div>
        </div>
    );
};

export default RoomEditor;
