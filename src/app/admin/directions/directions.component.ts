import {Component, Input, OnInit} from '@angular/core';
import {DirectionsService} from "~core/directions.service";
import {MatDialog} from "@angular/material/dialog";
import {FormComponent} from "./form/form.component";
import {Direction} from "~core/models/direction.model";

@Component({
    selector: 'app-directions',
    templateUrl: './directions.component.html',
    styleUrls: ['./directions.component.scss']
})
export class DirectionsComponent implements OnInit {
    @Input() directions: Direction[];
    columns = ['name', 'actions'];
    trackById = (index, direction: Direction) => direction.key;

    constructor(
        private directionsService: DirectionsService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.directionsService.items.subscribe(items => this.directions = items);
    }

    create() {
        this.dialog.open(FormComponent)
    }

    remove(key: string) {
        this.directionsService.remove(key);
    }

    update(direction: Direction) {
        this.dialog.open(FormComponent).componentInstance.setDirection(direction);
    }
}
