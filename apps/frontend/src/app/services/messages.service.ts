import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { addDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

import { MessageInterface } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  firestore = inject(Firestore);
  messagesCollection = collection(this.firestore, 'messages');


  getMessages(): Observable<MessageInterface[]> {
    const messagesQuery = query(this.messagesCollection, orderBy('date', 'desc'));
    return collectionData(messagesQuery, {
      idField: 'id',
    }) as Observable<MessageInterface[]>;
  }

  addMessage(message: MessageInterface): Observable<string> {
    const promise = addDoc(this.messagesCollection, message).then(
      (response) => response.id
    );
    return from(promise);
  }

  removeMessage(messageId: string): Observable<void> {
    const docRef = doc(this.firestore, 'messages/' + messageId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
