import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Auth } from '../../../services/database/auth';
import { ToastManager } from '../../../services/toast-manager';
import { Router, RouterLink } from '@angular/router';

export interface ValidateResult {
  isValid: boolean;
  firstName?: string,
  lastName?: string,
  age?: number,
  email?: string,
  password?: string,
  repeatPassword?: string
}

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null  => {
  const pass = group.get('password')?.value;
  const repeatPass = group.get('repeatPassword')?.value;

  if(!pass || !repeatPass) { return null }

  return (pass === repeatPass) ? null : { PasswordMismatch: true };
}

export const ageValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const age: number = Number.parseInt(group.get('age')?.value);

  return (age > 5 && age < 100) ? null : { ageInvalid: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {

  authService = inject(Auth);
  toastManager = inject(ToastManager);
  router = inject(Router);

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required])
  }, { validators: [passwordMatchValidator, ageValidator] })

  public async register() {
    const validate = this.validFields();

    if(!validate.isValid) { return }

    const credentials = {
      firstName: validate.firstName!,
      lastName: validate.lastName!,
      age: validate.age!,
      email: validate.email!,
      password: validate.password!,
      repeatPassword: validate.repeatPassword!
    }

    const { error } = await this.authService.register(credentials);
    
    if(error) {
      if(error.name === "AuthWeakPasswordError") {
        return this.toastManager.show('error', 'La contraseña es muy corta, minimo 6 caracteres', true, 3000);
      } else if(error.code === "user_already_exists") {
        return this.toastManager.show('error', 'Ese correo ya esta registrado, intente con otro', true, 3000);
      } else {
        return this.toastManager.show('error', 'Algo ocurrio!, intente más tarde', true, 3000);
      }
    } else {
      this.toastManager.show('success', 'Cuenta registrada con exito!', true, 3000);
      this.instaLogin(validate.email!, validate.password!);
      return
    }
  }

  public async instaLogin(email: string, password: string) {
    const { error } = await this.authService.login(email, password);

    if(error) {
      return this.toastManager.show("error", "Ocurrio algo, al intentar iniciar sesion, intente más tarde", true, 3000);
    }

    this.router.navigateByUrl("");

  }

  public validFields(): ValidateResult {
    const firstName = this.registerForm.controls.firstName.value;
    const lastName = this.registerForm.controls.lastName.value;
    const age = Number.parseInt(this.registerForm.controls.age.value ?? "0");
    const email = this.registerForm.controls.email.value;
    const password = this.registerForm.controls.password.value;
    const repeatPassword = this.registerForm.controls.repeatPassword.value;

    const regExNames = new RegExp("^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]{2,50}$");
    const regExEmail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");

    let validateResult = { isValid: false };

    if(!firstName?.trim() || !lastName?.trim() || age === 0 || !email?.trim() || !password?.trim() || !repeatPassword?.trim()) {
      this.toastManager.show("error", "Complete todos los campos porfavor.", true, 3000);
      return validateResult
    }
    
    if(!regExNames.test(firstName!) || !regExNames.test(lastName!)) {
      this.toastManager.show("error", "Nombre o Apellido invalido", true, 3000);
      return validateResult
    }

    if(age < 5 || age > 99) {
      this.toastManager.show("error", "Edad Invalida, no puede acceder a esta pagina", true, 3000);
      return validateResult
    }
    
    if(!regExEmail.test(email)) {
      this.toastManager.show("error", "Email Invalido, porfavor intente nuevamente", true, 3000);
      return validateResult
    }

    return {isValid: true, firstName, lastName, age, email, password, repeatPassword};
  }

}
