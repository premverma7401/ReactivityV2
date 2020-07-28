import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../models/Activity';
import agent from '../api/agent';

configure({ enforceActions: 'always' });
class ActivityStore {
  @observable activityRegister = new Map();
  @observable selectedActivity: IActivity | null = null;
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

  @action loadActivity = async (id: string) => {
    let activity = this.activityRegister.get(id);
    if (activity) {
      this.selectedActivity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction('loading activity', () => {
          this.selectedActivity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction('error loading activity', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };
  @action clearActivity = () => {
    this.selectedActivity = null;
  };
  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('Creating Activity', () => {
        this.activityRegister.set(activity.id, activity);
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
        this.submitting = false;
      });
    } catch (error) {
      runInAction('Error Editing Activity', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };
}

export default createContext(new ActivityStore());
