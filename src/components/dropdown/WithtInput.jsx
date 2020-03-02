import React, { useState } from "react";
import { useContext } from "react";
import { DropdownAPI } from ".";
import List from "./list";

import '../../styles/dropdown/withInput.scss';
import Input from "./Input";
import WithClickOutside from "../../utils/onClickOutside";

const WithInput = () => {
  const { items, openOnFocus, matchFromStart } = useContext(DropdownAPI)
  const [isOpen, setIsOpen] = useState(false)
  const [list, setList] = useState(items)

  
  // This structure is needed for HOC access
  WithInput.onClickOutside = () => {
    setIsOpen(false);
  }

  const handleInputChange = (value) => {
    setIsOpen(true)
    filterList(value)
  }

  const handleFocus = () => {
    openOnFocus && setIsOpen(true)
  }

  const filterList = (value) => {
    const filteredItems = items.filter(item => {
      return matchFromStart ? item.label.toLowerCase().startsWith(value.toLowerCase()) : item.label.toLowerCase().indexOf(value.toLowerCase()) >= 0
    })
  
    setList(filteredItems)
  }

  return (
    <label className="with-input">
      <Input onInputFocus={handleFocus} onInputChange={handleInputChange} />
      {isOpen && (
        <List list={list} />
      )}
    </label>
  );
};

export default WithClickOutside(WithInput);
