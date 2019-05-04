import * as React from 'react';

interface Props {
}

interface State {
  hasError: boolean
}

// export default class PartSoundsManager extends React.Component<Props,State> 
export default class ErrorBoundary extends React.Component<Props,State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <p>Something went wrong here :(</p>;
    }

    return this.props.children; 
  }
}