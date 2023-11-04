export async function encodeTextPratz(text, cipherKey) {
  return fetch('http://127.0.0.1:5000/encode/pratz-cipher', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      text: text,
      cipherKey: cipherKey,
    })
  }).then((response) => {
    if (response.ok) { return response.json(); }
    return { data: '', };
  });
}

export async function decodeTextPratz(text, cipherKey) {
  return fetch('http://127.0.0.1:5000/decode/pratz-cipher', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      text: text,
      cipherKey: cipherKey,
    })
  }).then((response) => {
    if (response.ok) { return response.json(); }
    return { data: '', };
  });
}
