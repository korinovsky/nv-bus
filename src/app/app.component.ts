import {Component} from '@angular/core';
import {AuthService} from '~core/auth.service';
import {User} from 'firebase/app';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    user: User;

    constructor(
        private authService: AuthService
    ) {
        this.authService.user.subscribe(user => this.user = user);
    }

    logout() {
        this.authService.logout();
    }
}
