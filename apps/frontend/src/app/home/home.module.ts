import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  InfiniteScrollCustomEvent,
  IonBadge,
  IonLabel,
  IonAvatar,
  IonItem,
  IonList,
  IonLoading,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSkeletonText,
  IonAlert,
  IonFooter,
} from '@ionic/angular/standalone';

import { HomePageRoutingModule } from './home-routing.module';

import {TestModule} from '@organization/library'
import { TestComponent } from 'libs/library/src/lib/test/test.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBadge,
    IonLabel,
    IonAvatar,
    IonItem,
    IonList,
    IonLoading,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSkeletonText,
    IonAlert,
    IonFooter,
    TestModule
  
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
