export async function encodeTextMonoalphabetic(text, cipherKey) {
  return fetch('http://127.0.0.1:5000/encode/monoalphabetic-cipher', {
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

export async function decodeTextMonoalphabetic(text, cipherKey) {
  return fetch('http://127.0.0.1:5000/decode/monoalphabetic-cipher', {
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

export async function generateMonoalphabeticKey() {
  return fetch('http://127.0.0.1:5000/generate/monoalphabetic-key', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  }).then((response) => {
    if (response.ok) { return response.json(); }
    return { data: '', };
  });
}
