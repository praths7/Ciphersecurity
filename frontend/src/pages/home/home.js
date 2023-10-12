import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CAESAR_CIPHER } from '../../constants/routeConstants';
import { HomeCard, Logo } from './style';
import cipherIcon from '../../images/cipher.png';

export const HomePage = () => {
	const navigateTo = useNavigate();
	return (
		<HomeCard>
			<div className="mb-5">
				<Logo src={cipherIcon}/>
				<h1 className='mt-4'>
					Welcome to Cypher It!
				</h1>
			</div>
			<div className="mb-5">
				<h5 className='mb-2'>
					Want to encode/decode your secret text?
				</h5>
				<p style={{ 'width': '70%', 'margin': 'auto' }}>
					Simply click one of our cipher algorithms below and
					choose the option to either encode or decode your text!
				</p>
			</div>
			<Button
				variant='outline-dark'
				className="mb-3 p-2"
				onClick={() => {
					navigateTo(CAESAR_CIPHER);
				}}
			>
				Caesar Cipher
			</Button>
			<Button
				variant='outline-dark'
				className="p-2"
				onClick={() => {
					navigateTo(CAESAR_CIPHER);
				}}
			>
				Playfair Cipher
			</Button>
		</HomeCard>
	)
}