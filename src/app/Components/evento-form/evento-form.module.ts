import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventoFormPageRoutingModule } from './evento-form-routing.module';

import { EventoFormPage } from './evento-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventoFormPageRoutingModule
  ],
  declarations: [EventoFormPage]
})
export class EventoFormPageModule {}
