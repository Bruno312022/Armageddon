import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventoListPageRoutingModule } from './evento-list-routing.module';

import { EventoListPage } from './evento-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventoListPageRoutingModule
  ],
  declarations: [EventoListPage]
})
export class EventoListPageModule {}
