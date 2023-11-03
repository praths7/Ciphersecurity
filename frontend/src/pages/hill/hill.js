import React, { useEffect, useState } from "react";
import { Logo, HomeCard, PageContainer } from "../../common/styles";
import {DECRYPT, ENCRYPT, SUCCESS} from "../../constants/operationConstants";
import { EncryptDecryptSection } from "../../common/encryptDecryptSection";
import {
  checkModInverse,
  decodeTextHill,
  encodeTextHill
} from "../../endpoints/hillEndpoints";
import mountain from "../../images/mountains.png";

export const HillCipherPage = () => {
  const [action, setAction] = useState(null);
  const [inputText, setInputText] = useState('');
  const [cipherKey, setCipherKey] = useState('');
  const [cipherValue, setCipherValue] = useState('');
  const [hillStatus, setHillStatus] = useState('');

  useEffect(() => {
    if (cipherKey.length === 4) {
      checkModInverse(cipherKey)
        .then((data) => {
          if (parseInt(data.data) !== -1) {
            setHillStatus(SUCCESS);
            if (action === ENCRYPT) {
              encodeTextHill(inputText, cipherKey)
                .then((data) => {
                  setCipherValue(data.data);
                });
            } else if (action === DECRYPT) {
              decodeTextHill(inputText, cipherKey)
                .then((data) => {
                  const payload = data.data;
                  const value = `'${payload[0]}' or '${payload[1]}'`
                  setCipherValue(value);
                });
            }
          } else {
            setHillStatus('Key incompatible. Please re-generate.');
          }
        });
    } else {
      setHillStatus('Please set a 4 character cipher key.')
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
          <Logo src={mountain}/>
          <h1
            className="mt-4"
          >
            Welcome to Hill Cipher.
          </h1>
        </div>
        <div className="mb-4">
          <h5 className='mb-2'>
            Check these main points before proceeding!
          </h5>
          <p className="mb-4" style={{ 'width': '100%', 'margin': 'auto' }}>
            Please provide a key of exactly 4 characters for the cipher to work. Not all
            keys can work with the cipher due to its unique linear algebraic qualities.
            Keep trying a key until the input field accepts it, or use our uniquely generated key!
          </p>
          <figcaption className="blockquote-footer">
            <cite title="Source Title">
              Prathamesh J
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
          hillStatus={hillStatus}
          isHill
        />
      </HomeCard>
    </PageContainer>
  );
}