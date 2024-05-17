import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageInterface } from '../../models/message.model';
import { StateInterface } from '../reducers/messages.reducer';

export const selectFeature = createFeatureSelector<StateInterface>('messages');

export const selectAllMessages = createSelector(
  selectFeature,
  (state: StateInterface) => {
    const newArray = [...state.messages]
    newArray.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) {
        return -1; 
      }
      if (dateA > dateB) {
        return 1; 
      }
      return 0;
    });
    return newArray
  }
);

export const selectMessageById = (id: string) =>
  createSelector(selectFeature, (state: StateInterface) =>
    state.messages.filter((message) => message.name === id)
  );
