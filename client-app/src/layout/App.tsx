import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import Navbar from '../features/navbar/Navbar';
import ActivityDashboard from '../features/activity/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../store/activityStore';
import '../layout/style.css';

const App: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading Activities...." />;

  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </div>
  );
};

export default observer(App);
