# react-twemoji
A simple [React](https://facebook.github.io/react/) wrapper for [Twemoji](https://github.com/twitter/twemoji).
It calls twemoji.parse() to convert emoji characters to Twemoji images.

## Install

```shell
yarn add react-twemoji
```

or, if you use npm,

```shell
npm install react-twemoji
```

## Usage

Simply use it to wrap your emotional content. Set the `options` prop to pass options to `twemoji.parse`.

```jsx
import Twemoji from 'react-twemoji';

<Twemoji options={{ className: 'twemoji' }}>
  <p>😂<span>😉</span></p>
</Twemoji>
```

It outputs the following HTML to DOM,

```html
<div>
  <p>
    <img draggable="false" class="twemoji" alt="😂" src="https://twemoji.maxcdn.com/2/72x72/1f602.png">
    <span>
      <img draggable="false" class="twemoji" alt="😉" src="https://twemoji.maxcdn.com/2/72x72/1f609.png">
    </span>
  </p>
</div>
```

### Props

| Name             | Type          | Default     | Description|
|:----             |:----          |:----        |:----|
| `options`        | `object`      | `undefined` | `twemoji.parse` options. |
| `noWrapper`      | `boolean`     | `false`     | When it is `true`, `Twemoji` will not render a wrapping element (with `tag`) to contain its children. Note that since `twemoji.parse` needs a DOM element reference, any direct pure text child of `Twemoji` is not parsed when `noWrapper` is `true`. E.g. `foo` in `<Twemoji noWrapper={true}>foo<p>bar</p></Twemoji>` is not parsed. |
| `tag`            | `string`      | `div`       | The tag of the wrapping element. This option is ignored when `noWrapper` is `true`. |

### Run example

```sh
yarn run example
```
then open http://localhost:8080/

## Development
### Lint

```sh
yarn run lint
```

### Test

```sh
yarn run test
```

### Build

```sh
yarn run build
```
