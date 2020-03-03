import { getKey } from "../../utils/onKeyPress/keys"

export const handleKeyPress = (event, onKeyPress) => {
  const { keyCode } = event;
  if (getKey(keyCode) === 'TAB' || getKey(keyCode) === 'ESC') {
    onKeyPress(false);
  } else if (getKey(keyCode) === 'UP') {
    onKeyPress(event, 'UP');
  } else if (getKey(keyCode) === 'DOWN') {
    onKeyPress(event, 'DOWN');
  }
}