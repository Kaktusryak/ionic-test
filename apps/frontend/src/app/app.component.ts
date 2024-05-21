import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { MessagesService } from './services/messages.service';
import { restoreMessages } from './state/actions/messages.actions';


@Component({
  selector: 'organization-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  messagesService = inject(MessagesService);
  store = inject(Store);
  menuCtrl = inject(MenuController);

  menuTitle = 'Pages:';

  subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.messagesService
      .getMessages()
      .subscribe((messages) => {
        this.store.dispatch(restoreMessages({ messages: messages }));
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onMenuClose() {
    this.menuCtrl.close();
  }
}
