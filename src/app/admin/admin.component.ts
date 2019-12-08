import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {AuthService} from '~core/auth.service';
import {DirectionsService} from "~core/directions.service";
import {Direction} from "~core/models/direction.model";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
    directions: Direction[];
    private subscription: Subscription;
    private first = true;

    constructor(
        private authService: AuthService,
        private directionsService: DirectionsService
    ) {}

    ngOnInit(): void {
        this.subscription = this.authService.user
            .pipe(
                filter(value => value !== undefined)
            )
            .subscribe(user => {
                if (user) {
                    this.directionsService.items.subscribe(value => this.directions = value);
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
