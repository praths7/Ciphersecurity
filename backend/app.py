import string
from json import dumps
from flask import Flask, request
from flask_cors import CORS, cross_origin

from services.caesar import encode_caesar, decode_caesar
from services.monoalphabetic import encode_monoalphabetic, decode_monoalphabetic, generatem_key
from services.homophonic import encode_homophonic, decode_homophonic, filtered_homophonic_table, base64_homophonic_table
from services.vigenere import encode_vigenere, decode_vigenere, base64_vigenere_table
from services.hill import encode_hill, decode_hill, check_key_inv, generate_hill_key
from services.pratz import encode_pratz, decode_pratz
from services.rgrid import encode_rgrid, decode_rgrid

def defaultHandler(err):
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

api_cors_config = {
    'origins': ['http://localhost:5000']
}

APP = Flask(__name__)
CORS(APP, resources={
    r'/*': api_cors_config,
})

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)

# /encode/caesar-cipher
@APP.route('/encode/caesar-cipher', methods=['POST'])
@cross_origin()
def encode_caesar_ciper():
    payload = request.get_json()
    return dumps({
        'data': encode_caesar(payload['text'], int(payload['cipherKey']))
    })

# /decode/caesar-cipher
@APP.route('/decode/caesar-cipher', methods=['POST'])
@cross_origin()
def decode_caesar_ciper():
    payload = request.get_json()
    return dumps({
        'data': decode_caesar(payload['text'], int(payload['cipherKey']))
    })

# /encode/monoalphabetic-cipher
@APP.route('/encode/monoalphabetic-cipher', methods=['POST'])
@cross_origin()
def encode_monoalphabetic_ciper():
    payload = request.get_json()
    return dumps({
        'data': encode_monoalphabetic(payload['text'], payload['cipherKey'])
    })

# /decode/monoalphabetic-cipher
@APP.route('/decode/monoalphabetic-cipher', methods=['POST'])
@cross_origin()
def decode_monoalphabetic_ciper():
    payload = request.get_json()
    return dumps({
        'data': decode_monoalphabetic(payload['text'], payload['cipherKey'])
    })

# /generate/monoalphabetic-key
@APP.route('/generate/monoalphabetic-key', methods=['GET'])
@cross_origin()
def generate_monoalphabetic_key():
    return dumps({
        'data': generatem_key()
    })

# /encode/homophonic-cipher
@APP.route('/encode/homophonic-cipher', methods=['POST'])
@cross_origin()
def encode_homophonic_ciper():
    payload = request.get_json()
    return dumps({
        'data': encode_homophonic(payload['text'], payload['cipherKey'])
    })

# /decode/homophonic-cipher
@APP.route('/decode/homophonic-cipher', methods=['POST'])
@cross_origin()
def decode_homophonic_ciper():
    payload = request.get_json()
    return dumps({
        'data': decode_homophonic(payload['text'], payload['cipherKey'])
    })

# /generate/homophonic-mapping
@APP.route('/generate/homophonic-mapping', methods=['POST'])
@cross_origin()
def generate_homophonic_mapping():
    payload = request.get_json()
    return dumps({
        'data': filtered_homophonic_table(payload['cipherKey'])
    })

@APP.route('/generate/base64-homophonic-mapping', methods=['POST'])
@cross_origin()
def generate_base64_homophonic_mapping():
    payload = request.get_json()
    return dumps({
        'data': base64_homophonic_table(payload['cipherKey'])
    })

@APP.route('/encode/vigenere-cipher', methods=['POST'])
@cross_origin()
def encode_vigenere_ciper():
    payload = request.get_json()
    return dumps({
        'data': encode_vigenere(payload['text'], payload['cipherKey'])
    })

@APP.route('/decode/vigenere-cipher', methods=['POST'])
@cross_origin()
def decode_vignere_ciper():
    payload = request.get_json()
    return dumps({
        'data': decode_vigenere(payload['text'], payload['cipherKey'])
    })

@APP.route('/generate/base64-vigenere-mapping', methods=['POST'])
@cross_origin()
def generate_base64_vigenere_mapping():
    payload = request.get_json()
    return dumps({
        'data': base64_vigenere_table(payload['cipherKey'])
    })

@APP.route('/encode/hill-cipher', methods=['POST'])
@cross_origin()
def encode_hill_ciper():
    payload = request.get_json()
    return dumps({
        'data': encode_hill(payload['text'], payload['cipherKey'])
    })

@APP.route('/decode/hill-cipher', methods=['POST'])
@cross_origin()
def decode_hill_ciper():
    payload = request.get_json()
    return dumps({
        'data': decode_hill(payload['text'], payload['cipherKey'])
    })

@APP.route('/generate/hill-key', methods=['GET'])
@cross_origin()
def hill_key_generation():
    return dumps({
        'data': generate_hill_key()
    })

@APP.route('/check/mod-inverse', methods=['POST'])
@cross_origin()
def check_mod_inverse():
    payload = request.get_json()
    return dumps({
        'data': check_key_inv(payload['value'])
    })

@APP.route('/encode/pratz-cipher', methods=['POST'])
@cross_origin()
def encode_pratz_ciper():
    payload = request.get_json()
    return dumps({
        'data': encode_pratz(payload['text'], payload['cipherKey'])
    })

@APP.route('/decode/pratz-cipher', methods=['POST'])
@cross_origin()
def decode_pratz_ciper():
    payload = request.get_json()
    return dumps({
        'data': decode_pratz(payload['text'], payload['cipherKey'])
    })

@APP.route('/encode/rgrid-cipher', methods=['POST'])
@cross_origin()
def encode_rgrid_ciper():
    payload = request.get_json()
    return dumps({
        'data': encode_rgrid(payload['text'], payload['cipherKey'])
    })

@APP.route('/decode/rgrid-cipher', methods=['POST'])
@cross_origin()
def decode_rgrid_ciper():
    payload = request.get_json()
    return dumps({
        'data': decode_rgrid(payload['text'], payload['cipherKey'])
    })