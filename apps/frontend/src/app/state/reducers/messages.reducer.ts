import { createReducer, on } from '@ngrx/store';

import { MessageInterface } from '../../models/message.model';
import { addMessage, restoreMessages } from '../actions/messages.actions';

export interface StateInterface {
  messages: MessageInterface[];
}

export const InitialState: StateInterface = {
  messages: [],
};

export const messagesReducer = createReducer(
  InitialState,
  on(addMessage, (state, { message }) => {
    return {
      ...state,
      messages: [...state.messages, message],
    };
  }),
  on(restoreMessages, (state, { messages }) => {
    return {
      ...state,
      messages: [...messages],
    };
  })
);
