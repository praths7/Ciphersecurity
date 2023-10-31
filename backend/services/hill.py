import string
import numpy as np

def encode_hill(text, key):
    alphabet = list(string.printable)
    ekey = []
    for letter in key:
        ekey.append(alphabet.index(letter))
    key_matrix = np.mat(ekey).reshape(-1, 2)
    x_dim = key_matrix.shape[0]
    etext = []
    buffer = []
    i = 1
    for letter in text:
        buffer.append(alphabet.index(letter))
        if (i % x_dim == 0):
            etext.append(buffer)
            buffer = []
        i += 1
    ignore = 0
    if (len(buffer) > 0):
        i = len(buffer)
        while (i < x_dim):
            buffer.append(0)
            i += 1
            ignore += 1
        etext.append(buffer)
    print(etext)
    encoding = ''
    for instance in etext:
        imatrix = np.mat(instance).reshape(1, x_dim)
        product = np.matmul(imatrix, key_matrix) % len(alphabet)
        anchors = np.squeeze(np.asarray(product))
        for a in anchors:
            encoding += alphabet[a]
    if (ignore > 0):
        return encoding[:-ignore]
    return encoding

print(encode_hill('ilovecake', 'hill'))