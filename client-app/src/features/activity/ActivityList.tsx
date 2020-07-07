import React, { Fragment } from 'react';
import {
  Item,
  Image,
  Segment,
  Button,
  Divider,
  Label,
} from 'semantic-ui-react';
import { IActivity } from '../../models/Activity';

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  submitting: boolean;
}
const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  submitting,
}) => {
  return (
    <Segment clearing>
      {activities.map((value) => (
        <Fragment key={value.id}>
          <Item.Group divided>
            <Item>
              <Item.Image
                src={`/assets/categoryImages/${value.category}.jpg`}
              />

              <Item.Content>
                <Item.Header as="a">{value.title}</Item.Header>
                <Item.Extra>{value.date}</Item.Extra>
                <Item.Meta>{value.description}</Item.Meta>
                <Item.Description>
                  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Item.Description>
                <Item.Meta>
                  {value.venue} -{value.city}
                </Item.Meta>
                <Divider />
                <Item.Extra>
                  <Label content={value.category} />
                  <Button
                    floated="right"
                    color="blue"
                    content="View More"
                    onClick={() => selectActivity(value.id)}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
            <Divider horizontal />
          </Item.Group>
        </Fragment>
      ))}
    </Segment>
  );
};

export default ActivityList;
