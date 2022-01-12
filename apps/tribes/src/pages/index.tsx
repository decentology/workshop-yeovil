import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
// @ts-ignore
import { useTribes } from '@hyperverse/hyperverse-ethereum-tribes'
import { useAccount } from '@hyperverse/hyperverse-ethereum'

const Home: NextPage = () => {
  const router = useRouter()
  const [{ data: account }] = useAccount()
  const { TribeId } = useTribes()
  const { data } = TribeId()

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
        <Footer />
      </main>
    </>
  )
}

export default Home
