import React, { useEffect, useState } from "react";
import { Logo, HomeCard, PageContainer } from "../../common/styles";
import { DECRYPT, ENCRYPT } from "../../constants/operationConstants";
import { NUMBER_OF_CHARACTERS } from "../../constants/generalConstants";
import { EncryptDecryptSection } from "../../common/encryptDecryptSection";
import abc from "../../images/abc.png";
import {
  encodeTextMonoalphabetic,
  decodeTextMonoalphabetic
} from "../../endpoints/monoalphabeticEndpoints";

export const MonoalphabeticCipherPage = () => {
  const [action, setAction] = useState(null);
  const [inputText, setInputText] = useState('');
  const [cipherKey, setCipherKey] = useState('');
  const [cipherValue, setCipherValue] = useState('');

  useEffect(() => {
    if (cipherKey.length === NUMBER_OF_CHARACTERS) {
      if (action === ENCRYPT) {
        encodeTextMonoalphabetic(inputText, cipherKey)
          .then((data) => {
            setCipherValue(data.data);
          });
      } else if (action === DECRYPT) {
        decodeTextMonoalphabetic(inputText, cipherKey)
          .then((data) => {
            setCipherValue(data.data);
          });
      }
    }
  }, [inputText, cipherKey]);

  useEffect(() => {
    setCipherValue('');
  }, [action]);

  return (
    <PageContainer>
      <HomeCard>
        <div className="mb-4">
          <Logo src={abc}/>
          <h1
            className="mt-4"
          >
            Try the Monoalphabetic Cipher!
          </h1>
        </div>
        <div className="mb-4">
          <h5 className='mb-2'>
            What does the Monoalphabetic Cipher do?
          </h5>
          <p className="mb-4" style={{ 'width': '100%', 'margin': 'auto' }}>
            In monoalphabetic, each alphabet in plain text can be replaced by
            any other alphabet except the original alphabet. That is, A can be
            replaced by any other alphabet from B to Z. B can be replaced by A or C to Z.
            C can be replaced by A, B, and D to Z, etc.
          </p>
          <figcaption className="blockquote-footer">
            <cite title="Source Title">
              Educba.com
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
        />
      </HomeCard>
    </PageContainer>
  );
}