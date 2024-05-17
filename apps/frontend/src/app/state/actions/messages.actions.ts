import { createAction, props } from '@ngrx/store';
import { MessageInterface } from '../../models/message.model';


export const addMessage = createAction('[Messages] Add Message', props<{ message: MessageInterface }>());
export const addMessageSuccess = createAction('[Messages] Add Message Success', props<{ message: MessageInterface }>());
export const addMessageFailure = createAction('[Messages] Add Message Failure');

export const restoreMessages = createAction('[Messages] Restore Messages', props<{messages:MessageInterface[]}>())