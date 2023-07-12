import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header/header";
import RoomEditor from "@/components/room-editor/room-editor";
import { connectDatabase } from "../utils/db-util";

export default function Home(props: any) {
    return <RoomEditor />;
}
