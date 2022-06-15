import { FormGroup } from "@angular/forms";
import Societe from "./societe.model";

export class ThemeSettings {
    public couleurTheme : string;
    public couleurMenuSelectione : string;
    public couleurPolice : string;
    public favIconImageBase64: string;
    public logoImageBase64: string;
    public societe: Societe;

    public constructor(formGroup: FormGroup, favIconImageBase64?: string, logoImageBase64?: string, societe?: Societe){
        this.couleurTheme = formGroup.get(['couleurTheme'])!.value;
        this.couleurMenuSelectione = formGroup.get(['couleurMenuSelectione'])!.value;
        this.couleurPolice = formGroup.get(['couleurPolice'])!.value;
        this.favIconImageBase64 = favIconImageBase64;
        this.logoImageBase64 = logoImageBase64;
        this.societe = societe;
    }
}