import { Component } from "@angular/core";
import { DefaultLoginLayoutComponent } from "../../components/default-login-layout/default-login-layout.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { emailOrMatriculaValidator } from "../../validators/validatorEmailOrMatricula";
import { DefaultInputComponent } from "../../components/default-input/default-input.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, DefaultInputComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, emailOrMatriculaValidator]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });
  }
}
