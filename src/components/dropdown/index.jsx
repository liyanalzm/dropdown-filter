import React from "react";
import WithInput from "./WithtInput";
import WithPopout from "./WithPopout";

export const DropdownAPI = React.createContext({});

const Dropdown = (api) => {
  return (
    <DropdownAPI.Provider value={api}>
      {api.withPopout ? (
        <WithPopout />
      ) : (
        <WithInput />
      )}
    </DropdownAPI.Provider>
  );
};

export default Dropdown;
