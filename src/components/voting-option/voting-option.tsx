import styles from "./voting-option.module.css";

type VotingOptionProps = {
    name: string;
};

const VotingOption = (props: VotingOptionProps) => {
    const { name } = props;
    return (
        <label htmlFor={name} className={styles.votingOption}>
            <input id={name} name="votingOption" type="radio" />
            <span>{name}</span>
        </label>
    );
};

export default VotingOption;
