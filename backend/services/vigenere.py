import sys
import string
sys.path.append("..")
from common.base64_table import generate_base64_mapping

def generate_vigenere_mapping(key):
    mapping = {}
    alphabet = list(string.printable)
    a_length = len(alphabet)
    for anchor in key:
        aindex = alphabet.index(anchor)
        if anchor not in mapping:
            counter = 0
            mapping[anchor] = []
            while (counter < a_length):
                if (aindex == a_length):
                    aindex %= a_length
                mapping[anchor].append(alphabet[aindex])
                aindex += 1
                counter += 1
    return mapping

def base64_vigenere_table(key):
    table = generate_vigenere_mapping(key)
    values = []
    columns = [*range(0, len(string.printable), 1)]
    meta_key = ''
    for header in table:
        values.append(table[header])
        meta_key += header
    return generate_base64_mapping(values, columns, meta_key)

def vigenere_keystream(text, key):
    keystream = ''
    i = 0
    while (i < len(text)):
        keystream += key[i % len(key)]
        i += 1
    return keystream

def encode_vigenere(text, key):
    alphabet = list(string.printable)
    mapping = generate_vigenere_mapping(key)
    cipher = ''
    keystream = vigenere_keystream(text, key)
    for text_symbol, key_anchor in zip(text, keystream):
        tindex = mapping[key_anchor].index(text_symbol)
        cipher += alphabet[tindex]
    return cipher

def decode_vigenere(cipher, key):
    alphabet = list(string.printable)
    mapping = generate_vigenere_mapping(key)
    text = ''
    keystream = vigenere_keystream(cipher, key)
    for cipher_symbol, key_anchor in zip(cipher, keystream):
        cindex = alphabet.index(cipher_symbol)
        text += mapping[key_anchor][cindex]
    return text

base64_vigenere_table('key')