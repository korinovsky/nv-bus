import {Component} from '@angular/core';
import {AuthService} from "./core/auth.service";
import {User} from "firebase/app";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    user: User;

    constructor(authService: AuthService) {
        authService.user.subscribe(user => this.user = user);
    }
}
