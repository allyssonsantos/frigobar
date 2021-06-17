import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { Link } from '@frigobar/core';
import { useSlide } from '@frigobar/animation';

import { Wrapper, Brand, Links } from './styles';

function Header({ home, show, ...props }) {
  const [{ animation }] = useSlide({ start: show, from: '0', to: '280px' });

  return (
    <Wrapper slideAnimation={animation} home={home} {...props}>
      <Brand as={GatsbyLink} to="/">
        Frigobar
      </Brand>
      {!home && (
        <Links>
          <Link as={GatsbyLink} to="/animation/getting-started/">
            Animation
          </Link>
          <Link as={GatsbyLink} to="/components/getting-started/">
            Components
          </Link>
          <Link href="https://github.com/frigobar/frigobar" target="_blank">
            Github
          </Link>
        </Links>
      )}
    </Wrapper>
  );
}

Header.propTypes = {
  home: PropTypes.bool,
  show: PropTypes.bool,
};

Header.defaultProps = {
  home: false,
  show: false,
};

export default Header;
