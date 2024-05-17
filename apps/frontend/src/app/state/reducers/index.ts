import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { messagesReducer } from './messages.reducer';

export const messagesFeatureKey = 'messages';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  messages:messagesReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
