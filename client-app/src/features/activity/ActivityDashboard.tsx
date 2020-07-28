import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../layout/LoadingComponent';
import ActivityStore from '../../store/activityStore';

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading Activities...." />;

  return (
    <Grid>
      <Grid.Column width="8">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="8">
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
