import { FormEvent, useState } from "react";
import styles from "./room-editor.module.css";
import VotingOption from "../voting-option/voting-option";
import VotingOptionAdder from "../voting-option/voting-option-adder";

const RoomEditor = (props: any) => {
    const [votingOptions, setVotingOptions] = useState([
        "Pizza",
        "Pasta",
        "Salad",
        "Soup",
    ]);
    const addOptionHandler = (name: string) => {
        console.log("adding option...", name);
        setVotingOptions((options) => [...options, name]);
    };

    return (
        <div className={styles.roomEditor}>
            <div className={styles.votingOptions}>
                {votingOptions.map((option) => (
                    <VotingOption name={option} key={option} />
                ))}
                <VotingOptionAdder addOptionHandler={addOptionHandler} />
            </div>
        </div>
    );
};

export default RoomEditor;
