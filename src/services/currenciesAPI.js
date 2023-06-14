const URL = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = async () => {
  const resp = await fetch(URL);
  const data = await resp.json();
  return data;
};

export default getCurrencies;
