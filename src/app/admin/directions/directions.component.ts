import {Component, OnInit} from '@angular/core';
import {Direction, DirectionsService} from "../../core/directions.service";
import {MatDialog} from "@angular/material/dialog";
import {FormComponent} from "./form/form.component";

@Component({
    selector: 'app-directions',
    templateUrl: './directions.component.html',
    styleUrls: ['./directions.component.scss']
})
export class DirectionsComponent implements OnInit {
    directions: Direction[];
    columns = ['name', 'actions'];

    constructor(
        private directionsService: DirectionsService,
        public dialog: MatDialog
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
