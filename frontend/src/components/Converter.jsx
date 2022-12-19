import React, { useContext, useState, useEffect } from 'react';
import { Container, Grid, TextField, Select, MenuItem } from '@mui/material';
import { CurrencyContext } from '../context/CurrencyContext';

const Converter = () => {
  const {
    currencyRates,
    selectedCurrency,
    allCurrencyChoices,
    converterChoices,
    changeSelectedCurrency,
  } = useContext(CurrencyContext);

  const [inputFields, updateInputFields] = useState({ original: 1, converted: 0 });

  const changeFieldsValue = (value, changedField) => {
    let updates = {};
    if (changedField === 'original') {
      updates = { original: value, converted: (value * currencyRates?.[selectedCurrency.converted] || 0).toFixed(3) };
    } else {
      updates = { converted: value, original: (value / currencyRates?.[selectedCurrency.converted] || 0).toFixed(3) };
    }
    updateInputFields(updates);
  }

  useEffect(() => {
    changeFieldsValue(inputFields.original, 'original');
  }, [currencyRates, selectedCurrency, selectedCurrency])

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6} textAlign="right">
          <TextField value={inputFields.original} onChange={(e) => changeFieldsValue(e.target.value, 'original')} />
        </Grid>
        <Grid item xs={6}>
          <Select
            value={selectedCurrency.original}
            onChange={(e) => changeSelectedCurrency(e.target.value, 'original')}
          >
            {allCurrencyChoices.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </Select>
        </Grid>

        <Grid item xs={6} textAlign="right">
          <TextField value={inputFields.converted} onChange={(e) => changeFieldsValue(e.target.value, 'converted')} />
        </Grid>
        <Grid item xs={6}>
          <Select
            value={selectedCurrency.converted}
            onChange={(e) => changeSelectedCurrency(e.target.value, 'converted')}
          >
            {converterChoices.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </Select>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Converter;
