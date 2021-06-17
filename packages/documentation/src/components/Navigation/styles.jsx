import styled, { css } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

const Aside = styled.aside(
  ({ show, aSideAnimation, bodyAnimation, theme: { borders, colors } }) => css`
    grid-area: navigation;
    height: 100%;

    border-right: ${borders.small}px solid ${colors.neutral[100]};

    @media (max-width: 830px) {
      width: 100%;
      max-width: 280px;

      position: fixed;
      top: 0;
      z-index: 4;

      background-color: ${colors.white};
      border-right: none;

      animation: ${aSideAnimation};

      ~ div,
      ~ footer {
        animation: ${bodyAnimation};
      }

      ${show
        ? `
            ~ div, ~ footer {
              pointer-events: none;
            }
          `
        : ''}
    }
  `,
);
const Nav = styled.nav(
  ({ show, theme: { spacings, colors } }) => `
    height: 100%;

    padding-top: ${spacings.small}px;

    background-color: ${colors.white};

    box-shadow: none;
    transition: box-shadow 0.3s ease;

    overflow: auto;

    @media (max-width: 830px) {
      ${
        show
          ? `
        height: 100%;
        box-shadow: -3px 0px 8px #000, 0px -5px 100px 10000px rgb(0 0 0 / 30%);
      `
          : ''
      }
    }
  `,
);
const Title = styled.h3`
  text-transform: capitalize;
  padding-left: ${({ theme: { spacings } }) => `${spacings.xxlarge}`}px;
  padding-right: ${({ theme: { spacings } }) => `${spacings.xxlarge}`}px;
`;
const Link = styled(GatsbyLink)`
  display: inline-block;
  width: 100%;
  text-decoration: none;

  ${({ theme: { colors, spacings } }) => `
    padding-left: ${spacings.small}px;
    color: ${colors.neutral[700]};

    &.current {
      color: ${colors.secondary[500]};
      background-color: ${colors.secondary[50]};
    }
  `}
`;
const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;
const ListItem = styled.li`
  ${({ theme: { spacings } }) => `
    margin-top: ${spacings.small}px;
    margin-bottom: ${spacings.small}px;

    a {
      padding-top: ${spacings.xsmall}px;
      padding-left: ${spacings.xxxlarge}px;
      padding-right: ${spacings.xxlarge}px;
      padding-bottom: ${spacings.xsmall}px;
    }
  `}
`;

export { Aside, Nav, Title, Link, List, ListItem };
