import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const CaesarCipherPage = () => {
  const navigateTo = useNavigate();
  return (
    <div>
      <div>
        Caesar Cipher Page!
      </div>
      <Button
        variant='secondary'
        onClick={() => {
          navigateTo('/');
        }}
      >
        { '< Back Home' }
      </Button>
    </div>
  )
}