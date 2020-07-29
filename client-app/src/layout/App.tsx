import React, { Fragment } from 'react';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import Navbar from '../features/navbar/Navbar';
import ActivityDashboard from '../features/activity/ActivityDashboard';
import Homepage from '../features/home/Homepage';
import ActivityForm from '../features/form/ActivityForm';
import ActivityDetails from '../features/details/ActivityDetails';
import '../layout/style.css';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route component={Homepage} path="/" exact />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <Navbar />
            <Container style={{ marginTop: '7em' }}>
              <Route component={ActivityDashboard} path="/activities" exact />
              <Route
                component={ActivityForm}
                path={['/create', '/manage/:id']}
                key={location.key}
              />
              <Route component={ActivityDetails} path="/activities/:id" />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
