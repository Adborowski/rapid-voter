import styles from "./room-link.module.css";

type RoomLinkProps = {
    roomId: string;
};

const RoomLink = (props: RoomLinkProps) => {
    const { roomId } = props;
    return <div className={styles.RoomLink}>roomlink to {roomId}</div>;
};

export default RoomLink;
