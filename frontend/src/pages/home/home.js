import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {
	CAESAR_CIPHER,
	HILL_CIPHER,
	HOMOPHONIC_CIPHER,
	MONOALPHABETIC_CIPHER,
	PRATZ_CIPHER,
	RGRID_CIPHER,
	VIGENERE_CIPHER
} from '../../constants/routeConstants';
import { PageContainer, HomeCard, Logo } from '../../common/styles';
import cipherIcon from '../../images/cyber-security.png';

export const HomePage = () => {
	const navigateTo = useNavigate();
	return (
		<PageContainer>
			<HomeCard>
				<div className="mb-4">
					<Logo src={cipherIcon}/>
					<h1 className='mt-4'>
						Welcome to Cypher It!
					</h1>
				</div>
				<div className="mb-4">
					<h5 className='mb-2'>
						Want to encode/decode your secret text?
					</h5>
					<p style={{ 'width': '70%', 'margin': 'auto' }}>
						Simply click on one of our cipher algorithms below and
						choose the option to either encode or decode your text.
					</p>
				</div>
				<div className="mb-1 container">
					<div className="row">
						<Button
							variant='outline-dark'
							className="col m-1 p-3"
							onClick={() => {
								navigateTo(CAESAR_CIPHER);
							}}
						>
							Caesar Cipher
						</Button>
						<Button
							variant='outline-dark'
							className="col m-1 p-3"
							onClick={() => {
								navigateTo(MONOALPHABETIC_CIPHER);
							}}
						>
							Monoalphabetic Cipher
						</Button>
					</div>
				</div>
				<div className="mb-1 container">
					<div className="row">
						<Button
							variant='outline-dark'
							className="col m-1 p-3"
							onClick={() => {
								navigateTo(HOMOPHONIC_CIPHER);
							}}
						>
							Homophonic Cipher
						</Button>
						<Button
							variant='outline-dark'
							className="col m-1 p-3"
							onClick={() => {
								navigateTo(VIGENERE_CIPHER);
							}}
						>
							Vigenere Cipher
						</Button>
					</div>
				</div>
				<div className="mb-1 container">
					<div className="row">
						<Button
							variant='outline-dark'
							className="col m-1 p-3"
							onClick={() => {
								navigateTo(HILL_CIPHER);
							}}
						>
							Hill Cipher
						</Button>
						<Button
							variant='outline-dark'
							className="col m-1 p-3"
							onClick={() => {
								navigateTo(RGRID_CIPHER);
							}}
						>
							r-Grid Cipher
						</Button>
					</div>
				</div>
				<Button
					variant='outline-dark'
					className="m-1 p-3"
					onClick={() => {
						navigateTo(PRATZ_CIPHER);
					}}
				>
					Pratz Cipher
				</Button>
			</HomeCard>
		</PageContainer>
	)
}