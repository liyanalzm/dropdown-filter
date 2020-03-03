import React, { useState, useRef } from "react";
import { useContext } from "react";
import { DropdownAPI } from ".";
import List from "./List";

import '../../styles/dropdown/withInput.scss';
import Input from "./Input";
import WithClickOutside from "../../utils/onClickOutside";
import { filterList } from "../../utils/filter";

const WithInput = () => {
  const inputRef = useRef()
  const { items, openOnFocus, matchFromStart, onOptionSelected } = useContext(DropdownAPI)
  const [isOpen, setIsOpen] = useState(false)
  const [list, setList] = useState(items)

  
  // This structure is needed for HOC access
  WithInput.onClickOutside = () => {
    setIsOpen(false);
  }

  const handleInputChange = (value) => {
    setList(filterList(value, items, matchFromStart))
  }

  const handleInputClear = () => {
    handleInputChange('')
    setIsOpen(true)
    onOptionSelected && onOptionSelected({ value: '', label: '' })
  }

  const handleClick = () => {
    openOnFocus && setIsOpen(true)
  }

  const handleOptionSelected = ({ value, label }) => {
    setIsOpen(false)
    handleInputChange('')
    onOptionSelected && onOptionSelected({ value, label });
  };

  return (
    <div className="with-input">
      <Input onInputClick={handleClick} onInputChange={handleInputChange} onInputClear={handleInputClear} ref={inputRef} />
      <List list={list} isOpen={isOpen} handleOptionSelected={handleOptionSelected} />
    </div>
  );
};

export default WithClickOutside(WithInput);
