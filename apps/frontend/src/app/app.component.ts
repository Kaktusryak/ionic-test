import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuController } from '@ionic/angular' 

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
  menuCtrl = inject(MenuController)

  constructor() {}

  onMenuClose(){
    this.menuCtrl.close()
  }

  ngOnInit(){
    this.messagesService.getMessages().subscribe((messages) => {
      this.store.dispatch(restoreMessages({messages:messages}));
    });
  }
}
