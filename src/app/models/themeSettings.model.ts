import { FormGroup } from "@angular/forms";

export class ThemeSettings {
    public couleurTheme : string;
    public couleurMenuSelectione : string;
    public couleurPolice : string;

    public constructor(formGroup: FormGroup){
        this.couleurTheme = formGroup.get(['couleurTheme'])!.value;
        this.couleurMenuSelectione = formGroup.get(['couleurMenuSelectione'])!.value;
        this.couleurPolice = formGroup.get(['couleurPolice'])!.value;
    }
}