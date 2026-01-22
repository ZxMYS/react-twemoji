import React, { useEffect, useRef } from 'react';
import { dequal } from 'dequal/lite';
import twemoji from '@twemoji/api';

const Twemoji = ({
  children,
  noWrapper = false,
  options,
  tag: Tag = 'div',
  ...other
}) => {
  const rootRef = useRef(null);
  const childrenRefs = useRef([]);
  const prevOptions = useRef(options);

  // Helper to run the twemoji parsing logic
  const parseTwemoji = () => {
    if (noWrapper) {
      childrenRefs.current.forEach((node) => {
        if (node) twemoji.parse(node, options);
      });
    } else if (rootRef.current) {
      twemoji.parse(rootRef.current, options);
    }
  };

  useEffect(() => {
    // Deep check options: if they are actually the same,
    // we only re-parse if the children/wrapper changed.
    const optionsChanged = !dequal(prevOptions.current, options);

    parseTwemoji();

    if (optionsChanged) {
      prevOptions.current = options;
    }
  }, [children, noWrapper, options]);

  // Handle the "noWrapper" logic: we must attach refs to children manually
  if (noWrapper) {
    return (
      <>
        {React.Children.map(children, (child, i) => {
          if (typeof child === 'string') {
            if (process.env.NODE_ENV !== 'production') {
              console.warn(`Twemoji can't parse string child when noWrapper is set. Skipping child "${child}"`);
            }
            return child;
          }

          return React.cloneElement(child, {
            ref: (el) => (childrenRefs.current[i] = el),
          });
        })}
      </>
    );
  }

  return (
    <Tag ref={rootRef} {...other}>
      {children}
    </Tag>
  );
};

export default Twemoji;
