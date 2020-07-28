import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/assets/prem.png"
            alt="logo"
            style={{ marginRight: '10px' }}
          />
          Reactivity
        </Menu.Item>
        <Menu.Item name="activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            as={NavLink}
            to="/create"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
