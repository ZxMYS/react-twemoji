import React from 'react';
import Twemoji from '../src/Twemoji';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Twemoji options={{ className: 'twemoji' }}>
          <p>😂😅</p><p>😍😉</p>
        </Twemoji>
        <Twemoji noWrapper={true} options={{ className: 'twemoji' }}>
          <p>😂😅</p><p>😍😉</p>
        </Twemoji>
      </div>
    );
  }
}
