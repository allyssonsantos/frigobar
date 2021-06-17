import styled, { css } from 'styled-components';
import { Link } from '@frigobar/core';

const Wrapper = styled.header`
  position: relative;
  z-index: 3;

  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: white;

  ${({ slideAnimation, home, theme: { spacings } }) => css`
    padding: ${spacings.small}px ${spacings.large}px;

    box-shadow: ${home ? 'none' : '0px 1px 3px rgba(0, 0, 0, 0.1)'};
    animation: ${slideAnimation};

    @media (min-width: 830px) {
      padding: ${spacings.large}px ${spacings.xxlarge}px;
    }

    ${home
      ? `
        max-width: 1440px;
        margin: 0 auto;
        width: 100%;
      `
      : ''}
  `}
`;

const Brand = styled(Link)`
  background-image: url('/frigobar.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 115px;

  font-size: 1.125rem;
  text-indent: -9999px;
  width: 115px;

  @media (max-width: 830px) {
    width: 105px;
    min-height: 25px;

    font-size: 1rem;

    background-size: 105px;
  }
`;

const Links = styled.nav`
  font-size: 1rem;
  text-transform: lowercase;

  @media (max-width: 830px) {
    font-size: 0.875rem;
  }

  ${Link} {
    margin-right: 20px;

    @media (max-width: 830px) {
      margin-right: 10px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

export { Wrapper, Brand, Links };
