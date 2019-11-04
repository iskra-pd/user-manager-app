import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersListComponent } from './users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalDelete } from './users-list/users-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
	NgbdModalDelete,
    UserDetailsComponent,
    UsersListComponent
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
 