import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  AbstractControl
} from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import {
  TdDialogService,
  TdLoadingService,
  LoadingType,
  LoadingMode
} from "@covalent/core";

/**componentName called from RegisterComponent */
const componentName: string = "RegisterComponent";
/**loaderLinearName called from loaderLinearNameComponent */
const loaderLinearName: string = `${componentName}LoaderLinear`;
/**loaderCircularName called from loaderCircularNameComponent */
const loaderCircularName: string = `${componentName}LoaderCiruclar`;

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  operatorNameControl: FormControl;
  countryControl: FormControl;
  rateControl: FormControl;
  operatorName: string;
  country: string;
  rate: string;
  prevRoute: string;
  authFailureMessage: string;

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
    this.initregisterForm();
  }

  initregisterForm(): void {
    this.operatorNameControl = new FormControl(undefined, [
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
    this.countryControl = new FormControl(undefined, [
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
    this.rateControl = new FormControl(undefined, [
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

    this.registerForm = this.formBuilder.group({
      operatorName: this.operatorNameControl,
      country: this.countryControl,
      rate: this.rateControl
    });
  }

  register() {
    this.operatorName = this.registerForm.value.operatorName;
    this.country = this.registerForm.value.country;
    this.rate = this.registerForm.value.rate;
    // this._activateService
    //   .authorize(this.operatorName, this.country)
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
