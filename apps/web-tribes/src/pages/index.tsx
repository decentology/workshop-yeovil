import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTribes, useEthereum } from '@hyperverse/hyperverse-ethereum-tribes'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav'
import Loader from '../components/Loader'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  const router = useRouter()
  const { account } = useEthereum()
  const { TribeId } = useTribes()
  const { data, isLoading: tribeIdLoading } = TribeId()
  const isLoading = tribeIdLoading

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
        {isLoading ? (
          <Loader loaderMessage="loading..." />
        ) : (
          <div className={styles.hero}>
            <div className={styles.header}>
              <h1> Tribes</h1>
              {account ? (
                !data ? (
                  <button
                    className={styles.join}
                    onClick={() => {
                      router.push('/all-tribes')
                    }}
                  >
                    Join A Tribe
                  </button>
                ) : (
                  <button
                    className={styles.join}
                    onClick={() => router.push('/my-tribe')}
                  >
                    View Your Tribe
                  </button>
                )
              ) : null}
            </div>
          </div>
        )}
        <Footer />
      </main>
    </>
  )
}

export default Home
