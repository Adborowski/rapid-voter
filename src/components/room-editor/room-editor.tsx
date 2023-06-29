import styles from "./room-editor.module.css";

const RoomEditor = (props: any) => {
    const addOption = () => {};

    return (
        <div className={styles.roomEditor}>
            Edit room
            <div onClick={addOption} className={styles.newOption}>
                <input type="text"></input>
                <button type="button">+</button>
            </div>
        </div>
    );
};

export default RoomEditor;
