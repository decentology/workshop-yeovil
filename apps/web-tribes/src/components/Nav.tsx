import Link from 'next/link'
import styles from '../styles/Home.module.css'
// @ts-ignore
import {
  useEthereum,
} from '@hyperverse/hyperverse-ethereum-tribes'

const shortenHash = (
  hash: string = '',
  charLength: number = 6,
  postCharLength?: number,
) => {
  let shortendHash
  if (postCharLength) {
    shortendHash =
      hash.slice(0, charLength) +
      '...' +
      hash.slice(hash.length - postCharLength, hash.length)
  } else {
    shortendHash = hash.slice(0, charLength)
  }
  return shortendHash
}

const Nav = () => {
  const { account, connectWallet, logout } = useEthereum()
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

        {!account ? (
          <button
            className={styles.connect}
            onClick={() => {
              connectWallet()
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <button className={styles.logout} onClick={logout}>
            <span>{shortenHash(account, 5, 5)}</span>
          </button>
        )}
      </div>
    </nav>
  )
}

export default Nav
