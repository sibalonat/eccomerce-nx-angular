import { Subject, takeUntil, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UsersService } from '@mnplus/users';
import { MessageService } from 'primeng/api';
import * as countriesLib from "i18n-iso-countries";

declare let require: any;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  countries = [] as  any;
  currentUserId!: string;
  endSubs$: Subject<void> = new Subject<void>();

  constructor(
    private msgService: MessageService,
    private formBuilder: FormBuilder,
    private usrSrv: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
    this._checkEditMode();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getCountries()
  {

    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(
      (entry) => {
      return {
        id: entry[0],
        name: entry[1]
      }
    });
    console.log(this.countries);
  }

  private _initUserForm()
  {
    this.form =  this.formBuilder.group({
      name: ['', Validators.required],
      password: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      appartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }

  private _addUser(user: User)
  {
    this.usrSrv.createUser(user).pipe(takeUntil(this.endSubs$)).subscribe(
      (user: User) => {
        this.msgService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${user.name} is created`
        });
        timer(2000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
      },
      () => {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'user is not created'
        });
      }
    )
  }
  private _updateUser(user: User)
  {
    this.usrSrv.updateUser(user).pipe(takeUntil(this.endSubs$)).subscribe(
      () => {
        this.msgService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category is updated`
        });
        timer(2000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
      },
      () => {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'user is not updated'
        });
      }
    )
  }

  private _checkEditMode()
  {
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentUserId = params['id'];
        this.usrSrv.getUser(params['id']).pipe(takeUntil(this.endSubs$)).subscribe((user) => {
          this.userForm['name'].setValue(user.name);
          this.userForm['email'].setValue(user.email);
          this.userForm['phone'].setValue(user.phone);
          this.userForm['isAdmin'].setValue(user.isAdmin);
          this.userForm['street'].setValue(user.street);
          this.userForm['appartment'].setValue(user.appartment);
          this.userForm['zip'].setValue(user.zip);
          this.userForm['city'].setValue(user.city);
          this.userForm['country'].setValue(user.country);

          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity();
        });
      }
    });
  }

  onSubmit()
  {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      appartment: this.userForm['appartment'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,
      country: this.userForm['country'].value,
    };

    if (this.editMode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  onCancel() {
    this.location.back();
  }
  get userForm() {
    return this.form.controls;
  }

}
