import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import ActivityStore from '../../store/activityStore';
import { observer } from 'mobx-react-lite';

const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    openEditForm,
    cancelSelection,
  } = activityStore;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        alt="basic"
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {activity!.venue} and {activity!.city}
      </Card.Content>
      <Button.Group widths={2}>
        <Button
          content="Edit"
          onClick={() => openEditForm(activity!.id)}
          basic
          color="blue"
        />
        <Button
          color="red"
          basic
          onClick={() => cancelSelection()}
          content="Cancel"
        />
      </Button.Group>
    </Card>
  );
};

export default observer(ActivityDetails);
