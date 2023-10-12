export async function encodeTextCaesar(text) {
	return fetch('http://127.0.0.1:5000//encode/caesar-cipher', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				text: text,
			})
	});
}

export async function decryptTextCaesar(text) {
	return fetch('http://127.0.0.1:5000//decode/caesar-cipher', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({
			text: text,
		})
	});
}
