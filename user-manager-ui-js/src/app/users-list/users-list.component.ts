import { UserDetailsComponent } from '../user-details/user-details.component';
import { Observable } from "rxjs";
import { UserService } from "../user.service";
import { User } from "../user";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { CreateUserComponent } from '../create-user/create-user.component'

import {NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-delete',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">Delete User</h4>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    Are you sure you want to delete user {{userId}}?
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="modal.close('Save click')">Ok</button>
	<button type="button" class="btn btn-danger" (click)="modal.dismiss('cancel click')">Cancel</button>
  </div>
`
})

export class NgbdModalDelete{
  constructor(public modal: NgbActiveModal) {}
  
   public userId = 0;
}



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

   public users$: Observable<User[]>;
   closeResult: string;
   modalOptions: NgbModalOptions;
   

  constructor(private userService: UserService,
    private router: Router, private modalService: NgbModal,
	private activatedRoute: ActivatedRoute) {
	}
  
    private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit(): void {
	   this.reloadData();
	   
  this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
    const refresh = paramMap.get('refresh');
    if (refresh) {
      this.reloadData();
    }
  });

  }

  reloadData() {
    this.users$ = this.userService.getUsersList();
  }
  
  createUser(){
	  this.modalService.open(CreateUserComponent)
  }

  deleteDialog(id:number){
	  const modalRef = this.modalService.open(NgbdModalDelete)
	  modalRef.componentInstance.userId= id;
	  
	  modalRef.result.then((result) => {
      this.deleteUser(id);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  deleteUser(id: number) {
	    this.userService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));

  }

  userDetails(id: number){
    this.router.navigate(['details', id]);
  }
}

