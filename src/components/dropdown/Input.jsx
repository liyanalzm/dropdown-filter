import React, { useState } from "react";
import { useContext } from "react";
import { DropdownAPI } from ".";

import '../../styles/dropdown/withInput.scss';

const Input = ({ onInputFocus, onInputChange, onInputBlur }) => {
  const { placeholder, value: selectedOption } = useContext(DropdownAPI)
  const [inputValue, setInputValue] = useState(selectedOption.label)

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    onInputChange && onInputChange(e.target.value)
  }

  const handleInputFocus = () => {
    onInputFocus && onInputFocus()
  }


  const handleInputBlur = () => {
    onInputBlur && onInputBlur()
  }

  return (
    <input type="text" value={inputValue} placeholder={placeholder} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} />
  );
};

export default Input;
