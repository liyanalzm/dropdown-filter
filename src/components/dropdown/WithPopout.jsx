import React, { useContext, useState, useRef, useEffect } from "react";
import List from "./List";
import { DropdownAPI } from ".";
import WithClickOutside from "../../utils/onClickOutside";
import Input from "./Input";
import "../../styles/dropdown/withPopout.scss";
import { filterList } from "../../utils/filter";
import { handleKeyPress } from "./keypress";
import { listenKeyPress, removeKeyPress } from "../../utils/events";

const WithPopout = () => {
  const inputRef = useRef();
  const { items, onOptionSelected, matchFromStart } = useContext(DropdownAPI);
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState(items);

  useEffect(() => {
    listenKeyPress('withPopout', (event) => handleKeyPress(event, handleList))
    return () => removeKeyPress('withPopout', (event) => handleKeyPress(event, handleList))
  }, [])

  const onButtonClicked = () => {
    handleList(!isOpen);
  };

  const handleOptionSelected = ({ value, label }) => {
    handleList(false);
    handleInputChange("");
    onOptionSelected && onOptionSelected({ value, label });
  };

  const handleInputChange = value => {
    setList(filterList(value, items, matchFromStart));
  };

  // This structure is needed for HOC access
  WithPopout.onClickOutside = () => {
    handleList(false);
  };

  const handleList = isListOpen => {
    setIsOpen(isListOpen);
  };

  return (
    <div className="with-popout" id="withPopout">
      <button onClick={onButtonClicked}>{!isOpen ? "Open" : "Close"}</button>
      {isOpen && (
        <div className="popout">
          <Input onInputChange={handleInputChange} ref={inputRef} />
          <List
            list={list}
            isOpen={isOpen}
            handleOptionSelected={handleOptionSelected}
            inset
          />
        </div>
      )}
    </div>
  );
};

export default WithClickOutside(WithPopout);
