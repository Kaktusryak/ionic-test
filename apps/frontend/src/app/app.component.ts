import { Component, inject } from '@angular/core';
import { MessagesService } from './services/messages.service';
import { Store } from '@ngrx/store';
import { restoreMessages } from './state/actions/messages.actions';
import { MenuController } from '@ionic/angular' 

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
