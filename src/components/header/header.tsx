import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
    return (
        <header className={styles.header}>
            <nav>
                <Link className={styles.link} href={"/"}>
                    New Vote
                </Link>
            </nav>
        </header>
    );
};

export default Header;
