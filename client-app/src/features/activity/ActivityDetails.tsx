import React, { useContext, useEffect } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import ActivityStore from '../../store/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import LoadingComponent from '../../layout/LoadingComponent';

interface DetailsParam {
  id: string;
}
const ActivityDetails: React.FC<RouteComponentProps<DetailsParam>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity)
    return <LoadingComponent content="Loading Activity" />;
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
          as={Link}
          to={`/manage/${activity.id}`}
          basic
          color="blue"
        />
        <Button
          color="red"
          basic
          onClick={() => {
            history.push('/activities');
          }}
          content="Cancel"
        />
      </Button.Group>
    </Card>
  );
};

export default observer(ActivityDetails);
