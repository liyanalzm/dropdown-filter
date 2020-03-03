import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { DropdownAPI } from ".";

import "../../styles/dropdown/input.scss";

const Input = React.forwardRef(
  ({ onInputFocus, onInputChange, onInputBlur, onInputClear }, ref) => {
    const { placeholder, value: selectedOption, withPopout } = useContext(
      DropdownAPI
    );
    const [inputValue, setInputValue] = useState(selectedOption.label);
    const [isBlurred, setIsBlurred] = useState(false);

    useEffect(() => {
      if (withPopout) {
        ref.current.focus()
      }
    }, [withPopout, ref])

    useEffect(() => {
      setInputValue(selectedOption.label);
    }, [selectedOption]);

    const handleInputChange = e => {
      setInputValue(e.target.value);
      onInputChange && onInputChange(e.target.value);
    };

    const handleInputFocus = () => {
      ref && ref.current.select();
      onInputFocus && onInputFocus();
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
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
        />
        {!withPopout && isBlurred && inputValue && (
          <span onClick={clear}>x</span>
        )}
      </label>
    );
  }
);

export default Input;
