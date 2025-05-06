import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-default-login-layout",
  standalone: true,
  imports: [],
  templateUrl: "./default-login-layout.component.html",
  styleUrl: "./default-login-layout.component.scss",
})
export class DefaultLoginLayoutComponent {
  @Input() title: string = "";
  @Input() primiryButtonText: string = "";
  @Input() secondaryButtonText: string = "";
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();
  @Output("toggleLogin") onToggleLogin = new EventEmitter();

  submit(): void {
    this.onSubmit.emit();
  }

  showRegister: boolean = false;

  toggleLogin(): void {
    this.showRegister = !this.showRegister;
    this.onToggleLogin.emit();
  }
}
