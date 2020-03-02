import React, { useContext, useState } from "react";
import List from "./list";
import { DropdownAPI } from ".";
import WithClickOutside from "../../utils/onClickOutside";

const WithPopout = () => {
  const { items } = useContext(DropdownAPI);
  const [isOpen, setIsOpen] = useState(false);

  const onButtonClicked = () => {
    setIsOpen(!isOpen);
  };

  // This structure is needed for HOC access
  WithPopout.onClickOutside = () => {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={onButtonClicked}>{!isOpen ? "Open" : "Close"}</button>
      {isOpen && <List list={items} />}
    </div>
  )
};

export default WithClickOutside(WithPopout);