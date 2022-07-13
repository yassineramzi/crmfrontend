import { Component, ChangeDetectionStrategy, OnInit, HostListener } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';

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

  public events: CalendarEvent[] = [
    {
      start: setHours(setMinutes(new Date(), 0), 15),
      end: setHours(setMinutes(new Date(), 30), 15),
      title: 'Rendez-vous Dr.Adil Chtioui',
      color: colors.red
    },
    {
      start: setHours(setMinutes(new Date(), 0), 14),
      end: setHours(setMinutes(new Date(), 30), 14),
      title: 'Rendez-vous Dr.Abdelatif Kouttani',
      color: colors.blue
    }
  ];

  constructor(){
  }

  ngOnInit() {
    this.setViewMode();
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

}