import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {
    MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatInputModule, MatPaginatorModule,
    MatTableModule
} from '@angular/material';
import {CardComponent} from './card/card.component';
import {DataService} from './data.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [SidebarComponent, CardComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        MatCardModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule
    ],
    exports: [
        MatCardModule,
        MatGridListModule,
        SidebarComponent,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [DataService]
        };
    }
}
