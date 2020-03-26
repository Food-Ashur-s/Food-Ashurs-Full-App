import React from 'react';
import { GoogleLogContext } from './login-google.js';

const If = props => {
  return props.condition ? props.children : null;
};

class GoogleAuth extends React.Component{
    static contextType = GoogleLogContext;

    render() {
        console.log(';;;;;;;;;;;;;;;;;;;;');
        
      console.log('this.context', this.context);
      let okToRender = false;

      try {
        okToRender =
          this.context.loggedIn &&
            (this.props.capability
              ? this.context.user.capabilities.includes(this.props.capability)
              : true);
      } catch {
        console.warn('not authorized to do that');
      }
      return (
        <If condition={okToRender}>
          <div>{this.props.children}</div>
        </If>
      );
    }
}

export default GoogleAuth;