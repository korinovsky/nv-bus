import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {wayDirectionName, Stop, WayPoint} from '~core/models/stop.model';
import {StopsService} from "~core/stops.service";
import * as _ from "lodash";
import {Observable} from "rxjs";
import {MatOption, MatSelectChange} from "@angular/material";
import * as autobind from "autobind";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    stop: Stop;
    stopsService: StopsService;
    form = this.formBuilder.group({
        name: [null, Validators.required],
        way: [null, Validators.required],
        direction: [null, Validators.required],
        wayPoint: [null, Validators.required],
    });
    directionOptions = _.map(wayDirectionName, (name, value) => ({name, value}));
    ways: Observable<string[]>;
    wayPoints: Observable<WayPoint[]>;
    wayDirection: string;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<FormComponent>,
    ) {
    }

    get name() {
        return this.form.get('name') as FormControl;
    }

    get way() {
        return this.form.get('way') as FormControl;
    }

    get direction() {
        return this.form.get('direction') as FormControl;
    }

    get wayPoint() {
        return this.form.get('wayPoint') as FormControl;
    }

    get title() {
        return this.stop ? 'Изменение остановки' : 'Создание остановки';
    }

    get buttonText() {
        return this.stop ? 'Изменить' : 'Создать';
    }

    ngOnInit(): void {
        [this.way, this.direction].forEach(control =>
            control.valueChanges.subscribe(this.wayDirectionChanged));
    }

    process() {
        if (this.form.valid) {
            const processFn = () => {
                if (this.stop) {
                    return this.stopsService.update(this.form.value, this.stop.key)
                }
                return this.stopsService.push(this.form.value);
            };
            this.form.disable();
            processFn()
                .then(() => this.dialogRef.close())
                .catch(() => this.form.enable());
        } else {
            this.form.markAllAsTouched();
        }
    }

    initForm(stopsService: StopsService, stop?: Stop) {
        this.stopsService = stopsService;
        this.ways = this.stopsService.ways$;
        if (stop) {
            this.stop = stop;
            this.form.reset(stop);
            this.wayDirectionChanged();
        }
    }

    wayPointChange(selectChange: MatSelectChange) {
        this.name.setValue((selectChange.source.selected as MatOption).viewValue);
    }

    @autobind
    private wayDirectionChanged() {
        const wayDirection = this.way.value + this.direction.value;
        if (this.wayDirection !== wayDirection) {
            if (this.way.valid && this.direction.valid) {
                this.wayPoints = this.stopsService.wayPoints$(this.way.value, this.direction.value);
                if (this.wayDirection) {
                    this.wayPoint.reset();
                }
            }
            this.wayDirection = wayDirection;
        }
    }
}
