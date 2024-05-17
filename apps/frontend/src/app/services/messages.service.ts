import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { MessageInterface } from '../models/message.model';
import { addDoc, deleteDoc, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  firestore = inject(Firestore);
  messagesCollection = collection(this.firestore, 'messages');

  getMessages(): Observable<MessageInterface[]> {
    return collectionData(this.messagesCollection, {
      idField: 'id',
    }) as Observable<MessageInterface[]>;
  }

  addMessage(message: MessageInterface): Observable<string> {
    const promise = addDoc(this.messagesCollection, message).then(
      (response) => response.id
    );
    return from(promise)
  }

  removeMessage(messageId:string):Observable<void>{
    const docRef = doc(this.firestore, 'messages/'+messageId)
    const promise = deleteDoc(docRef)
    return from(promise)
  }
}
