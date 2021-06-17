import { useEffect, useState, useRef } from 'react';
import { keyframes, css } from 'styled-components';

const animation = ({ direction, from = '0', to }) => {
  const translate = {
    x: 'translateX',
    y: 'translateY',
  };

  return {
    in: keyframes`
      from {
        transform: ${translate[direction]}(${from});
      }

      to {
        transform:${translate[direction]}(${to});
      }
    `,
    out: keyframes`
      from {
        transform:${translate[direction]}(${to});
      }

      to {
        transform: ${translate[direction]}(${from});
      }
    `,
  };
};

function useSlide({
  duration = 300,
  start = false,
  direction = 'x',
  from,
  to,
  alternate = true,
}) {
  const [animationStart, setAnimationStart] = useState(start);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (start) {
      setAnimationStart(true);
    } else {
      setAnimationStart(false);
    }
  }, [start]);

  return animationStart
    ? [
        {
          animation: css`
            ${animation({
              direction,
              from,
              to: firstRender.current ? from : to,
            }).in} ${firstRender.current ? 0 : duration}ms forwards ease
          `,
          state: animationStart,
        },
        setAnimationStart,
      ]
    : [
        {
          animation: alternate
            ? css`
                ${animation({ direction, from, to }).out} ${firstRender.current
                  ? 0
                  : duration}ms forwards ease
              `
            : css`
                ${animation({ direction, from, to }).out} 0ms forwards ease
              `,
          state: animationStart,
        },
        setAnimationStart,
      ];
}

export default useSlide;
