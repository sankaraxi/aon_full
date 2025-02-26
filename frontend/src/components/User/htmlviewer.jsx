import React from 'react';

class HTMLViewer extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.props.html }} />
    );
  }
}

export default HTMLViewer;
