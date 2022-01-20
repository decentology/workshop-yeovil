import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { useConnect } from 'wagmi'
type ModalProps = {
  close: () => void
}

const WalletModal = ({ close }: ModalProps) => {
  const [{ data, error: connectError }, connect] = useConnect()

  const connectors = data.connectors.map((val) => {
    return { name: val.name, connect: () => connect(val) }
  })
  
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeModal} onClick={close}>
          &times;
        </button>
        <div className={styles.modalContainer}>
          {connectors &&
            connectors.map(({ name, connect }) => {
              return (
                <button
                  key={name}
                  className={styles.connect}
                  onClick={() => {
                    connect()
                    close()
                  }}
                >
                  <span>
                    <Image
                      src={`/${name}.png`}
                      alt={name}
                      width={30}
                      height={30}
                    />
                    <h5>{name}</h5>
                  </span>
                </button>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default WalletModal
