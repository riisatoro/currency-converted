import React, { createContext, useState, useEffect } from 'react';

const CurrencyContext = createContext(null);



const CurrencyProvider = ({ children }) => {
    const [currencyRates, setCurrencyRates] = useState({});
    const [allCurrencyChoices, setAllCurrencyChoices] = useState(['UAH', 'USD', 'EUR']);

    const [selectedCurrency, setSelectedCurrency] = useState({ original: allCurrencyChoices[0], converted: allCurrencyChoices[1] });

    const fetchCurrencyRates = (baseCurrency, currencyList) => {
        const headers = new Headers();
        headers.append("apikey", process.env.REACT_APP_CONVERTER_KEY);

        const symbols = currencyList.reduce((prev, next) => `${next},${prev}`, '')
        const url = `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base=${baseCurrency}`

        const requestOptions = { method: 'GET', redirect: 'follow', headers };
        // fetch(url, requestOptions).then((response) => response.json()).then((data) => setCurrencyRates(data.rates));
        setCurrencyRates({
            UAH: {
                USD: 0.027,
                EUR: 0.026,
                UAH: 1,
            },
            EUR: {
                UAH: 39.10,
                USD: 1.06,
                EUR: 1
            },
            USD: {
                EUR: 0.94,
                UAH: 36.94,
                USD: 1
            },
        })
    }

    const converterChoices = allCurrencyChoices.filter((item) => item !== selectedCurrency.original);

    useEffect(() => {
        fetchCurrencyRates(selectedCurrency.original, converterChoices);
    }, [selectedCurrency])

    const changeSelectedCurrency = (value, target) => {
        const secondKey = target === 'original' ? 'converted' : 'original';
        setSelectedCurrency((state) => {
            if (state[secondKey] === value) {
                return { [target]: value, [secondKey]: state[target] }
            }
            return { ...state, [target]: value };
        })
    }

    const values = {
        currencyRates: currencyRates[selectedCurrency.original], // temporary
        
        selectedCurrency,
        changeSelectedCurrency,

        allCurrencyChoices,
        converterChoices,
    }

    return <CurrencyContext.Provider value={values}>{children}</CurrencyContext.Provider>
}

export { CurrencyContext };
export default CurrencyProvider;
