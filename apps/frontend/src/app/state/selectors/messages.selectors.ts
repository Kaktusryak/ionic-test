import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StateInterface } from '../reducers/messages.reducer';

export const selectFeature = createFeatureSelector<StateInterface>('messages');

export const selectAllMessages = createSelector(
  selectFeature,
  (state: StateInterface) => state.messages
);

export const selectMessageById = (id: string) =>
  createSelector(selectFeature, (state: StateInterface) =>
    state.messages.filter((message) => message.name === id)
  );
