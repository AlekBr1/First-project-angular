import { Component } from "@angular/core";
import { DefaultLoginLayoutComponent } from "../../components/default-login-layout/default-login-layout.component";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { DefaultInputComponent } from "../../components/default-input/default-input.component";
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";
import { ApiService } from "../../services/api.service";

function emailOrMatriculaValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) return { required: true };

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isMatricula = /^\d+$/.test(value); // apenas dígitos

  if (isEmail || isMatricula) {
    return null; // válido
  }

  return { emailOrMatricula: true }; // inválido
}

function passwordsMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get("password")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  };
}

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    DefaultInputComponent,
    NgIf,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  loginForm!: FormGroup;
  showRegister: boolean = false;

  constructor(private router: Router, private api: ApiService) {
    this.buildForm();
  }

  buildForm() {
    const controls: { [key: string]: FormControl } = {
      email: new FormControl("", [Validators.required, emailOrMatriculaValidator]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    };

    if (this.showRegister) {
      controls["confirmPassword"] = new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]);
      controls["name"] = new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]);

      // Validador de grupo para verificar se as senhas coincidem
      this.loginForm = new FormGroup(controls, { validators: passwordsMatchValidator() });
    } else {
      this.loginForm = new FormGroup(controls);
    }
  }

  submit() {
    console.log(this.loginForm);

    if (this.loginForm.invalid) {
      console.warn("Formulário inválido:", this.loginForm.errors);

      // Exibe também os erros de cada controle
      Object.keys(this.loginForm.controls).forEach((key) => {
        const controlErrors = this.loginForm.get(key)?.errors;
        if (controlErrors) {
          console.warn(`Erros em ${key}:`, controlErrors);
        }
      });

      this.loginForm.markAllAsTouched(); // marca campos como tocados para mostrar os erros
      return;
    }

    console.log("Formulário válido:", this.loginForm.value);

    this.showRegister
      ? this.api
          .post("users/criar", this.loginForm.value, { withCredentials: true })
          .subscribe({
            next: (res) => {
              console.log("usuario criado", res);
              this.router.navigate(["home"]);
            },
            error: (err) => console.error(err),
          })
      : this.api
          .get(
            "users/login",
            {
              email: this.loginForm.value.email,
              senha: this.loginForm.value.password,
            },
            { withCredentials: true }
          )
          .subscribe({
            next: (res) => {
              console.log("usuario autenticado", res);
              // localStorage.setItem("token", res?.data?.token);
              this.router.navigate(["home"]);
            },
            error: (err) => console.error(err),
          });
  }

  toggleLogin() {
    this.showRegister = !this.showRegister;
    this.buildForm(); // Reconstrói o formulário com os campos adequados
  }
}
