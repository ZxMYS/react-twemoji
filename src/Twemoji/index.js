import isEqual from 'lodash/isEqual';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import twemoji from 'twemoji';

export default class Twemoji extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  _parseTwemoji() {
    const node = ReactDOM.findDOMNode(this);
    twemoji.parse(node);
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
    const { children, ...other } = this.props;
    return <div {...other}>{children}</div>;
  }
}
