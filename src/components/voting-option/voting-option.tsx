import styles from "./voting-option.module.css";

interface VoteCount {
    [key: string]: number;
}

interface VotingOptionProps {
    name: string;
    removable?: boolean;
    removeOptionHandler?: (name: string) => any;
    voteHandler?: (name: string) => any;
    results?: VoteCount;
}

const VotingOption = (props: VotingOptionProps) => {
    const { name, removable, removeOptionHandler, results } = props;

    if (results && results[name]) {
        console.log(name, "got", results[name], "votes");
    } else {
        console.log("Nope");
    }

    return (
        <label
            htmlFor={name}
            className={`${styles.votingOption} ${
                removable ? styles.removable : ""
            }`}
            onClick={() => {
                removeOptionHandler ? removeOptionHandler(name) : "";
            }}
        >
            {removable && (
                <button
                    tabIndex={-1}
                    type="button"
                    className={styles.btnRemoveOption}
                >
                    <span>-</span>
                </button>
            )}
            {!removable && (
                <input
                    id={name}
                    value={name}
                    name="votingOption"
                    type="radio"
                />
            )}
            <div className={styles.optionInfo}>
                <span>{name}</span>
                {results && results[name] && <span>{results[name]}</span>}
            </div>
        </label>
    );
};

export default VotingOption;
