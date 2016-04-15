import React from 'react';
import Twemoji from '../src/Twemoji';

export default class App extends React.Component {
  render() {
    return (
      <Twemoji>
        <p>😂😅</p><p>😍😉</p>
      </Twemoji>
    );
  }
}
