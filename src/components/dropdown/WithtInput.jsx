import React, { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { DropdownAPI } from ".";
import List from "./List";

import '../../styles/dropdown/withInput.scss';
import Input from "./Input";
import WithClickOutside from "../../utils/onClickOutside";
import { filterList } from "../../utils/filter";
import { handleKeyPress } from "./keypress";
import { listenKeyPress, removeKeyPress } from "../../utils/events";

const WithInput = () => {
  const inputRef = useRef()
  const { items, openOnFocus, matchFromStart, onOptionSelected } = useContext(DropdownAPI)
  const [isOpen, setIsOpen] = useState(false)
  const [list, setList] = useState(items)

  useEffect(() => {
    listenKeyPress('withInput', (event) => handleKeyPress(event, handleList))
    return () => removeKeyPress('withInput', (event) => handleKeyPress(event, handleList))
  }, [])
  
  // This structure is needed for HOC access
  WithInput.onClickOutside = () => {
    handleList(false);
  }

  const handleInputChange = (value) => {
    setList(filterList(value, items, matchFromStart))
  }

  const handleInputClear = () => {
    handleInputChange('')
    handleList(true)
    onOptionSelected && onOptionSelected({ value: '', label: '' })
  }

  const handleInputFocus = () => {
    openOnFocus && handleList(true)
  }

  const handleList = (isListOpen) => {
    setIsOpen(isListOpen)
  }

  const handleOptionSelected = ({ value, label }) => {
    handleList(false)
    handleInputChange('')
    onOptionSelected && onOptionSelected({ value, label });
  };

  return (
    <div className="with-input" id="withInput">
      <Input onInputFocus={handleInputFocus} onInputChange={handleInputChange} onInputClear={handleInputClear} ref={inputRef} />
      <List list={list} isOpen={isOpen} handleOptionSelected={handleOptionSelected} />
    </div>
  );
};

export default WithClickOutside(WithInput);
