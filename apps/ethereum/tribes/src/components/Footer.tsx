import styles from "../styles/Home.module.css";
import { useNetwork } from "@decentology/hyperverse-ethereum";

const Footer = () => {
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] =
    useNetwork();
  return (
    <>
      {switchNetwork && networkData.chain?.name !== "Rinkeby" && (
        <footer>
          <div className={styles.info}>
            <>
              <p>Please connect to Rinkeby</p>
              <button onClick={() => switchNetwork(4)}>
                Switch to Rinkeby
              </button>
            </>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
