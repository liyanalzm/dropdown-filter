export const getKey = keyCode => {
  switch (keyCode) {
    case 9:
      return "TAB";
    case 27:
      return "ESC";
    case 13:
      return "ENTER";
    case 38:
      return "UP";
    case 40:
      return "DOWN";
    default:
      return null;
  }
};
