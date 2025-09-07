import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms"
import { Auth } from '../../../services/database/auth';
import { Router } from '@angular/router';
import { ToastManager } from '../../../services/toast-manager';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

  authService = inject(Auth);
  router = inject(Router);
  toastManager = inject(ToastManager);

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private cdr: ChangeDetectorRef) {
    this.authService.$user.subscribe((user) => {
      if(user) {
        this.sendHome();
      }
    })
  }

  public async login() {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    if(email?.trim() === "" || password?.trim() === "") {
      this.showToast("error", "Complete todos los campos.", 3000);
      return
    }

    const { data,error } = await this.authService.login(email!,password!);

    if(error) {
      this.showToast("error", "Credenciales Invalidas", 3000);
    } else {
      this.showToast("success", "Inicio de sesion exitoso!", 1000);
      this.sendHome();
    }

  }

  private sendHome() {
    return this.router.navigateByUrl('home', { replaceUrl: true });
  }

  public showToast(type: 'success' | 'info' | 'error', message: string, duration: number) {
    this.toastManager.show(type, message, true, duration);
  }

  public test() {
    console.log(this.authService.getData());
  }

}
