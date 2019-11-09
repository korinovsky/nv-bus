import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {auth, User} from "firebase";

@Injectable()
export class AuthService {
    user = new BehaviorSubject<User>(undefined);

    constructor(
        private fireAuth: AngularFireAuth,
        private router: Router
    ) {
        fireAuth.authState.subscribe(auth => {
            this.user.next(auth)
        });
    }

    login() {
        this.fireAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    }

    logout() {
        this.fireAuth.auth.signOut().then(() => this.router.navigateByUrl(''));
    }
}
