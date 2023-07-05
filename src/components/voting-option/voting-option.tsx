import styles from "./voting-option.module.css";

type VotingOptionProps = {
    name: string;
    removable?: boolean;
    removeOptionHandler?: (name: string) => any;
};

const VotingOption = (props: VotingOptionProps) => {
    const { name, removable, removeOptionHandler } = props;

    return (
        <label htmlFor={name} className={styles.votingOption}>
            {removeOptionHandler && (
                <button
                    type="button"
                    className={styles.btnRemoveOption}
                    onClick={() => {
                        removeOptionHandler(name);
                    }}
                >
                    <span>-</span>
                </button>
            )}
            {!removable && <input id={name} name="votingOption" type="radio" />}
            <span>{name}</span>
        </label>
    );
};

export default VotingOption;
