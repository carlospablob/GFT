import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';


@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(
        private snackBar: MatSnackBar) {
    }

    messageBar(msg: string, time: number) {
        this.snackBar.open(msg, null, {duration: time, verticalPosition: 'bottom', horizontalPosition: 'end'});
    }
}
