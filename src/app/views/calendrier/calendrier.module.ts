import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendrierComponent } from './calendrier.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { CalendrierRoutingModule } from './calendrier-routing.module';

@NgModule({
  declarations: [
    CalendrierComponent
  ],
  imports: [
    CommonModule,
    CalendrierRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class CalendrierModule { }
