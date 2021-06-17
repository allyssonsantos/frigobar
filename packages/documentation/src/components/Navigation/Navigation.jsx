import React, { forwardRef } from 'react';
import { createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';
import { useSlide } from '@frigobar/animation';

import { Aside, Nav, Title, List, ListItem, Link } from './styles';

const BodyOverflow = createGlobalStyle`
  html, body, #___gatsby, #gatsby-focus-wrapper {
    overflow-y: hidden;
  }
`;
const Navigation = forwardRef(({ items, show, ...props }, ref) => {
  const [{ animation }] = useSlide({ start: show, from: '-100%', to: '0' });
  const [{ animation: bodyAnimation }] = useSlide({
    start: show,
    from: '0',
    to: '280px',
  });

  return (
    <Aside
      show={show}
      aSideAnimation={animation}
      bodyAnimation={bodyAnimation}
      {...props}
      ref={ref}
    >
      {show && <BodyOverflow />}
      <Nav show={show}>
        {Object.keys(items)
          .sort(item => (item === 'guide' ? -1 : 1))
          .map(category => (
            <React.Fragment key={category}>
              <Title>{category}</Title>
              <List>
                {items[category]
                  .sort((a, b) => (a.name < b.name ? -1 : 1))
                  .map(({ name, url }) => (
                    <ListItem key={name}>
                      <Link to={url} activeClassName="current">
                        {name}
                      </Link>
                    </ListItem>
                  ))}
              </List>
            </React.Fragment>
          ))}
      </Nav>
    </Aside>
  );
});

Navigation.propTypes = {
  show: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  items: PropTypes.shape({
    guide: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        category: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
    components: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        category: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default Navigation;
