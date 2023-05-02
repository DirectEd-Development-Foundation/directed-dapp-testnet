import { useState, useEffect } from 'react'
import { useWallet, useWalletList } from '@meshsdk/react'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'
import Image from 'next/image'

interface Wallet {
	name: string
	icon: string
}

const ConnectWallet = () => {
	const { connect, disconnect, connecting } = useWallet()
	const wallets = useWalletList()

	const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)

	useEffect(() => {
		const storedWallet = localStorage.getItem('selectedWallet')
		if (storedWallet) {
			setSelectedWallet(JSON.parse(storedWallet))
			connect(JSON.parse(storedWallet).name)
		}
	}, [])

	const handleWalletSelection = (wallet: Wallet) => {
		localStorage.setItem('selectedWallet', JSON.stringify(wallet))
		setSelectedWallet(wallet)
		connect(wallet.name)
	}

	const handleDisconnect = () => {
		localStorage.removeItem('selectedWallet')
		disconnect()
		setSelectedWallet(null)
	}

	return (
		<Dropdown
			title={
				<Button variant='accent'>
					{selectedWallet ? (
						<div className='flex-gap'>
							<span>{selectedWallet.name}</span>
							<Image
								src={selectedWallet.icon}
								alt={selectedWallet.name}
								width='30'
								height='30'
							/>
						</div>
					) : connecting ? (
						'Connecting'
					) : (
						<div className='connect-button'>
							<div>Connect Wallet</div>
						</div>
					)}
				</Button>
			}
		>
			<div className='connect-wallet'>
				{!selectedWallet && !connecting && (
					<ul>
						{wallets.map((wallet: Wallet) => (
							<li
								key={wallet.name}
								onClick={() => handleWalletSelection(wallet)}
							>
								<span className='dropdown-button__wallet-name'>
									{wallet.name}
								</span>
								<Image
									src={wallet.icon}
									alt={wallet.name}
									width='30'
									height='30'
								/>
							</li>
						))}
					</ul>
				)}
				{selectedWallet && (
					<div className='connect-wallet__disconnect'>
						<Button variant='outline' onClick={handleDisconnect} noShadow>
							Disconnect
						</Button>
					</div>
				)}
			</div>
		</Dropdown>
	)
}

export default ConnectWallet
