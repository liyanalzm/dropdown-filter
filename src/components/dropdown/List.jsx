import React, { useContext, useEffect } from "react";

import "../../styles/dropdown/list.scss";
import { DropdownAPI } from ".";
import { getKey } from "../../utils/keys";

const List = ({ list, isOpen, handleOptionSelected, inset }) => {
  const { value: selectedOption } = useContext(DropdownAPI);

  useEffect(() => {
    if (isOpen) {
      handleListKeyPress()
    }
    // eslint-disable-next-line
  }, [isOpen]);


  const handleListKeyPress = () => {
    const listItems = document.querySelectorAll(".list__item");
    const listItemIds = [];
    listItems.forEach(item => listItemIds.push(item.id));
    listItems.forEach(item => {
      item.addEventListener("keydown", e => {
        switch (getKey(e.keyCode)) {
          case "ENTER":
            handleOptionSelected({ value: e.target.getAttribute("data-value"), label: e.target.getAttribute("data-label"), });
            return;
  
          case "DOWN":
            e.stopPropagation();
            focusNextListItem(40);
            return;
  
          case "UP":
            e.stopPropagation();
            focusNextListItem(38);
            return;

           default:
             return;
        }
      })
    });

    function focusNextListItem(direction) {
      const activeElementId = document.activeElement.id;
      if (activeElementId === "list__item-hover") {
        document.querySelector(`#${listItemIds[0]}`).focus();
      } else {
        const currentActiveElementIndex = listItemIds.indexOf(activeElementId);
        if (direction === 40) {
          const currentActiveElementIsNotLastItem =
          currentActiveElementIndex < listItemIds.length - 1;
          if (currentActiveElementIsNotLastItem) {
            const nextListItemId = listItemIds[currentActiveElementIndex + 1];
            document.querySelector(`#${nextListItemId}`).focus();
          }
        } else if (direction === 38) {
          const currentActiveElementIsNotFirstItem =
          currentActiveElementIndex > 0;
          if (currentActiveElementIsNotFirstItem) {
            const nextListItemId = listItemIds[currentActiveElementIndex - 1];
            document.querySelector(`#${nextListItemId}`).focus();
          }
        }
      }
    }
  }

  return isOpen ? (
    <ul className={`list ${!inset ? "popout" : ""}`} id="list" tabIndex="-1">
      {list.length > 0 ? (
        list.map(({ value, label }, index) => (
          <li
            tabIndex="0"
            id={`option-${index}`}
            className={`
            list__item ${
              selectedOption && selectedOption.value === value
                ? "list__item-active"
                : ""
            }`}
            data-value={value}
            data-label={label}
            onClick={() => handleOptionSelected({ value, label })}
            key={value}
          >
            {label}
          </li>
        ))
      ) : (
        <li className="list__item" style={{ pointerEvents: 'none' }}>No results found</li>
      )}
    </ul>
  ) : null;
};

export default List;
