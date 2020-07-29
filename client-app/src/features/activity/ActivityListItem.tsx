import React from 'react';
import { Item, Divider, Button, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IActivity } from '../../models/Activity';

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={'/assets/user.png'} />

            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Extra>{activity.date}</Item.Extra>
              <Item.Description>Hosted By Prem Sager</Item.Description>
              <Item.Meta>
                {activity.venue} -{activity.city}
              </Item.Meta>
              <Divider />
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {activity.date}
        <Icon name="marker" /> {activity.city},{activity.venue}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          floated="right"
          color="blue"
          content="View More"
          as={Link}
          to={`/activities/${activity.id}`}
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
