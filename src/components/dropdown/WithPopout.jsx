import React, { useContext, useState } from "react";
import List from "./list";
import { DropdownAPI } from ".";
import WithClickOutside, { ClickOutsideContext } from "../../utils/onClickOutside";
import { useEffect } from "react";


const WithPopout = () => {
  const { items } = useContext(DropdownAPI);
  const isClickedOutside = useContext(ClickOutsideContext);
  const [isOpen, setIsOpen] = useState(false);

  const onButtonClicked = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(!isClickedOutside);
  }, [isClickedOutside])

  return (
    <div>
      <button onClick={onButtonClicked}>{!isOpen ? "Open" : "Close"}</button>
      {isOpen && <List list={items} />}
    </div>
  );
};

export default WithClickOutside(WithPopout);
