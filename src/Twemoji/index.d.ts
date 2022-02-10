import React from "react";

interface props {
  children?: React.ReactNode;
  noWrapper?: boolean;
  options?: object;
  tag?: string;
}
interface state {}

export class Twemoji extends React.Component<props, state> {
  render(): JSX.Element;
  context: React.Context;
  setState: React.SetStateAction;
  forceUpdate: (callback?: (() => void) | undefined) => void;
  props: JSX.IntrinsicAttributes & props;
  state: state;
  refs: { [key: string]: React.ReactInstance };
}
