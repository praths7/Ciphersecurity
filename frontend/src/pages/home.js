import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CAESAR_CIPHER } from '../constants/routeConstants';

export const HomePage = () => {
	const navigateTo = useNavigate();
	return (
		<div>
			<div>
				Home Page!
			</div>
			<Button
				variant='secondary'
				onClick={() => {
					navigateTo(CAESAR_CIPHER);
				}}
			>
				Caesar Cipher!
			</Button>
		</div>
	)
}