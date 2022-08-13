import { Component, ChangeDetectionStrategy, OnInit, HostListener } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';
import * as moment from 'moment';
import { Planification } from '../../models/planification.model';
import PlanificationService from '../../services/planification.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendrier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls : ['./calendrier.component.scss'],
  templateUrl: './calendrier.component.html',
})
export class CalendrierComponent implements OnInit{
  
  public viewDate: Date = new Date();

  public isMobileView: boolean = false;

  public events: CalendarEvent[] = [];

  constructor(
    private planificationService: PlanificationService
  ){
  }

  ngOnInit() {
    this.setViewMode();
    this.planificationService.getPlanificationsByUser().subscribe(
      response => {
        console.log(response.body);
        this.setEventFromPlanifications(response.body);
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setViewMode();
  }

  private setViewMode(): void {
    const screenWidth = window.screen.width;
    if (screenWidth >= 320 && screenWidth <= 480) { // 768px portrait
      this.isMobileView = true;
    }
  }

  private setEventFromPlanifications(planifications: Planification[]): void {
    planifications.forEach(planification => {
      this.events.push(
        {
          start: new Date(planification.dateDebut),
          end: new Date(planification.dateFin),
          title: 'Rendez-vous '+planification.medecin,
          color: colors.blue
        }
      );
    });
    this.setViewMode();
  }

}