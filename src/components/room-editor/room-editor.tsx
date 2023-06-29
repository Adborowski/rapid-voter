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
    const addOption = (e: FormEvent) => {
        e.preventDefault();
        console.log("adding option...");
    };

    return (
        <div className={styles.roomEditor}>
            <div className={styles.votingOptions}>
                {votingOptions.map((option) => (
                    <VotingOption name={option} key={option} />
                ))}
                <VotingOptionAdder />
            </div>
        </div>
    );
};

export default RoomEditor;
