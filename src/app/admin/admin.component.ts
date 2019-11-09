import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter} from "rxjs/operators";
import {Subscription} from "rxjs";

import {AuthService} from "../core/auth.service";
import {User} from "firebase";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
    user: User;
    private subscription: Subscription;

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.subscription = this.authService.user
            .pipe(
                filter(value => value !== undefined)
            )
            .subscribe(user => {
                if (user) {
                    this.user = user;
                } else {
                    this.authService.login();
                }
            });
    }

    logout(): void {
        this.subscription.unsubscribe();
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
