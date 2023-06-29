import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header/header";
import RoomEditor from "@/components/room-editor/room-editor";

export default function Home() {
    return (
        <>
            <Head>
                <title>rapid-voter</title>
                <meta name="description" content="Take opinions in a blink" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <RoomEditor />
        </>
    );
}
