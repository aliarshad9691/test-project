import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Data} from '../../shared/data.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent {
    @ViewChild('form') form: NgForm;
    isEdit = false;

    constructor(public dialogRef: MatDialogRef<AddComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Data) {
        // If initial id is not empty its edit mode.
        if (this.data.id) {
            this.isEdit = true;
        }
    }

    done() {
        // Close dialog after some basic validation.
        if (this.form.valid) {
            this.dialogRef.close(this.data);
        } else {
            alert('All fields are mandatory');
        }
    }

}
