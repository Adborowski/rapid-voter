import styles from "./voting-option.module.css";

const VotingOptionAdder = () => {
    return (
        <label className={styles.votingOption}>
            <button>+</button>
            <input
                placeholder={"add new option"}
                name="votingOption"
                type="text"
            />
        </label>
    );
};

export default VotingOptionAdder;
