import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogComponent} from '../shared/dialog/dialog.component';
import {SnackComponent} from '../shared/components/snack/snack.component';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    constructor(private dialog: MatDialog, private snack: MatSnackBar, private db: AngularFirestore) {
    }

    deleteConfirmation(dialogData: any, snackData: string, item, method) {
        console.log(method(item));
        return this.dialog.open(DialogComponent, {data: dialogData})
            .afterClosed().subscribe(res => {
                if (res) {
                    return method(item)
                        .then(() => {
                            return this.snack.openFromComponent(SnackComponent, {data: snackData});
                        });
                }
            });
    }
}
