import styles from "./voting-option.module.css";
import { FormEvent, useRef } from "react";

type VotingOptionAdderProps = {
    addOptionHandler: Function;
};

const VotingOptionAdder = (props: VotingOptionAdderProps) => {
    const newOptionText = useRef<HTMLInputElement>(null);
    const { addOptionHandler } = props;

    const handleNewVotingOption = (e: FormEvent) => {
        e.preventDefault();
        if (newOptionText.current) {
            addOptionHandler(newOptionText.current.value);
        }
    };
    return (
        <form onSubmit={handleNewVotingOption} className={styles.votingOption}>
            <button type="submit">+</button>
            <input
                ref={newOptionText}
                placeholder={"add new option"}
                name="votingOption"
                type="text"
            />
        </form>
    );
};

export default VotingOptionAdder;
