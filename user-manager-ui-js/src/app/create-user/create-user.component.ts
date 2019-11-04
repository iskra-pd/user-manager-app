import { UserService } from '../user.service';
import { User } from '../user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User = new User();
  submitted = false;
  selDate= null;

  constructor(private userService: UserService,
    private router: Router,public activeModal: NgbActiveModal) { }

  ngOnInit(){}



  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
	//format date from date picker
	let selDateFormat= this.selDate.year + "-"+ this.selDate.month + "-"+ this.selDate.day;
	this.user.dob = new Date(selDateFormat);
	// send user to db 
    this.userService.createUser(this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
	this.activeModal.close();
    
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
   this.router.navigate(['/users'],{
   queryParams: {refresh: new Date().getTime()}
	});
  }
}
