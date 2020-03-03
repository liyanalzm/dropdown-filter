import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { DropdownAPI } from ".";

import '../../styles/dropdown/withInput.scss';

const Input =  React.forwardRef(({ onInputClick, onInputChange, onInputBlur }, ref) => {
  const { placeholder, value: selectedOption } = useContext(DropdownAPI)
  const [inputValue, setInputValue] = useState(selectedOption.label)
  const [placeholderValue, setPlaceholderValue] = useState(selectedOption.label || placeholder)

  useEffect(() => {
    setInputValue(selectedOption.label)
  }, [selectedOption])  

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    onInputChange && onInputChange(e.target.value)
  }

  const handleInputClick = () => {
    setInputValue('')
    setPlaceholderValue(selectedOption.label)
    onInputClick && onInputClick()
  }

  const handleInputBlur = () => {
    onInputBlur && onInputBlur()
  }

  return (
    <input type="text" ref={ref} value={inputValue} placeholder={placeholderValue} onChange={handleInputChange} onClick={handleInputClick} onBlur={handleInputBlur}  />
  );
});

export default Input;
