import styles from '../styles/Home.module.css'
import { useEthereum } from '@hyperverse/hyperverse-ethereum-tribes'

const Footer = () => {
  const { chainId } = useEthereum()
  const show = !!(chainId && chainId !== '4')

  return (
    <footer>
      {show && (
        <div className={styles.info}>
          <p>Connect to Testnet (Rinkeby)</p>
        </div>
      )}
    </footer>
  )
}

export default Footer
