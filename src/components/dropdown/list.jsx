import React from "react";

import "../../styles/dropdown/list.scss";
import { useContext } from "react";
import { DropdownAPI } from ".";

const List = ({ list }) => {
  const { inset, value: selectedOption, onOptionSelected } = useContext(DropdownAPI);
  return (
    <div className={`list ${inset ? 'list-inset' : ''}`} id="list">
      {list.map(({ value, label }) => (
        <div
          className={`list__item ${
            selectedOption && selectedOption.value === value ? "list__item-active" : ""
          }`}
          onClick={() => onOptionSelected && onOptionSelected({ value, label })}
          key={value}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default List;
