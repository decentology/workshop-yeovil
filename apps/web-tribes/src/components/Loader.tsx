import styles from '../styles/Home.module.css'

const Loader = ({loaderMessage}:{loaderMessage: string}) => {
    return (
        <div className={styles.container}>
        <div className={styles.loader}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h4>{loaderMessage}</h4>
      </div>
    )
}

export default Loader