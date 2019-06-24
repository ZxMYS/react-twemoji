import isEqual from 'lodash/isEqual';
import React from 'react';
import PropTypes from 'prop-types';
import twemoji from 'twemoji';

export default class Twemoji extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    noWrapper: PropTypes.bool,
    options: PropTypes.object
  }

  constructor(props) {
    super(props);
    if (props.noWrapper) {
      this.childrenRefs = {};
    } else {
      this.rootRef = React.createRef();
    }
  }

  _parseTwemoji() {
    const { noWrapper } = this.props;
    if (noWrapper) {
      for (const i in this.childrenRefs) {
        const node = this.childrenRefs[i].current;
        twemoji.parse(node, this.props.options);
      }
    } else {
      const node = this.rootRef.current;
      twemoji.parse(node, this.props.options);
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
    const { children, noWrapper, ...other } = this.props;
    if (noWrapper) {
      return (
        <>
        {
          React.Children.map(children, (c, i) => {
            if (typeof c === 'string') {
              // eslint-disable-next-line no-console
              console.warn(`Twemoji can't parse string child when noWrapper is set. Skipping child "${c}"`);
              return c;
            }
            this.childrenRefs[i] = this.childrenRefs[i] || React.createRef();
            return React.cloneElement(c, { ref: this.childrenRefs[i] });
          })
        }
        </>);
    } else {
      delete other.options;
      return <div ref={this.rootRef} {...other}>{children}</div>;
    }
  }
}
