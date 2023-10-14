import React from 'react';
import { HomeCard, Logo, PageContainer } from "../../common/styles";
import { ENCRYPT, DECRYPT } from "../../constants/operationConstants";
import { useState, useEffect } from 'react';
import { EncryptDecryptSection } from "../../common/encryptDecryptSection";
import { encodeTextCaesar, decryptTextCaesar } from '../../endpoints/caesarEndpoints';
import emperor from '../../images/emperor.png';

export const CaesarCipherPage = () => {
  const [action, setAction] = useState(null);
  const [inputText, setInputText] = useState('');
  const [cipherValue, setCipherValue] = useState('');

  useEffect(() => {
    if (action === ENCRYPT) {
      encodeTextCaesar(inputText)
        .then((data) => {
          setCipherValue(data.data);
        });
    } else if (action === DECRYPT) {
      decryptTextCaesar(inputText)
        .then((data) => {
          setCipherValue(data.data);
        });
    }
  }, [inputText]);

  useEffect(() => {
    setCipherValue('');
  }, [action]);

  return (
    <PageContainer>
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
        <EncryptDecryptSection
          action={action}
          setAction={setAction}
          cipherValue={cipherValue}
          setInputText={setInputText}
        />
      </HomeCard>
    </PageContainer>
  )
}