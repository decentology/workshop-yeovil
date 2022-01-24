import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav'
import Loader from '../components/Loader'
import { useTribes } from '@decentology/hyperverse-ethereum-tribes'
import { useAccount } from '@decentology/hyperverse-ethereum'


const getData = async (data: { id: number; txn: string }[]) => {
  return Promise.all(
    data.map(async ({ id, txn }) => {
      const link = txn.replace('sia:', '')
      const json = JSON.parse(
        // eslint-disable-next-line no-await-in-loop
        await (await fetch(`https://siasky.net/${link}`)).text(),
      )
      return { id, ...json }
    }),
  )
}

const AllTribes = () => {
  const [{ data: account }] = useAccount()
  const { Tribes, Join, useTribeEvents, contract } = useTribes()
  const router = useRouter()
  const { data: tribeHash, isLoading: allTribesLoading } = Tribes()

  const { mutate, isLoading: joinTribeLoading } = Join({
    onSuccess: () => router.push('/my-tribe'),
  })
  const { data, isLoading: loadingTribeData } = useQuery(
    ['allTribes', tribeHash],
    () => getData(tribeHash!),
    {
      enabled: !!tribeHash,
    },
  )
  const isLoading = allTribesLoading || joinTribeLoading || loadingTribeData

  return (
    <main>
      <Nav />
      {isLoading ? (
        <Loader loaderMessage="processing..." />
      ) : (
        <div className={styles.container}>
          <h1>Tribes</h1>
          {account ? (
            !data ? (
              <>
                <h5>There are currently no existing tribes.</h5>
                <a href="/">Go back home</a>
              </>
            ) : (
              <>
                <h5>Select Your Tribe</h5>
                <div className={styles.allTribes}>
                  {data.map((item) => (
                    <div key={item.id} onClick={() => mutate(item.id)}>
                      <img
                        className={styles.cards}
                        src={`https://siasky.net/${item.image.replace(
                          'sia:',
                          '',
                        )}/`}
                        alt={item.name}
                      />
                    </div>
                  ))}
                </div>
              </>
            )
          ) : (
            <p className={styles.error}>
              Please connect your wallet to join a tribe.
            </p>
          )}
        </div>
      )}
    </main>
  )
}

export default AllTribes
