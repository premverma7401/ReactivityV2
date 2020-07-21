import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import ActivityStore from '../../store/activityStore';
import { observer } from 'mobx-react-lite';

const Navbar: React.FC = () => {
  const activityStore = useContext(ActivityStore);

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
            onClick={() => activityStore.openCreateForm()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
