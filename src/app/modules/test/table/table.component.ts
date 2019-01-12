import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Data} from '../../shared/data.interface';
import {DataService} from '../../shared/data.service';
import {AddComponent} from '../add/add.component';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['Id', 'Title', 'Color', 'Delete'];
    dataSource: MatTableDataSource<Data>;
    selectedRecord: Data;
    subscription;
    addMode = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private dataService: DataService, public dialog: MatDialog) {
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit() {
        // Setting up pagination and sorting.
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Lets fetch data from dataService.
        this.getData();
    }

    ngOnDestroy() {
        // As we never call complete on this subject
        // we need to manually unsubscribe it.
        this.subscription.unsubscribe();
    }

    getData() {
        this.dataService.getData().subscribe((data: Data[]) => {
            // Data recieved.
            this.dataSource.data = data;
        }, err => {
            // Error occured while getting data
            alert('Error occured while getting data');
        });

        // Subscribing to data update events.
        this.subscription = this.dataService.updateNotification.subscribe((data: Data[]) => {
            this.dataSource.data = data;
        });
    }

    applyFilter(filterValue: string) {
        // Applying filteration on records.
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    addData() {
        // Setting initial data to '' and setting popup to Add mode
        this.addMode = true;
        this.selectedRecord = {
            id: null,
            title: '',
            text: '',
            color: '',
        };
        this.openPopUp();
    }

    editData(row) {
        // Setting data to edit and popup mode to edit;
        this.addMode = false;
        this.selectedRecord = Object.assign({}, row);
        this.openPopUp();
    }

    deleteData(row) {
        // Todo: A confirmation dialog, before deleting record.
        this.dataService.delete(row);
    }

    openPopUp() {
        // Opening fixed width popup.
        const dialogRef = this.dialog.open(AddComponent, {
            width: '250px',
            data: this.selectedRecord
        });

        dialogRef.afterClosed().subscribe(result => {
            // If we have result, Adding or updating record.
            if (result) {
                if (this.addMode) {
                    this.dataService.add(result);
                } else {
                    this.dataService.update(result);
                }
            }
        });
    }

}
