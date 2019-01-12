import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table/table.component';
import {TestRoutingModule} from './test-routing.module';
import {SharedModule} from '../shared/shared.module';
import {AddComponent} from './add/add.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [TableComponent, AddComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        TestRoutingModule
    ],
    entryComponents: [AddComponent]
})
export class TestModule {
}
