/* eslint-env mocha */
import { assert } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import Twemoji from '..';

function renderTwemoji() {
  return TestUtils.renderIntoDocument(<Twemoji><div>😉<a>😊</a></div></Twemoji>);
}
function renderTwemojiWithNoWrapper() {
  return TestUtils.renderIntoDocument(<div><Twemoji noWrapper={true}><p>😉<a>😊</a></p></Twemoji></div>);
}

suite('Twemoji', () => {
  test('should parse emoji in children', () => {
    const rendered = renderTwemoji();
    const node = ReactDOM.findDOMNode(rendered);  // eslint-disable-line react/no-find-dom-node
    assert.equal(node.querySelectorAll('img').length, 2);
  });

  test('should parse again when children is updated', () => {
    const node = document.createElement('div');
    ReactDOM.render(<Twemoji>😐😑</Twemoji>, node);
    const oldSrc = node.querySelector('img').src;
    // triggers componentDidUpdate
    ReactDOM.render(<Twemoji>😄</Twemoji>, node);
    const newSrc = node.querySelector('img').src;

    assert.equal(node.querySelectorAll('img').length, 1);
    assert.notEqual(oldSrc, newSrc);
  });

  test('should parse emoji in children when no wrapper is set and do not create a wrapper', () => {
    const rendered = renderTwemojiWithNoWrapper();
    const node = ReactDOM.findDOMNode(rendered);  // eslint-disable-line react/no-find-dom-node
    assert.equal(node.querySelectorAll('div').length, 0);
    assert.equal(node.querySelectorAll('img').length, 2);
    assert.equal(node.querySelectorAll('p').length, 1);
  });
});
