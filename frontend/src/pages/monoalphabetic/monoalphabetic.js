import React, { useEffect, useState } from "react";
import { Logo, HomeCard } from "../../common/styles";
import { DECRYPT, ENCRYPT } from "../../constants/operationConstants";
import { EncryptDecryptSection } from "../../common/encryptDecryptSection";
import abc from "../../images/abc.png";

export const MonoalphabeticCipherPage = () => {
  const [action, setAction] = useState(null);
  const [inputText, setInputText] = useState('');
  const [cipherValue, setCipherValue] = useState('');
  const [cipherKey, setCipherKey] = useState('PVRHOWXUMYFKELQCIBANTGDSZJ');

  useEffect(() => {
    if (action === ENCRYPT) {

    } else if (action === DECRYPT) {

    }
  }, [inputText]);

  useEffect(() => {
    setCipherValue('');
  }, [action]);

  return (
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
        cipherValue={cipherValue}
        setCipherKey={setCipherKey}
        setInputText={setInputText}
      />
    </HomeCard>
  );
}