import React, { useState, useEffect } from 'react'

const wallets = [
	{
		name: 'Wallet 1',
		icon: 'icon-1',
		amount: '100 ADA',
	},
	{
		name: 'Wallet 2',
		icon: 'icon-2',
		amount: '200 ADA',
	},
	{
		name: 'Wallet 3',
		icon: 'icon-3',
		amount: '300 ADA',
	},
]

const ConnectWallet = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedWallet, setSelectedWallet] = useState<object | null>([])

	useEffect(() => {
		const storedWallet = localStorage.getItem('selectedWallet')
		if (storedWallet) {
			setSelectedWallet(JSON.parse(storedWallet))
		}
	}, [])

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	const handleWalletSelection = (wallet: any) => {
		localStorage.setItem('selectedWallet', JSON.stringify(wallet))
		setSelectedWallet(wallet)
		setIsOpen(false)
	}

	const handleDisconnect = () => {
		localStorage.removeItem('selectedWallet')
		setSelectedWallet(null)
	}

	return (
		<div className='dropdown-button'>
			<button
				className='dropdown-button__button'
				onClick={toggleDropdown}
				onMouseEnter={toggleDropdown}
				onMouseLeave={toggleDropdown}
			>
				{selectedWallet ? (
					<>
						<span className={`icon-${selectedWallet.icon}`} />
						<span className='dropdown-button__wallet-name'>
							{selectedWallet.name}
						</span>
						<span className='dropdown-button__wallet-amount'>
							{selectedWallet.amount}
						</span>
					</>
				) : (
					'Connect'
				)}
			</button>
			{isOpen && (
				<ul className='dropdown-button__dropdown'>
					{wallets.map((wallet) => (
						<li key={wallet.name} onClick={() => handleWalletSelection(wallet)}>
							<span className={`icon-${wallet.icon}`} />
							<span className='dropdown-button__wallet-name'>
								{wallet.name}
							</span>
							<span className='dropdown-button__wallet-amount'>
								{wallet.amount}
							</span>
						</li>
					))}
				</ul>
			)}
			{selectedWallet && (
				<button
					className='dropdown-button__disconnect'
					onClick={handleDisconnect}
				>
					Disconnect
				</button>
			)}
		</div>
	)
}

export default ConnectWallet
