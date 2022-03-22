import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@mnplus/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private usrSrv: UsersService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.usrSrv.deleteUser(userId).subscribe(
        () => {
          this._getUsers();
          this.msgService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category is deleted'
          });
        },
        () => {
          this.msgService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category is not deleted'
          });
        });
      }
    });
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`categories/form/${userId}`);
  }


  private _getUsers()
  {
    this.usrSrv.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}
