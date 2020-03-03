import React, { useState, useContext, useEffect } from "react";

import "../../styles/dropdown/list.scss";
import { DropdownAPI } from ".";
import { listenHover, removeHover, listenKeyPress, removeKeyPress } from "../../utils/events";
import { handleKeyPress } from "./keypress";

const List = ({ list, isOpen, handleOptionSelected, inset }) => {
  const { value: selectedOption } = useContext(DropdownAPI);
  const [hoveringIndex, setHoveringIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      listenHover("list", handleHover);
      listenKeyPress('withInput', (event) => handleKeyPress(event, handleListKeyPress))
      return () => {
        removeHover("list", handleHover);
        removeKeyPress('withInput', (event) => handleKeyPress(event, handleListKeyPress))
      };
    }
  }, [isOpen]);

  const handleHover = e => {
    setHoveringIndex(e.target.getAttribute("data-id"));
  };

  const handleListKeyPress = (e, direction) => {
    let currentIndex = hoveringIndex
    currentIndex++
    setHoveringIndex(currentIndex);
  };

  return isOpen ? (
    <div className={`list ${!inset ? "popout" : ""}`} id="list" tabIndex="0">
      {list.length > 0 ? (
        list.map(({ value, label }, index) => (
          <div
            tabIndex={index}
            data-id={index}
            className={`
            list__item ${
              selectedOption && selectedOption.value === value
                ? "list__item-active"
                : ""
            }
            ${hoveringIndex === index ? "list__item-hover" : ""}`}
            onClick={() => handleOptionSelected({ value, label })}
            key={value}
          >
            {label}
          </div>
        ))
      ) : (
        <div className="list__item">No results found</div>
      )}
    </div>
  ) : null;
};

export default List;
