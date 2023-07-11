import styles from "./room-link.module.css";
import Link from "next/link";

type RoomLinkProps = {
    roomId: string;
};

const RoomLink = (props: RoomLinkProps) => {
    const { roomId } = props;
    return (
        <div className={styles.RoomLink}>
            <Link href={"/room/" + roomId}>Go to room</Link>
        </div>
    );
};

export default RoomLink;
