import styles from "./room.module.css";

type VotingRoomData = {
    votingRoomData: {
        roomId: string;
        roomName: string;
        votingOptions: string[];
        creationTime: number;
    };
};

const Room = ({ votingRoomData }: VotingRoomData) => {
    const { roomId, roomName, votingOptions, creationTime } = votingRoomData;

    const readableDate = new Date(creationTime).toLocaleString();
    console.log(readableDate);

    return (
        <section className={styles.room}>
            <div>{roomId}</div>
            <div>{readableDate}</div>
            <div>{roomName}</div>
        </section>
    );
};

export default Room;
