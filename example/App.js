import React from 'react';
import Twemoji from '../src/Twemoji';

export default class App extends React.Component {
  render() {
    return (
      <Twemoji options={{ className: 'twemoji' }}>
        <p>😂😅</p><p>😍😉</p>
      </Twemoji>
    );
  }
}
