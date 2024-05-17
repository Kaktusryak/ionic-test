import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';
import { StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app-routing.module';
import { metaReducers, reducers } from './state/reducers';
import { MessagesEffects } from './state/effects/messages.effects';



const firebaseConfig = {
  apiKey: 'AIzaSyC2HK6t2T10a3vodJbHbQqbn_1QvTm0j3M',
  authDomain: 'messages-fd8b5.firebaseapp.com',
  databaseURL:
    'https://messages-fd8b5-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'messages-fd8b5',
  storageBucket: 'messages-fd8b5.appspot.com',
  messagingSenderId: '112228771360',
  appId: '1:112228771360:web:105019fe4dab177a9f3e45',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(reducers, { 
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([MessagesEffects]),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
