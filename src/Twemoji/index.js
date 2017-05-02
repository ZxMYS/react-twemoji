import isEqual from 'lodash/isEqual';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import twemoji from 'twemoji';

export default class Twemoji extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    options: PropTypes.object
  }

  _parseTwemoji() {
    const node = ReactDOM.findDOMNode(this);
    twemoji.parse(node, this.props.options);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      this._parseTwemoji();
    }
  }

  componentDidMount() {
    this._parseTwemoji();
  }

  render() {
    const { options, children, ...other } = this.props;
    return <div {...other}>{children}</div>;
  }
}
