import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export default class PotentielService {
    public getClassPotentiel(potentiel: string): string{
        switch(potentiel) {
          case 'A+':
            return 'potentiel-A-plus';
          case 'A':
            return 'potentiel-A';
          case 'B+':
            return 'potentiel-B-plus';
          case 'B':
            return 'potentiel-B';
          case 'C+':
            return 'potentiel-C-plus';
          case 'C':
            return 'potentiel-C';
        }
    }
}