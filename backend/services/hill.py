import string
import random
import numpy as np

PADDING = 99
alphabet = list(string.printable)

def generate_hill_key():
    return random.choice([
        'kata',
        'olpa',
        'opla',
        'xyia',
        'ghua',
        'KOLA',
        'arya',
        'oplu',
        'op;a'
    ])

def find_mod_inv(a, m):
    for x in range(1, m):
        if (a % m) * (x % m) % m == 1:
            return x
    return -1

def check_key_inv(key):
    ekey = []
    for letter in key:
        ekey.append(alphabet.index(letter) + 1)
    key_matrix = np.mat(ekey).reshape(-1, 2).T
    # find modular inverse of a matrix
    k_det = int(np.rint(abs(np.linalg.det(key_matrix))))
    # find modulus of inverse number
    return find_mod_inv(k_det, len(alphabet))

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
    converted = np.squeeze(np.asarray(key_matrix))
    a = converted[0][0]
    b = converted[1][1]
    converted[0][0] = b
    converted[1][1] = a
    converted[0][1] = -converted[0][1] + len(alphabet)
    converted[1][0] = -converted[1][0] + len(alphabet)

    answer = {}
    for key, cus_det in enumerate([mod_inv, inv_det]):
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
        text = ''
        for block in etext:
            candidate = np.mat(block).reshape(-1, x_dim)
            product = np.matmul(candidate, km_inv) % len(alphabet)
            anchors = np.squeeze(np.asarray(product))
            for code in anchors:
                if (int(code) != PADDING):
                    text += alphabet[int(code) - 1]
        answer[key] = text
    return answer
