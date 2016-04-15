# react-twemoji
A simple [React](https://facebook.github.io/react/) wrapper for [Twemoji](https://github.com/twitter/twemoji).
It calls twemoji.parse() to convert emoji characters to Twemoji images.

## Install

```shell
npm install react-twemoji
```

## Usage

Simple use it to wrap your emotional content.

```jsx
import Twemoji from 'react-twemoji';

<Twemoji>
  <p>😂<span>😉</span></p>
</Twemoji>
```

It outputs following HTML to DOM,

```html
<div>
  <p>
    <img draggable="false" class="emoji" alt="😂" src="https://twemoji.maxcdn.com/2/72x72/1f602.png">
    <span>
      <img draggable="false" class="emoji" alt="😉" src="https://twemoji.maxcdn.com/2/72x72/1f609.png">
    </span>
  </p>
</div>
```

### Run example

```sh
npm run example
```
then open http://localhost:8080/

## Development
### Lint

```sh
npm run lint
```

### Test

```sh
npm run test
```

### Build

```sh
npm run build
```
