import React, { useContext, useState } from "react";
import List from "./List";
import { DropdownAPI } from ".";
import WithClickOutside from "../../utils/onClickOutside";
import Input from "./Input";
import '../../styles/dropdown/withPopout.scss';
import { filterList } from "../../utils/filter";

const WithPopout = () => {
  const { items, onOptionSelected, matchFromStart } = useContext(DropdownAPI);
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState(items)

  const onButtonClicked = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelected = ({ value, label }) => {
    setIsOpen(false)
    handleInputChange('')
    onOptionSelected && onOptionSelected({ value, label });
  };


  const handleInputChange = (value) => {
    setList(filterList(value, items, matchFromStart))
  }

  // This structure is needed for HOC access
  WithPopout.onClickOutside = () => {
    setIsOpen(false);
  }

  return (
    <div className="with-popout">
      <button onClick={onButtonClicked}>{!isOpen ? "Open" : "Close"}</button>
      {isOpen && (
        <div className="popout">
          <Input onInputChange={handleInputChange} />
          <List list={list} isOpen={isOpen} handleOptionSelected={handleOptionSelected} inset />
        </div>
      )}
    </div>
  )
};

export default WithClickOutside(WithPopout);