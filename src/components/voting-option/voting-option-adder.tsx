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
        if (newOptionText.current && newOptionText.current.value.length > 0) {
            addOptionHandler(newOptionText.current.value);
            newOptionText.current.value = "";
        }
    };
    return (
        <form
            onSubmit={handleNewVotingOption}
            className={`${styles.votingOption} ${styles.votingOptionAdder}`}
        >
            <button type="submit">
                <span>+</span>
            </button>
            <input
                ref={newOptionText}
                placeholder={"New voting option"}
                name="votingOption"
                type="text"
            />
        </form>
    );
};

export default VotingOptionAdder;
