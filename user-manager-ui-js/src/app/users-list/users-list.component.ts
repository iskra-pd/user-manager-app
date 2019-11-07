import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { UserService } from "../user.service";
import { User } from "../user";
import { Component, Directive, OnInit, EventEmitter, Input, Output, QueryList, ViewChildren} from "@angular/core";
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component'

import {NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';


/* Delete pop-up */
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

/* Sorting */
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
export interface SortEvent {
	column: string;
	direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

/* Users List */
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {

   public users:  User[];
   closeResult: string;
   modalOptions: NgbModalOptions;
   
   @Input() direction: SortDirection = '';
   @Output() sort = new EventEmitter<SortEvent>();
   @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
   
	

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
    this.userService.getUsersList().subscribe(data => { this.users = data;});
  }
  
  createUser(){
	  this.modalService.open(AddEditUserComponent);
  }
  
  editUser(id:number){
	const editModalRef = this.modalService.open(AddEditUserComponent);
	  editModalRef.componentInstance.userId= id;
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

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting users
    if (direction === '') {

    } else {
     this.users= this.users.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
	  })
      ;
    }
  }
}


