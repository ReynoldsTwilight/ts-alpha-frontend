import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
// import { trpc } from "utils/trpc";
import { DropdownMenu } from "components/DropdownMenu"

export default function Home() {
  const { data: session } = useSession();
  // const checkingDDBB = trpc.useQuery(["user-get", { id: 4 }]);
  // console.log("home", checkingDDBB);
  return (
    <div className={styles.container}>
      <Head>
        <title>TS ALPHA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>HOME PAGE</h1>
        <section>I think we could add here the latest results of the leagues, grouped by date and leagues?</section>
        <DropdownMenu/>
      </main>
    </div>
  );
}
