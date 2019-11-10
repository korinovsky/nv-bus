import {Component, Input} from '@angular/core';
import {Direction, DirectionsService} from "../../../core/directions.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent {
    @Input() direction: Direction;
    form = this.formBuilder.group({
        name: [null, Validators.required]
    });

    constructor(
        private directionsService: DirectionsService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<FormComponent>
    ) {}

    get name() {
        return this.form.get('name') as FormControl;
    }

    get title() {
        return this.direction ? 'Изменение направления' : 'Создание направления';
    }

    get buttonText() {
        return this.direction ? 'Изменить' : 'Создать';
    }

    process() {
        if (this.form.valid) {
            const processFn = () => {
                if (this.direction) {
                    return this.directionsService.update(this.direction.key, this.form.value)
                }
                return this.directionsService.push(this.form.value);
            };
            this.form.disable();
            processFn()
                .then(() => this.dialogRef.close())
                .catch(() => this.form.enable());
        } else {
            this.form.markAllAsTouched();
        }
    }

    setDirection(direction: Direction) {
        this.direction = direction;
        this.form.reset(direction);
    }
}
