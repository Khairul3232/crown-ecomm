import React from 'react';
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from './error-boundary.styles';

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false
    }
  }

  /**
   * catches any error that was thrown from any of the children of
   * this ErrorBoundary component
  */
  static getDerivedStateFromError(error) { 
    // process the error
    return {
      hasErrored: true
    }
  }

  componentDidCatch(error, info) {
    console.error(error);
  }

  render() {
    if (this.state.hasErrored) {
      return <>
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://error404.fun/img/full-preview/1x/5.png' />
          <ErrorImageText>Sorry this page is broken</ErrorImageText>
        </ErrorImageOverlay>
      </>
    }

    return this.props.children;
  }

}

export default ErrorBoundary;