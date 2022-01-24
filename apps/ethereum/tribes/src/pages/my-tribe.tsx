import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useTribes } from "@decentology/hyperverse-ethereum-tribes";
import { useAccount } from "@decentology/hyperverse-ethereum";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import Loader from "../components/Loader";

const getTribeData = async (data: string) => {
  const json = JSON.parse(
    // eslint-disable-next-line no-await-in-loop
    await (await fetch(`https://siasky.net/${data}`)).text()
  );
  return json;
};

const TribesPage = () => {
  const router = useRouter();
  const [{ data: account }] = useAccount();
  const { Tribe, Leave } = useTribes();
  const { data: tribeHash, isLoading: tribeDataLoading } = Tribe();
  const { mutate, isLoading: leaveTribeLoading } = Leave({
    onSuccess: () => router.push("/"),
  });

  const { data, isLoading: tribeDataSiaLoading } = useQuery(
    ["tribeData", tribeHash],
    () => getTribeData(tribeHash!),
    {
      enabled: !!tribeHash,
    }
  );
  const isLoading =
    tribeDataLoading || leaveTribeLoading || tribeDataSiaLoading;

  return (
    <main>
      <Nav />
      {isLoading ? (
        <Loader loaderMessage="Processing..." />
      ) : account && data ? (
        <div className={styles.container2}>
          <div className={styles.container3}>
            {data.image === "N/A" ? (
              <div className={styles.tribeCard}>
                <h2>{data.name}</h2>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://siasky.net/${data.image}/`}
                alt={data.name}
                className={styles.tribe}
              />
            )}

            <div>
              <h1 className={styles.text}>{data.name}</h1>
              <p className={styles.description}>{data.description}</p>
            </div>
          </div>
          <button className={styles.join} onClick={() => mutate()}>
            Leave Tribe
          </button>
        </div>
      ) : (
        account && (
          <div className={styles.container2}>
            <button
              className={styles.join}
              onClick={() => router.push("/all-tribes")}
            >
              Join a Tribe
            </button>
          </div>
        )
      )}

      {!account && (
        <div className={styles.container2}>
          <p className={styles.error}>Connect Wallet to view your tribe</p>
        </div>
      )}
    </main>
  );
};

export default TribesPage;
