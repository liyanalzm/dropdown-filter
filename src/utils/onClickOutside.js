import React from "react";
import { findDOMNode } from "react-dom";

const WithClickOutside = (WrappedComponent, config) => {
  return class WithClickoutside extends React.Component {


    getComponentNode = () => {
      return findDOMNode(this);
    };

    listenClick = () => {
      document.addEventListener("click", evt => {
        const element = this.componentNode;
        let targetElement = evt.target; // clicked element

        do {
          if (targetElement === element) {
            // This is a click inside. Do nothing, just return.
            return;
          }
          // Go up the DOM
          targetElement = targetElement.parentNode;
        } while (targetElement);

        // This is a click outside.
        // Called first due to overriden function
        if (config && typeof config.onClickOutside === 'function') {
          config.onClickOutside();
        } else if (typeof WrappedComponent.onClickOutside === 'function') {
          WrappedComponent.onClickOutside();
        } else {
          console.error('onClickOutside is not provided')
        }
      });
    }

    componentDidMount() {
      // If we are in an environment without a DOM such
      // as shallow rendering or snapshots then we exit
      // early to prevent any unhandled errors being thrown.
      if (typeof document === 'undefined' || !document.createElement) {
        return;
      }
      this.componentNode = this.getComponentNode();
      this.listenClick()
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
};

export default WithClickOutside;
