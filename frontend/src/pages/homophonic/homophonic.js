import React, { useEffect, useState } from "react";
import { Logo, HomeCard, PageContainer } from "../../common/styles";
import { DECRYPT, ENCRYPT } from "../../constants/operationConstants";
import { EncryptDecryptSection } from "../../common/encryptDecryptSection";
import {
  decodeTextHomophonic,
  encodeTextHomophonic
} from "../../endpoints/homophonicEndpoints";
import goldKey from "../../images/gold-key.png";

export const HomophonicCipherPage = () => {
  const [action, setAction] = useState(null);
  const [inputText, setInputText] = useState('');
  const [cipherKey, setCipherKey] = useState('');
  const [cipherValue, setCipherValue] = useState('');

  useEffect(() => {
    if (cipherKey.length > 0) {
      if (action === ENCRYPT) {
        encodeTextHomophonic(inputText, cipherKey)
          .then((data) => {
            setCipherValue(data.data);
          });
      } else if (action === DECRYPT) {
        decodeTextHomophonic(inputText, cipherKey)
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
          <Logo src={goldKey}/>
          <h1
            className="mt-4"
          >
            Try the Homophonic Cipher!
          </h1>
        </div>
        <div className="mb-4">
          <h5 className='mb-2'>
            How does the Homophonic Cipher work?
          </h5>
          <p className="mb-4" style={{ 'width': '100%', 'margin': 'auto' }}>
            The Homophonic Substitution cipher is a substitution cipher in which single plaintext
            letters can be replaced by any of several different ciphertext letters. They are generally
            much more difficult to break than standard substitution ciphers.
          </p>
          <figcaption className="blockquote-footer">
            <cite title="Source Title">
              PracticalCryptography.com
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
          isHomophonic
        />
      </HomeCard>
    </PageContainer>
  );
}