import React from "react";
import { findDOMNode } from "react-dom";

export const ClickOutsideContext = React.createContext(true)

const WithClickOutside = (WrappedComponent, config) => {
  return class WithClickoutside extends React.Component {

    constructor(props) {
      super(props);
      this.conRef = React.createRef()
      this.state = {
        isClickedOutside: true
      }
    }
  
    getComponentNode = () => {
      return findDOMNode(this);
    };

    handleClickOutside = () => {
      document.addEventListener("click", evt => {
        // const element  = document.getElementById(elementId);
        const element = this.componentNode;
        // const element = React.Children.only(children)
        let targetElement = evt.target; // clicked element
      
        do {
          if (targetElement === element) {
            // This is a click inside. Do nothing, just return.
            this.setState({
              isClickedOutside: false
            })
            return;
          }
          // Go up the DOM
          targetElement = targetElement.parentNode;
        } while (targetElement);
      
        // This is a click outside.
        this.setState({
          isClickedOutside: true
        })
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
      this.handleClickOutside()
    }
  
    render() {
      return (
        <ClickOutsideContext.Provider value={this.state.isClickedOutside}>
          <WrappedComponent {...this.props} />
        </ClickOutsideContext.Provider>
      )
    }
  }
};

export default WithClickOutside;
