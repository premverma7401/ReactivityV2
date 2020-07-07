import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IActivity } from '../../models/Activity';
interface IProps {
  activity: IActivity;
  setSelectedActivity: (activity: IActivity | null) => void;
  setEditMode: (editMode: boolean) => void;
}

const ActivityDetails: React.FC<IProps> = ({
  activity,
  setEditMode,
  setSelectedActivity,
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        alt="basic"
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {activity.venue} and {activity.city}
      </Card.Content>
      <Button.Group widths={2}>
        <Button
          content="Edit"
          onClick={() => setEditMode(true)}
          basic
          color="blue"
        />
        <Button
          color="red"
          basic
          onClick={() => setSelectedActivity(null)}
          content="Cancel"
        />
      </Button.Group>
    </Card>
  );
};

export default ActivityDetails;
