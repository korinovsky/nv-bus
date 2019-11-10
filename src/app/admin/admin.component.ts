import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter} from "rxjs/operators";
import {Subscription} from "rxjs";

import {AuthService} from "../core/auth.service";
import {User} from "firebase/app";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
    user: User;
    private subscription: Subscription;
    private first = true;

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
                } else if (this.first) {
                    this.authService.login();
                }
                this.first = false;
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
