import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useTribes } from "@decentology/hyperverse-ethereum-tribes";
import { useAccount } from "@decentology/hyperverse-ethereum";

const Home: NextPage = () => {
  const router = useRouter();
  const [{ data: account, error: accountErr }] = useAccount();
  const { TribeId } = useTribes();
  const { data, error: tribeIdErr } = TribeId();
  return (
    <>
      <Head>
        <title>Tribes Sample Project</title>
        <meta
          name="description"
          content="Sample project utilizing tribes module from hyperverse"
        />
      </Head>

      <main>
        <Nav />
        <div className={styles.hero}>
          <div className={styles.header}>
            <h1> Tribes</h1>
            {account ? (
              !data ? (
                <button
                  className={styles.join}
                  onClick={() => {
                    router.push("/all-tribes");
                  }}
                >
                  Join A Tribe
                </button>
              ) : (
                <button
                  className={styles.join}
                  onClick={() => router.push("/my-tribe")}
                >
                  View Your Tribe
                </button>
              )
            ) : null}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
