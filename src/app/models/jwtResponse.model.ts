import Societe from "./societe.model";

export class JwtResponse {
  public token: string;
  public type: string;
  public id: number;
  public username: string;
  public email: string;
  public societe: Societe;
  public roles: Array<string>;
}
