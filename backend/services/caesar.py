import string

def encode_caesar(text, shift):
    cipher = ''
    alphabet = list(string.printable)
    for character in text:
        position = alphabet.index(character)
        position -= shift
        if (position < 0):
            position += len(alphabet)
        cipher += alphabet[position]
    return cipher

def decode_caesar(cipher, shift):
    text = ''
    alphabet = list(string.printable)
    for character in cipher:
        position = alphabet.index(character)
        position += shift
        position %= len(alphabet)
        text += alphabet[position]
    return text