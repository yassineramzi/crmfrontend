import Secteur from "./secteur.model";
import Specialite from "./specialite.model";

export default class Medecin {
    public id: number;

    public nom: string;

    public prenom: string;

    public mobile: string;

    public adresse: string;

    public potentiel: string;
    
    public secteur: Secteur;

    public specialite: Specialite;
}