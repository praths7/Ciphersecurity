export async function encodeTextHomophonic(text, cipherKey) {
  return fetch('http://127.0.0.1:5000/encode/homophonic-cipher', {
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

export async function decodeTextHomophonic(cipher, cipherKey) {
  return fetch('http://127.0.0.1:5000/decode/homophonic-cipher', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      text: cipher,
      cipherKey: cipherKey,
    })
  }).then((response) => {
    if (response.ok) { return response.json(); }
    return { data: '', };
  });
}

export async function getHomophonicMapping() {
  return fetch('http://127.0.0.1:5000/generate/homophonic-mapping', {
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
