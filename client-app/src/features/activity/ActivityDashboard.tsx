import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';
import ActiivtyForm from '../form/ActivityForm';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../store/activityStore';

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { editMode, selectedActivity } = activityStore;

  return (
    <Grid>
      <Grid.Column width="8">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="8">
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActiivtyForm
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
