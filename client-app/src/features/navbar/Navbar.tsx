import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

interface IProps {
  openCreateForm: () => void;
}
const Navbar: React.FC<IProps> = ({ openCreateForm }) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/prem.png"
            alt="logo"
            style={{ marginRight: '10px' }}
          />
          Reactivity
        </Menu.Item>
        <Menu.Item name="activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={() => openCreateForm()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
