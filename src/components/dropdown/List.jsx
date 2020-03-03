import React from "react";

import "../../styles/dropdown/list.scss";
import { useContext } from "react";
import { DropdownAPI } from ".";

const List = ({ list, isOpen, handleOptionSelected, inset }) => {
  const { value: selectedOption } = useContext(DropdownAPI);

  return isOpen ? (
    <div className={`list ${!inset ? "popout" : ""}`} id="list">
      {list.length > 0 ? (
        list.map(({ value, label }) => (
          <div
            className={`list__item ${
              selectedOption && selectedOption.value === value
                ? "list__item-active"
                : ""
            }`}
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
