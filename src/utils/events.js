export const listenKeyPress = (componentId, onKeyPress) => {
  if (componentId) {
    const element = document.getElementById(componentId);
    element && element.addEventListener("keydown", evt => {
      if (typeof onKeyPress === "function") {
        onKeyPress(evt);
      } else {
        console.error("No event methods given");
      }
    });
  } else {
    console.error("No componentId given");
  }
};

export const removeKeyPress = (componentId, onKeyPress) => {
  if (componentId) {
    const element = document.getElementById(componentId);
    element && element.removeEventListener("keydown", evt => {
      if (typeof onKeyPress === "function") {
        onKeyPress(evt);
      } else {
        console.error("No event methods given");
      }
    });
  } else {
    console.error("No componentId given");
  }
};

export const listenHover = (componentId, onHover) => {
  if (componentId) {
    const element = document.getElementById(componentId);
    element && element.addEventListener("mouseover", evt => {
      if (typeof onHover === "function") {
        onHover(evt);
      } else {
        console.error("No event methods given");
      }
    });
  } else {
    console.error("No componentId given");
  }
}

export const removeHover = (componentId, onHover) => {
  if (componentId) {
    const element = document.getElementById(componentId);
    element && element.removeEventListener("mouseover", evt => {
      if (typeof onHover === "function") {
        onHover(evt);
      } else {
        console.error("No event methods given");
      }
    });
  } else {
    console.error("No componentId given");
  }
}
