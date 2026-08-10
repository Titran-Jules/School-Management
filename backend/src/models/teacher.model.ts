import { User } from "./user.model.js";
import { UE } from "./ue.model.js";

export interface Teacher extends User {
    ues: UE[];
}