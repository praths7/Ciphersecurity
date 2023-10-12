import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Button,
  InputGroup,
} from 'react-bootstrap';
import { encodeTextCaesar, decryptTextCaesar } from '../../endpoints/caesarEP';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { HomeCard, Logo } from "../home/style";
import emperor from '../../images/emperor.png';

const ENCRYPT = 'encrypt';
const DECRYPT = 'decrypt';

export const CaesarCipherPage = () => {
  const navigateTo = useNavigate();
  const [action, setAction] = useState(null);
  const [inputText, setInputText] = useState('');
  const [cipherValue, setCipherValue] = useState('');

  useEffect(() => {
    if (action === ENCRYPT) {
      encodeTextCaesar(inputText)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return '';
        })
        .then((data) => {
          setCipherValue(data.data);
        });
    } else if (action === DECRYPT) {
      decryptTextCaesar(inputText)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return '';
        })
        .then((data) => {
          setCipherValue(data.data);
        });
    }
  }, [inputText]);

  useEffect(() => {
    setCipherValue('');
  }, [action]);

  return (
    <HomeCard>
      <div className="mb-4">
        <Logo src={emperor}/>
        <h1
          className="mt-4"
        >
          Welcome to Caesar Cipher!
        </h1>
      </div>
      <div className="mb-4">
        <h5 className='mb-2'>
          Why is it called Caesar Cipher?
        </h5>
        <p className="mb-4" style={{ 'width': '100%', 'margin': 'auto' }}>
          The Caesar cipher is named after Julius Caesar,
          who, according to Suetonius, used it with a shift of
          three (A becoming D when encrypting, and D becoming A
          when decrypting) to protect messages of military significance.
        </p>
        <figcaption className="blockquote-footer">
          <cite title="Source Title">
            Wikipedia
          </cite>
        </figcaption>
      </div>
      <Button
        variant='outline-dark'
        className="p-3 mb-3"
        onClick={() => {
          setAction(ENCRYPT);
        }}
      >
        Encrypt
      </Button>
      <Button
        variant='outline-dark'
        className="p-3 mb-5"
        onClick={() => {
          setAction(DECRYPT);
        }}
      >
        Decrypt
      </Button>
      <Modal
        show={action !== null}
        onHide={() => {
          setAction(null);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {
              action === ENCRYPT ? "Encrypt Text" : action === DECRYPT && "Decrypt Text"
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please enter the text you want to&nbsp;
            { action === ENCRYPT ? "encode" : action === DECRYPT && 'decode' }
            , and see the magic!
          </p>
          <InputGroup className="mb-3">
            <InputGroupText>
              Text
            </InputGroupText>
            <textarea
              className="form-control"
              onChange={(e) => {
                setInputText(e.target.value);
              }}
            />
          </InputGroup>
          <p>
            { action === ENCRYPT ? "Encoded" : action === DECRYPT && 'Decoded' }
            &nbsp;Text:
          </p>
          <InputGroup>
            <textarea
              className="p-2 form-control"
              readOnly
              placeholder={cipherValue}
            />
            <Button
              variant="outline-secondary"
              onClick={() => {
                navigator.clipboard.writeText(cipherValue);
              }}
            >
              Copy
            </Button>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={() => {
              setAction(null);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        variant='secondary'
        className='p-2'
        onClick={() => {
          navigateTo('/');
        }}
      >
        { 'Home Page' }
      </Button>
    </HomeCard>
  )
}