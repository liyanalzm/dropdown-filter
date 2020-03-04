import { getKey } from "../../utils/keys"

export const handleKeyPress = (event, onKeyPress) => {
  const { keyCode } = event;
  if (getKey(keyCode) === 'ESC') {
    onKeyPress(false);
  } else if (getKey(keyCode) === 'UP') {
    onKeyPress(event, 'UP');
  } else if (getKey(keyCode) === 'DOWN') {
    onKeyPress(event, 'DOWN');
  }
}