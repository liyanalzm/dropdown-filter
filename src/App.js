import React from "react";
import "./App.scss";
import Dropdown from "./components/dropdown/index.jsx";
import countries from "./countries.json";
import { useState } from "react";

function App() {
  const [countryInput, setCountryInput] = useState({ value: 'MY', label: 'Malaysia'});
  const [countryButton, setCountryButton] = useState({ value: '', label: ''});

  const handleCountryInput = (value) => {
    setCountryInput(value)
  }
  const handleCountryButton = (value) => {
    setCountryButton(value)
  }

  return (
    <div className="App">
      <p>With Input: {`${countryInput.label} (${countryInput.value})`}</p>
      <Dropdown items={countries} value={countryInput} onOptionSelected={handleCountryInput} matchFromStart openOnFocus />



      <p>With Button: {`${countryButton.label} (${countryButton.value})`}</p>
      <Dropdown items={countries} value={countryButton} onOptionSelected={handleCountryButton} matchFromStart withPopout />
    </div>
  );
}

export default App;
