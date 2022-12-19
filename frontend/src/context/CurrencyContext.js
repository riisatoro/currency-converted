import React, { createContext, useState, useEffect } from 'react';

const CurrencyContext = createContext(null);

const prepareFetchOptions = (baseCurrency, currencyList) => {
	const headers = new Headers();
	headers.append("apikey", process.env.REACT_APP_CONVERTER_KEY);

	const symbols = currencyList.reduce((prev, next) => `${next},${prev}`, '')
	const url = `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base=${baseCurrency}`

	const requestOptions = { method: 'GET', redirect: 'follow', headers };
	return { url, requestOptions };
}

const CurrencyProvider = ({ children }) => {
	const [currencyRates, setCurrencyRates] = useState({});
	const [allCurrencyChoices, setAllCurrencyChoices] = useState(['UAH', 'USD', 'EUR', 'JPY', 'CZK', 'PLN']);
	const [uahConverter, setUahConverter] = useState({});

	const [selectedCurrency, setSelectedCurrency] = useState({ original: allCurrencyChoices[0], converted: allCurrencyChoices[1] });

	const fetchCurrencyRates = (baseCurrency, currencyList, setData) => {
		const { url, requestOptions } = prepareFetchOptions(baseCurrency, currencyList);
		fetch(url, requestOptions).then((response) => response.json()).then((data) => setData(data.rates));
	}

	const converterChoices = allCurrencyChoices.filter((item) => item !== selectedCurrency.original);

	useEffect(() => {
		fetchCurrencyRates(selectedCurrency.original, converterChoices, setCurrencyRates);

		const uahConverterChoice = allCurrencyChoices.filter((item) => item !== 'UAH');
		fetchCurrencyRates('UAH', uahConverterChoice, setUahConverter);
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
		currencyRates,
		uahConverter,

		selectedCurrency,
		changeSelectedCurrency,

		allCurrencyChoices,
		converterChoices,
	}

	return <CurrencyContext.Provider value={values}>{children}</CurrencyContext.Provider>
}

export { CurrencyContext };
export default CurrencyProvider;
