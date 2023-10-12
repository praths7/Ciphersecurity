import string

SHIFT = 3

def encode_caesar(text):
    cipher = ''
    alphabet = list(string.printable)
    for character in text:
        position = alphabet.index(character)
        position -= SHIFT
        if (position < 0):
            position += len(alphabet)
        cipher += alphabet[position]
    return cipher

def decode_caesar(cipher):
    text = ''
    alphabet = list(string.printable)
    for character in cipher:
        position = alphabet.index(character)
        position += SHIFT
        position %= len(alphabet)
        text += alphabet[position]
    return text