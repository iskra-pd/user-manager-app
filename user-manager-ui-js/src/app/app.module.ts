import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalDelete, NgbdSortableHeader } from './users-list/users-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddEditUserComponent,
	NgbdModalDelete,
	NgbdSortableHeader,
    UsersListComponent,
  ],
  entryComponents:[
	NgbdModalDelete
  ],
  imports: [
	AppRoutingModule,
    BrowserModule,
	FormsModule,
	HttpClientModule,
	NgbModule,
	ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 