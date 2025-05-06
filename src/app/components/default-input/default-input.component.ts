import { NgIf } from "@angular/common";
import { Component, forwardRef, Input } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from "@angular/forms";

type InputTypes = "text" | "email" | "password";

@Component({
  selector: "app-default-input",
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultInputComponent),
      multi: true,
    },
  ],
  templateUrl: "./default-input.component.html",
  styleUrl: "./default-input.component.scss",
})
export class DefaultInputComponent implements ControlValueAccessor {
  @Input() type: InputTypes = "text";
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() inputName: string = "";

  value: string = "";

  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  showPassword: boolean = false;

  get currentInputType(): string {
    if (this.type !== "password") return this.type;
    return this.showPassword ? "text" : "password";
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
