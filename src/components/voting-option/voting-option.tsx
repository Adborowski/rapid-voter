import styles from "./voting-option.module.css";

interface VoteCount {
    [key: string]: number;
}

// it's a string for purposes of CSS and display
interface VotePercentage {
    [key: string]: string;
}

interface VotingOptionProps {
    name: string;
    removable?: boolean;
    removeOptionHandler?: (name: string) => any;
    voteHandler?: (name: string) => any;
    voteCounts?: VoteCount;
    userAlreadyVoted: Boolean;
}

const VotingOption = (props: VotingOptionProps) => {
    const {
        name,
        removable,
        removeOptionHandler,
        voteCounts,
        userAlreadyVoted,
    } = props;

    console.log("voteCounts", voteCounts);

    // sum the votecount and arrive at one number
    // used to determine % of vote
    const sumVotes = (voteCounts: VoteCount) => {
        return Object.values(voteCounts).reduce((a, b) => a + b, 0);
    };

    const getVotePercentages = (voteCounts: VoteCount) => {
        const totalVotes = sumVotes(voteCounts); // how many votes casted in total in this room
        let votePercentages: VotePercentage = {};
        Object.keys(voteCounts).forEach((key) => {
            votePercentages[key] =
                ((voteCounts[key] / totalVotes) * 100).toFixed(0).toString() +
                "%";
        });
        console.log(votePercentages);
        return votePercentages;
    };

    if (voteCounts && voteCounts[name]) {
        getVotePercentages(voteCounts);
    } else {
        console.log("No voteCounts.");
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
                    disabled={userAlreadyVoted}
                />
            )}
            <div className={styles.optionInfo}>
                <span>{name}</span>
                {voteCounts && voteCounts[name] > 0 && (
                    <div className={styles.voteStats}>
                        <span>{voteCounts[name]}</span>
                        <span>{getVotePercentages(voteCounts)[name]}</span>
                    </div>
                )}
            </div>

            <div
                style={{
                    maxWidth: voteCounts
                        ? getVotePercentages(voteCounts)[name]
                        : "0%",
                }}
                className={styles.percentageBar}
            ></div>
        </label>
    );
};

export default VotingOption;
