import { DocumentReference } from "@angular/fire/firestore";
import { UserProfile } from "./user-profile.interface";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profile: DocumentReference<UserProfile>
}
