import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  AbstractControl,
  NgForm,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import {
  LoadingType,
  LoadingMode,
  TdDialogService,
  TdLoadingService
} from "@covalent/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Store } from "@ngrx/store";

import { take, map, catchError } from "rxjs/operators";

import { throwError } from "rxjs";

/**componentName called from LoginComponent */
const componentName: string = "LoginComponent";
/**loaderLinearName called from loaderLinearNameComponent */
const loaderLinearName: string = `${componentName}LoaderLinear`;
/**loaderCircularName called from loaderCircularNameComponent */
const loaderCircularName: string = `${componentName}LoaderCiruclar`;

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  usernameControl: FormControl;
  passwordControl: FormControl;
  username: string;
  password: string;
  prevRoute: string;
  authFailureMessage: string;
  rememberMeControl: FormControl;
  rememberMe: boolean = false;
  isAuthorized: boolean = false;
  authFailed: boolean = false;
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _dialogService: TdDialogService,
    private _loadingService: TdLoadingService
  ) {}

  ngOnInit() {
    this._loadingService.create({
      name: loaderLinearName,
      type: LoadingType.Linear,
      mode: LoadingMode.Indeterminate,
      color: "primary"
    });
    this._loadingService.create({
      name: loaderCircularName,
      type: LoadingType.Circular,
      mode: LoadingMode.Indeterminate,
      color: "primary"
    });

    this.initRoute();
  }

  initRoute(): void {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this.initComponent();
    });
  }

  initComponent(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.usernameControl = new FormControl(undefined, [
      (control: AbstractControl) => {
        let isValid: boolean = true;
        if (!control.value || !control.value.trim()) {
          isValid = false;
        }
        return !isValid
          ? { required: true, requiredMessage: "Required" }
          : undefined;
      }
    ]);
    this.passwordControl = new FormControl(undefined, [
      (control: AbstractControl) => {
        let isValid: boolean = true;
        if (!control.value || !control.value.trim()) {
          isValid = false;
        }
        return !isValid
          ? { required: true, requiredMessage: "Required" }
          : undefined;
      }
    ]);
    this.rememberMeControl = new FormControl(undefined, []);
    this.loginForm = this.formBuilder.group({
      username: this.usernameControl,
      password: this.passwordControl,
      rememberMe: this.rememberMeControl
    });
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.rememberMe = this.loginForm.value.rememberMe;
    // this._activateService
    //   .authorize(this.username, this.password)
    //   .pipe(
    //     map((response: any) => {
    //       if (response.id) {
    //         this.isAuthorized = true;
    //         sessionStorage.setItem("adminRole", response.roles[0].rname);
    //         this._store.dispatch(new ActionProfileUpdateAll(response));
    //         this._router.navigate([""]);
    //       } else {
    //         this.isAuthorized = false;
    //       }
    //     }),
    //     catchError(errMess => {
    //       this.authFailed = true;
    //       this.authFailureMessage = "Invalid Credentials";
    //       return throwError(errMess);
    //     })
    //   )
    //   .subscribe();
  }
}
