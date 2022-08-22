import { FormControl } from "@angular/forms";
// https://stackoverflow.com/questions/55574382/spring-cloud-gateway-for-composite-api-calls
export class Planification {
    public id : number;

    public dateDebut : Date;

    public dateFin : Date;

    public proprietaire : number;

    public medecin : number;

    constructor(formControl: FormControl, date: Date){
        this.medecin = formControl.value.id;
        this.proprietaire = formControl.value.proprietaire;
        const time = formControl.value.time;
        this.dateDebut = new Date(date);
        this.dateDebut.setHours(Planification.getHours(time).valueOf()+1, Planification.getMinutes(time).valueOf());
        this.dateFin = new Date(date);
        this.dateFin.setHours(Planification.getHoursFinPlanification(time).valueOf()+1, Planification.getMinutesFinPlanification(time));
    }

    private static getHours(time: string): Number {
        return new Number(time.substring(0, time.indexOf(":")));
    }

    private static getMinutes(time: string): Number {
        return new Number(time.substring((time.indexOf(":")+1)));
    }

    private static getMinutesFinPlanification(time: string): number {
        let minutes = Planification.getMinutes(time).valueOf();
        return minutes == 30 ? 0 : 30 ;
    }

    private static getHoursFinPlanification(time: string): number {
        let hours = Planification.getHours(time).valueOf();
        let minutes = Planification.getMinutes(time).valueOf();
        return (minutes == 30) ? (hours+1) : (hours) ;
    }
}