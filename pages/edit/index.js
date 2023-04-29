import { useState, useEffect } from 'react'
import { useWallet, useAssets } from '@meshsdk/react'
import { AssetCard, Meta } from '../../components'
import { data } from '../../data/royal'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

// const POLICY_ID = "0041a2fd8c4cbe28323a874baf3683c500f8bd173f6192ded1ef1804";

export default function Home() {
	const [nfts, setNfts] = useState({})
	const [hasPolicyIdAssetsChecked, setHasPolicyIdAssetsChecked] = useState(false)

	const { connected, wallet } = useWallet()
	const assets = useAssets()
	const router = useRouter()
	const params = router.asPath.split('/')[3]


	// const checkPolicyIdAssets = async () => {
	//   if (connected && wallet) {
	//     const assets = await wallet.getPolicyIdAssets(POLICY_ID);

	//     if (assets.length <= 0) {
	//       setHasPolicyIdAssetsChecked(false); // No assets found with the given policy ID
	//     } else {
	//       setHasPolicyIdAssetsChecked(true); // Assets found with the given policy ID
	//     }
	//   }
	// };

	// useEffect(() => {
	//   checkPolicyIdAssets();
	// }, [connected, assets]);

	useEffect(() => {
		const getNfts = async () => {
			try {
				const res = await axios.post(
					'http://localhost:3000/api/transactions',
					{ params: params }
				)
				const mergeRes = [].concat(...res.data)
                // console.log(mergeRes)
				setNfts(mergeRes)
			} catch (err) {
				console.log(err)
			}
		}
		getNfts()
	}, [])
console.log(nfts)
	return (
		<>
			<Meta title='Heroes NFTS' description='DirectEd Heroes NFTs' />
			<main className='nft-assets'>
				<div className='nft-assets'></div>
				{/* {hasPolicyIdAssetsChecked ? ( */}
				<>
					<h3>Pick which Hero you’d like</h3>
					<div className='nft-assets__singlenfts'>
						{nfts.length > 0 &&
							nfts.map((item) => {
								return (
									<Link
										target='_blank'
										key={item.id}
										href={{
                                            pathname: `/update-metadata`,
                                            query: item.uid
                                        }}
									>
										<img
											src={`https://ipfs.io/ipfs/${
												item.ipfsLink.split('/')[2]
											}`}
											alt={item.title}
											width={200}
											height={200}
										/>
									</Link>
								)
							})}
					</div>
				</>
				{/* ) : (
          <h3 className="donors-portal__no-donation">
            Donate to a pool here to receive the token that unlocks this page!
          </h3>
        )} */}
			</main>
		</>
	)
}
