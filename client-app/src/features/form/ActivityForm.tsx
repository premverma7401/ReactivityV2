import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../models/Activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../store/activityStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  activity: IActivity;
}
const ActiivtyForm: React.FC<IProps> = ({ activity: initialState }) => {
  const activityStore = useContext(ActivityStore);
  const {
    cancelCreateForm,
    createActivity,
    editActivity,
    submitting,
  } = activityStore;

  const handleInitialForm = () => {
    if (initialState) return initialState;
    else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: '',
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(handleInitialForm);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          value={activity.title}
          onChange={handleInputChange}
          name="title"
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          value={activity.description}
          onChange={handleInputChange}
          name="description"
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          onChange={handleInputChange}
          name="category"
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
          onChange={handleInputChange}
          name="date"
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          onChange={handleInputChange}
          name="venue"
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          onChange={handleInputChange}
          name="city"
        />
        <Button.Group widths={2}>
          <Button loading={submitting} content="Save" type="submit" positive />
          <Button
            content="Cancel"
            type="button"
            color="red"
            onClick={() => cancelCreateForm()}
          />
        </Button.Group>
      </Form>
    </Segment>
  );
};

export default observer(ActiivtyForm);
