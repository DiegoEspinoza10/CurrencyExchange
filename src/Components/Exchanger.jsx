import { useEffect, useState } from "react";
import { MakeExchange } from "./MakeExchange";
import "../Style/./Exchanger.css";

function Exchanger() {
  const [quotes, setQuotes] = useState([]);
  const [convertionRate, setConvertionRate] = useState("");
  const [selectedCurrency1, setSelectedCurrency1] = useState("");
  const [selectedCurrency2, setSelectedCurrency2] = useState("");
  const [amount, setAmount] = useState("");
  const baseURL = "https://currency-exchange.p.rapidapi.com/listquotes";

  useEffect(() => {
    const fetchQuotes = async () => {
      const url = baseURL;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "89abef9e7dmshc81b03230b46dc6p161cd7jsne66feb700e09",
          "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuotes();
  }, []);

  const fetchConvertionRate = async () => {
    const url = `https://currency-exchange.p.rapidapi.com/exchange?from=${selectedCurrency1}&to=${selectedCurrency2}&q=1.0`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key":
          "89abef9e7dmshc81b03230b46dc6p161cd7jsne66feb700e09",
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setConvertionRate(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCurrencyChange1 = (event) => {
    setSelectedCurrency1(event.target.value);
  };

  const handleCurrencyChange2 = (event) => {
    setSelectedCurrency2(event.target.value);
  };

  const makeConversion = (event) => {
    event.preventDefault();
    fetchConvertionRate();
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className="exchanger-container">
      <p>From: </p>
      <select
        className="currency-select"
        value={selectedCurrency1}
        onChange={handleCurrencyChange1}
      >
        {quotes.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <p>To: </p>
      <select
        className="currency-select"
        value={selectedCurrency2}
        onChange={handleCurrencyChange2}
      >
        {quotes.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <form className="form-container" onSubmit={makeConversion}>
        <input
          className="amount-input"
          onChange={handleInputChange}
          value={amount}
          placeholder="Enter amount"
        ></input>
        <button className="exchange-button" type="submit">
          Exchange!
        </button>
      </form>
      {convertionRate !== "" && (
        <MakeExchange
          amountProp={amount}
          rateProp={parseFloat(convertionRate)}
        />
      )}
    </div>
  );
}

export default Exchanger;
