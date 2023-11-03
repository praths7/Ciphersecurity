export async function encodeTextHill(text, cipherKey) {
  return fetch('http://127.0.0.1:5000/encode/hill-cipher', {
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

export async function decodeTextHill(text, cipherKey) {
  return fetch('http://127.0.0.1:5000/decode/hill-cipher', {
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

export async function checkModInverse(value) {
  return fetch('http://127.0.0.1:5000/check/mod-inverse', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      value: value,
    })
  }).then((response) => {
    if (response.ok) { return response.json(); }
    return { data: '', };
  });
}

export async function generateHillKey() {
  return fetch('http://127.0.0.1:5000/generate/hill-key', {
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
