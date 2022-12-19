import React, { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';
import { Button, Container } from '@mui/material';


const Header = () => {
  const { uahConverter } = useContext(CurrencyContext);
  return (
    <Container maxWidth="lg">
      <Container style={{ display: 'flex' }}>
        {Object.keys(uahConverter).length > 0 ? <p>1 UAH =</p> : ''}
        {
          Object.keys(uahConverter).map((key) =>
            <Button color="secondary" type="disabled">{uahConverter[key].toFixed(3)} {key}</Button>
          )
        }
      </Container>
      <hr />
    </Container>
  )
}

export default Header;
