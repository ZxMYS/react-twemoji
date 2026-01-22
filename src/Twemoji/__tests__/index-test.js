/* eslint-env mocha */
import { assert } from 'chai';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Twemoji from '..';

// Helper to ensure React has finished rendering to the real DOM
async function renderToDOM(element) {
  const container = document.createElement('div');
  document.body.appendChild(container); // Must be in body for some DOM queries
  const root = createRoot(container);

  root.render(element);

  // Wait for React 18's concurrent rendering to flush to the DOM
  await new Promise(resolve => setTimeout(resolve, 50));

  return {
    container,
    cleanup: () => {
      root.unmount();
      document.body.removeChild(container);
    }
  };
}

suite('Twemoji', () => {
  let activeCleanup = null;

  teardown(() => {
    if (activeCleanup) {
      activeCleanup();
      activeCleanup = null;
    }
  });

  test('should parse emoji in children', async () => {
    const { container, cleanup } = await renderToDOM(
      <Twemoji><div>😉<a>😊</a></div></Twemoji>
    );
    activeCleanup = cleanup;

    const imgs = container.querySelectorAll('img');
    assert.equal(imgs.length, 2, 'Should have found 2 emoji images');
  });

  test('should render with custom tag when it\'s set', async () => {
    const { container, cleanup } = await renderToDOM(
      <Twemoji tag='span'><a>😉😊</a></Twemoji>
    );
    activeCleanup = cleanup;
    assert.equal(container.firstElementChild.tagName, 'SPAN');
  });

  test('should parse again when children is updated', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    // Initial render
    root.render(<Twemoji>😐😑</Twemoji>);
    await new Promise(resolve => setTimeout(resolve, 50));

    const firstImg = container.querySelector('img');
    assert.isNotNull(firstImg, 'First emoji should exist');
    const oldSrc = firstImg.src;

    // Update render
    root.render(<Twemoji>😄</Twemoji>);
    await new Promise(resolve => setTimeout(resolve, 50));

    const newImg = container.querySelector('img');
    assert.isNotNull(newImg, 'New emoji should exist');
    const newSrc = newImg.src;

    assert.equal(container.querySelectorAll('img').length, 1);
    assert.notEqual(oldSrc, newSrc);

    root.unmount();
    document.body.removeChild(container);
  });

  test('should parse emoji in children when no wrapper is set', async () => {
    // Note: Twemoji requires a DOM element child when noWrapper is true
    const { container, cleanup } = await renderToDOM(
      <div>
        <Twemoji noWrapper={true}>
          <span>😉</span>
          <p>😉<a>😊</a></p>
        </Twemoji>
      </div>
    );
    activeCleanup = cleanup;

    // In noWrapper mode, Twemoji parses the children of the parent
    assert.equal(container.querySelectorAll('img').length, 3);
    assert.equal(container.querySelectorAll('p').length, 1);
  });
});