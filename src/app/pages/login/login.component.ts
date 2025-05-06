import { Component } from "@angular/core";
import { DefaultLoginLayoutComponent } from "../../components/default-login-layout/default-login-layout.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AbstractControl, ValidationErrors } from "@angular/forms";
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
        Validators.minLength(6),
      ]);
    }

    this.loginForm = new FormGroup(controls);
  }

  submit() {
    if (this.loginForm.invalid) {
      console.warn("Formulário inválido:", this.loginForm.errors);
      this.loginForm.markAllAsTouched(); // marca campos como tocados para mostrar os erros
      return;
    }

    if (this.showRegister) {
      const { password, confirmPassword } = this.loginForm.value;

      if (password !== confirmPassword) {
        console.error("As senhas não coincidem.");
        return;
      }
    }

    console.log("Formulário válido:", this.loginForm.value);
    this.showRegister
      ? this.api.post("users", this.loginForm).subscribe({
          next: (res) => {
            console.log("usuario criado", res);
            this.router.navigate(["home"]);
          },
          error: (err) => console.error(err),
        })
      : this.api.get("users", this.loginForm).subscribe({
          next: (res) => {
            console.log("usuario criado", res);
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
