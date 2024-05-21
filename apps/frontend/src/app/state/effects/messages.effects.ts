import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as MessagesActions from '../actions/messages.actions';
import { MessagesService } from '../../services/messages.service';

@Injectable()
export class MessagesEffects {
  constructor(
    private actions$: Actions,
    private messagesService: MessagesService,
    private store: Store
  ) {}

  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.addMessage),
      tap(() => {}),
      mergeMap(({ message }) =>
        this.messagesService.addMessage(message).pipe(
          map(() => MessagesActions.addMessageSuccess({ message })),
          catchError(() => of(MessagesActions.addMessageFailure()))
        )
      )
    )
  );

  addMessageSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.addMessageSuccess),
      switchMap(() =>
        this.messagesService.getMessages().pipe(
          map((messages) =>
            MessagesActions.restoreMessages({ messages: messages })
          ),
          catchError(() => of(MessagesActions.addMessageFailure()))
        )
      )
    )
  );
}
