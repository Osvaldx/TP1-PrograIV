import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Auth } from '../../../services/database/auth';
import { ToastManager } from '../../../services/toast-manager';
import { Router, RouterLink } from '@angular/router';

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null  => {
  const pass = group.get('password')?.value;
  const repeatPass = group.get('repeatPassword')?.value;

  if(!pass || !repeatPass) { return null }

  return (pass === repeatPass) ? null : { PasswordMismatch: true };
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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator })

  public async register() {
    const email = this.registerForm.controls.email.value;
    const password = this.registerForm.controls.password.value;
    const repeatPassword = this.registerForm.controls.repeatPassword.value;

    if(email?.trim() === "" || password?.trim() === "" || repeatPassword?.trim() === "") {
      this.toastManager.show('error', 'Complete todos los campos', true, 3000);
      return
    }
    
    const { error } = await this.authService.register(email!, password!);
    
    if(error) {
      if(error.name === "AuthWeakPasswordError") {
        return this.toastManager.show('error', 'La contraseña es muy corta, minimo 6 caracteres', true, 3000);
      } else {
        return this.toastManager.show('error', 'Algo ocurrio!, intente más tarde', true, 3000);
      }
    } else {
      this.toastManager.show('success', 'Cuenta registrada con exito!', true, 3000);
      this.sendLogin();
      return
    }
  }

  public sendLogin() {
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

}
