import { Component, OnInit, ViewChild } from '@angular/core';
import { Input, WritableSignal, inject, signal } from '@angular/core';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';

import { IonModal } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessagesService } from '../services/messages.service';
import { Store, select } from '@ngrx/store';
import { addMessage, restoreMessages } from '../state/actions/messages.actions';
import { MessageInterface } from '../models/message.model';
import { selectAllMessages } from '../state/selectors/messages.selectors';

@Component({
  selector: 'organization-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  @ViewChild(IonModal) modal!: IonModal;
  fb = inject(FormBuilder);
  messagesService = inject(MessagesService);
  store = inject(Store);
  loadiongCtrl = inject(LoadingController)
  toastCtrl = inject(ToastController)

  messageForm = this.fb.group({
    name: ['', Validators.required],
    text: ['', Validators.required],
  });

  messages: MessageInterface[] = [];

  ngOnInit() {
    this.store.pipe(select(selectAllMessages)).subscribe((messages) => {
      this.messages = messages;
      console.log(messages);
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async onSubmit() {
    const loading = await this.loadiongCtrl.create({
      message:'Creating...',
      spinner:'lines'
    })
    const toast = await this.toastCtrl.create({
      message: 'Success!',
      duration: 1500,
      position: 'bottom',
    });
    if (!this.messageForm.invalid) {
      await loading.present()
      const newMessage={
        name: this.messageForm.getRawValue().name || '',
            text: this.messageForm.getRawValue().text || '',
            id: '',
            date: new Date().toISOString().substring(0,10)
      }
      this.store.dispatch(addMessage({message:newMessage}))
      this.messageForm.reset()
      this.modal.dismiss(null, 'submit')
      await loading.dismiss()
      await toast.present()
    }
  }

  onDelete(messageId:string){
    console.log(messageId)
    this.messagesService.removeMessage(messageId)
  }
}
