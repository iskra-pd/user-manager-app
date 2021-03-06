import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  user: User = new User();
  selDate = null;
  userId = null;
  
  @ViewChild('f',null) userForm: NgForm;
  
  constructor(private userService: UserService,
    private router: Router,public activeModal: NgbActiveModal) { }

  ngOnInit(){
	 if(this.userId){
		this.userService.getUser(this.userId)
      .subscribe(data => {
        console.log(data);
        this.user = data;
		
		//Set datepicker value
		let dob = new Date(this.user.dob);
		this.selDate = {
			year: dob.getUTCFullYear(),
			month: dob.getUTCMonth() +1,
			day: dob.getUTCDate()
		};
      }, error => console.log(error)); 
	 }     
  }


  save() {
	//format date from date picker
	this.user.dob = this.selDate.year + "/"+ this.selDate.month + "/"+ this.selDate.day;
	
	if(this.userId){
		//update existing user
	this.userService.updateUser(this.userId, this.user)
      .subscribe(data => {
		   this.gotoList();
	  
	  }, error => console.log(error));
	} else {
		// save new user to db 
    this.userService.createUser(this.user)
      .subscribe(data => {
		  this.gotoList();
		  }, error => console.log(error));
	}
	
    this.user = new User();
	this.activeModal.close();
    
  }

  onSubmit() {
    this.save();    
  }

  gotoList() {
   this.router.navigate(['/users'],{
   queryParams: {refresh: new Date().getTime()}
	});
  }
}
