import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { DropdownAPI } from ".";

import "../../styles/dropdown/input.scss";

const Input = React.forwardRef(
  ({ onInputClick, onInputChange, onInputBlur, onInputClear }, ref) => {
    const { placeholder, value: selectedOption, withPopout } = useContext(
      DropdownAPI
    );
    const [inputValue, setInputValue] = useState(selectedOption.label);
    const [isBlurred, setIsBlurred] = useState(false);

    useEffect(() => {
      setInputValue(selectedOption.label);
    }, [selectedOption]);

    const handleInputChange = e => {
      setInputValue(e.target.value);
      onInputChange && onInputChange(e.target.value);
    };

    const handleInputClick = () => {
      ref && ref.current.select();
      onInputClick && onInputClick();
    };

    const handleInputBlur = () => {
      onInputBlur && onInputBlur();
      setIsBlurred(true);
    };

    const clear = () => {
      setInputValue("");
      onInputClear && onInputClear()
    };

    return (
      <label className="input-label">
        <input
          type="text"
          ref={ref}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onBlur={handleInputBlur}
        />
        {!withPopout && isBlurred && inputValue && (
          <span onClick={clear}>x</span>
        )}
      </label>
    );
  }
);

export default Input;
