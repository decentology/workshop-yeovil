import { useState } from 'react'
import { useRouter } from 'next/router'
// @ts-ignore
import { useTribes, useEthereum  } from '@hyperverse/hyperverse-ethereum-tribes'
import { SkynetClient } from 'skynet-js'
import styles from '../styles/Home.module.css'
import Loader from '../components/Loader'


const client = new SkynetClient('https://siasky.net')

const TENANT_ADDRESS = '0x9809ABAfe657533F4Fd409a4DDf442B093A8AEAe'
const Setup = () => {
  const router = useRouter()
  const { account, connectWallet } = useEthereum()
  const { CheckInstance, NewInstance, AddTribe } = useTribes()
  const [isLoadingAddTribe, setIsLoadingAddTribe] = useState(false)
  const [loaderMessage, setLoaderMessage] = useState('Processing...')
  const [imageFile, setImageFile] = useState<File>()
  const [formInput, updateInput] = useState({
    name: '',
    description: '',
  })

  const { data } = CheckInstance()
  const { mutate, isLoading: isCreateInstanceLoading } = NewInstance()
  const isLoading = isLoadingAddTribe || isCreateInstanceLoading
  const { mutate: addTribe } = AddTribe({
    onSuccess: () => { 
      setIsLoadingAddTribe(false) 
      console.log('success')}
  })
  const addNewTribe = async () => {
    try {
      setIsLoadingAddTribe(true)
      setLoaderMessage('Uploading image...')
      const { skylink } = await client.uploadFile(imageFile!)
      const data = JSON.stringify({
        name: formInput.name,
        description: formInput.description,
        image: skylink.replace('sia://', ''),
      })
      setLoaderMessage('Uploading Metadata...')
      const { skylink: file } = await client.uploadFile(
        new File([data], 'metadata.json'),
      )

      try {
        setLoaderMessage('Intiating Transaction...')
        addTribe(file.replace('sia://', ''))
        setLoaderMessage('Processing Transaction...')
        
      } catch {}
    } catch {}
  }

  return (
    <main>
      {isLoading ? (
        <Loader loaderMessage={loaderMessage} />
      ) : (
        <div className={styles.hero}>
          {account && !data && (
            <>
              <button className={styles.join} type="submit" onClick={() => mutate()}>
                Create Instance
              </button>
              <p className={styles.error}>
                If you already created an instance, change the Tenant in shared.ts to the
                signer address.
              </p>
            </>
          )}
          {!account ? (
            <div className={styles.container2}>
              <button className={styles.connect} type="submit" onClick={connectWallet}>
                Connect Wallet
              </button>
            </div>
          ) : account?.toLowerCase() === TENANT_ADDRESS.toLowerCase() ? (
            <div className={styles.container2}>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  updateInput({ ...formInput, name: e.target.value })
                }
              />
              <input
                type="file"
                id="tribe-image"
                name="tribe image"
                accept="image/*, .jpg"
                onChange={(e) => setImageFile(e!.target!.files![0])}
              />
              <input
                type="text"
                placeholder="Description"
                onChange={(e) =>
                  updateInput({ ...formInput, description: e.target.value })
                }
              />
              <button className={styles.join} type="submit" onClick={addNewTribe}>
                Add Tribe
              </button>
            </div>
          ) : (
            <div className={styles.container2}>
              <h4 className={styles.error}>You are not the owner of this project.</h4>
              <h4 className={styles.error}>
                If you are, please use the right tenant address for this
                project.
              </h4>
            </div>
          )}
          <button
            className={styles.connect}
            type="submit"
            onClick={() => router.push('/')}
          >
            Home
          </button> 
        </div>
      )}
    </main>
  ) 
}
export default Setup
