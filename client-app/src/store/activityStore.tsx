import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../models/Activity';
import agent from '../api/agent';

configure({ enforceActions: 'always' });
class ActivityStore {
  @observable activityRegister = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable loadingInitial = false;
  @observable submitting = false;

  @computed get activitiesByDate() {
    return Array.from(this.activityRegister.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('Loading Activities', () => {
        activities.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          this.activityRegister.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('Error Loading Activities', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('Creating Activity', () => {
        this.activityRegister.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction('Error Creating Activity', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };
  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('Editing Activity', () => {
        this.activityRegister.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction('Error Editing Activity', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };
  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegister.get(id);
    this.editMode = true;
  };
  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegister.get(id);
    this.editMode = false;
  };
  @action cancelSelection = () => {
    this.selectedActivity = undefined;
  };
  @action cancelCreateForm = () => {
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
