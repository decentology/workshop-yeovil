import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useAccount } from "@decentology/hyperverse-ethereum";
import Wallets from "./WalletModal";

const shortenHash = (
  hash: string = "",
  charLength: number = 6,
  postCharLength?: number
) => {
  let shortendHash;
  if (postCharLength) {
    shortendHash =
      hash.slice(0, charLength) +
      "..." +
      hash.slice(hash.length - postCharLength, hash.length);
  } else {
    shortendHash = hash.slice(0, charLength);
  }
  return shortendHash;
};

const Nav = () => {
  // return null;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [{ data }, disconnect] = useAccount();

  return (
    <nav>
      <Link href="/" passHref>
        <a className={styles.logo}>T</a>
      </Link>
      <div className={styles.rightNav}>
        <Link
          href="https://docs-hyperhack.decentology.com/learn-with-examples"
          passHref
        >
          <a target="_blank" rel="noreferrer">
            About
          </a>
        </Link>

        {!data ? (
          <button className={styles.connect} onClick={() => setShowModal(true)}>
            Connect Wallet
          </button>
        ) : (
          <button className={styles.logout} onClick={disconnect}>
            <span>{shortenHash(data?.address, 5, 5)}</span>
          </button>
        )}

        {showModal && <Wallets close={() => setShowModal(false)} />}
      </div>
    </nav>
  );
};

export default Nav;
