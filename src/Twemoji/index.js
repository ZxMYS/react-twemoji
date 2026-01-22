import isEqual from 'lodash.isequal';
import React from 'react';
import twemoji from '@twemoji/api';

/**
 * @typedef {Object} TwemojiProps
 * @property {React.ReactNode} [children]
 * @property {boolean} [noWrapper=false]
 * @property {Object} [options] - Twemoji parsing options
 * @property {string} [tag='div'] - The HTML tag to use for the wrapper
 */

export default class Twemoji extends React.Component {
  static defaultProps = {
    tag: 'div'
  }

  constructor(props) {
    super(props);
    this.childrenRefs = {};
    this.rootRef = React.createRef();
  }

  _parseTwemoji() {
    const { noWrapper, options } = this.props;
    if (noWrapper) {
      for (const i in this.childrenRefs) {
        const node = this.childrenRefs[i].current;
        if (node) twemoji.parse(node, options);
      }
    } else {
      const node = this.rootRef.current;
      if (node) twemoji.parse(node, options);
    }
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
    const { children, noWrapper, tag, options, ...other } = this.props;

    if (noWrapper) {
      return (
        <>
          {React.Children.map(children, (c, i) => {
            if (typeof c === 'string') {
              console.warn(`Twemoji can't parse string child when noWrapper is set. Skipping child "${c}"`);
              return c;
            }
            this.childrenRefs[i] = this.childrenRefs[i] || React.createRef();
            return React.cloneElement(c, { ref: this.childrenRefs[i] });
          })}
        </>
      );
    }

    return React.createElement(tag, { ref: this.rootRef, ...other }, children);
  }
}
