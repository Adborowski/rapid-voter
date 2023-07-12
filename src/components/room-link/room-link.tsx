import styles from "./room-link.module.css";
import Link from "next/link";

type RoomLinkProps = {
    roomId: string;
};

const RoomLink = (props: RoomLinkProps) => {
    const { roomId } = props;
    return (
        <button className={styles.RoomLink}>
            <Link href={"/room/" + roomId}>See vote</Link>
        </button>
    );
};

export default RoomLink;
