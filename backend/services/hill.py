import math
import string
import numpy as np

PADDING = 25
alphabet = list(string.ascii_lowercase)

def find_mod_inv(a, m):
    for x in range(1, m):
        if (a % m) * (x % m) % m == 1:
            return x
    return -1

def encode_hill(text, key):
    ekey = []
    for letter in key:
        ekey.append(alphabet.index(letter) + 1)
    key_matrix = np.mat(ekey).reshape(-1, 2).T
    x_dim = key_matrix.shape[0]
    etext = []
    buffer = []
    i = 1
    for letter in text:
        buffer.append(alphabet.index(letter) + 1)
        if (i % x_dim == 0):
            etext.append(buffer)
            buffer = []
        i += 1
    ignore = 0
    if (len(buffer) > 0):
        i = len(buffer)
        while (i < x_dim):
            buffer.append(PADDING)
            i += 1
            ignore += 1
        etext.append(buffer)
    encoding = ''
    for instance in etext:
        imatrix = np.mat(instance).reshape(1, x_dim)
        product = np.matmul(imatrix, key_matrix) % len(alphabet)
        anchors = np.squeeze(np.asarray(product))
        for a in anchors:
            encoding += alphabet[a - 1]
    """
    if (ignore > 0):
        return encoding[:-ignore]
    """
    return encoding

def decode_hill(cipher, key):
    ekey = []
    for letter in key:
        ekey.append(alphabet.index(letter) + 1)
    key_matrix = np.mat(ekey).reshape(-1, 2).T
    x_dim = key_matrix.shape[0]
    ecipher = []
    for e in cipher:
        ecipher.append(alphabet.index(e) + 1)

    # find modular inverse of a matrix
    k_det = int(np.rint(abs(np.linalg.det(key_matrix))))
    # find modulus of inverse number
    mod_inv = find_mod_inv(k_det, len(alphabet))
    inv_det = abs(mod_inv - len(alphabet))
    print(mod_inv, k_det, inv_det)

    print(key_matrix)

    converted = np.squeeze(np.asarray(key_matrix))
    a = converted[0][0]
    b = converted[1][1]
    converted[0][0] = b
    converted[1][1] = a

    converted[0][1] = -converted[0][1] + len(alphabet)
    converted[1][0] = -converted[1][0] + len(alphabet)

    print(converted)

    for cus_det in [mod_inv, inv_det]:
        km_inv = (np.mat(converted) * cus_det) % len(alphabet)

        etext = []
        buffer = []
        i = 1
        for letter in cipher:
            buffer.append(alphabet.index(letter) + 1)
            if (i % x_dim == 0):
                etext.append(buffer)
                buffer = []
            i += 1
        ignore = 0
        if (len(buffer) > 0):
            i = len(buffer)
            while (i < x_dim):
                buffer.append(PADDING)
                i += 1
                ignore += 1
            etext.append(buffer)

        text = ''
        for block in etext:
            candidate = np.mat(block).reshape(-1, x_dim)
            product = np.matmul(candidate, km_inv) % len(alphabet)
            anchors = np.squeeze(np.asarray(product))
            for code in anchors:
                # print(code)
                text += alphabet[int(code) - 1]

        print(text)

for KEY in ['kata', 'wyaj', 'olpa', 'opla', 'xyia', 'ghua']:
    cipher = encode_hill('ilovecake', KEY)
    #print(cipher)
    decode_hill(cipher, KEY)