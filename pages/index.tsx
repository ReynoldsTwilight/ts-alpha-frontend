import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { trpc } from "utils/trpc";

const getResultDisplay = ({ game }: { game: any }) => {
  return `${game.usaPlayer} (USA)  ${game.ratings_history.find((item:any) => item.player_id === game.usa_player_id).rating} vs   ${game.urssPlayer} (URSS) ${game.ratings_history.find((item:any) => item.player_id === game.ussr_player_id).rating} - Winner: ${game.gameWinner};`
};
// ratings_history: Array(2)
// 0: {id: '21828', created_at: '2022-02-19T19:21:52.000Z', updated_at: '2022-02-19T19:21:52.000Z', player_id: '461', rating: 4964, …}
// 1: {id: '21829', created_at: '2022-02-19T19:21:52.000Z', updated_at: '2022-02-19T19:21:52.000Z', player_id: '488', rating: 6276, …}
export default function Home() {
  const { data: session } = useSession();
  const { data } = trpc.useQuery(["game-getAll"]);
  console.log("data", data);
  return (
    <div className={styles.container}>
      <Head>
        <title>TS ALPHA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>HOME PAGE</h1>
        <section>Latest results:</section>
        <br />
        {data?.map((game: any) => {
          return <div key={game.id}>{getResultDisplay({ game })}</div>;
        })}
      </main>
    </div>
  );
}
