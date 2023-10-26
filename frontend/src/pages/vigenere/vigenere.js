import React, { useEffect, useState } from "react";
import { Logo, HomeCard, PageContainer } from "../../common/styles";
import { DECRYPT, ENCRYPT } from "../../constants/operationConstants";
import { EncryptDecryptSection } from "../../common/encryptDecryptSection";
import {
  decodeTextVigenere,
  encodeTextVigenere
} from "../../endpoints/vigenereEndpoints";
import gate from "../../images/gate.png";

export const VigenereCipherPage = () => {
  const [action, setAction] = useState(null);
  const [inputText, setInputText] = useState('');
  const [cipherKey, setCipherKey] = useState('');
  const [cipherValue, setCipherValue] = useState('');

  useEffect(() => {
    if (cipherKey.length > 0) {
      if (action === ENCRYPT) {
        encodeTextVigenere(inputText, cipherKey)
          .then((data) => {
            setCipherValue(data.data);
          });
      } else if (action === DECRYPT) {
        decodeTextVigenere(inputText, cipherKey)
          .then((data) => {
            setCipherValue(data.data);
          });
      }
    }
  }, [inputText, cipherKey]);

  useEffect(() => {
    setCipherKey('');
    setCipherValue('');
  }, [action]);

  return (
    <PageContainer>
      <HomeCard>
        <div className="mb-4">
          <Logo src={gate}/>
          <h1
            className="mt-4"
          >
            Cipher with Vigenère!
          </h1>
        </div>
        <div className="mb-4">
          <h5 className='mb-2'>
            How does the Vigenère Cipher work?
          </h5>
          <p className="mb-4" style={{ 'width': '100%', 'margin': 'auto' }}>
            The Vigenere Cipher is a polyalphabetic substitution cipher, which means that it uses multiple
            cipher alphabets to encrypt the plaintext. The Vigenère Cipher operates by using a keyword, typically
            a word or phrase, as the basis for encryption. The keyword is repeated to match the length of the plaintext
            message.
          </p>
          <figcaption className="blockquote-footer">
            <cite title="Source Title">
              Intellipaat.com
            </cite>
          </figcaption>
        </div>
        <EncryptDecryptSection
          action={action}
          setAction={setAction}
          cipherKey={cipherKey}
          setCipherKey={setCipherKey}
          cipherValue={cipherValue}
          setInputText={setInputText}
          isVigenere
        />
      </HomeCard>
    </PageContainer>
  );
}