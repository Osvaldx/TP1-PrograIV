import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ToastData } from '../../interfaces/toast-data';
import { ToastManager } from '../../services/toast-manager';

@Component({
  selector: 'app-custom-toast',
  imports: [],
  templateUrl: './custom-toast.html',
  styleUrl: './custom-toast.css'
})
export class CustomToast {

  toastManager = inject(ToastManager);

  toast!: ToastData

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.toastManager.toast$.subscribe((t) => { // Cuando cambie el toast se va a actualizar solo porque nos suscribimos
      this.toast = t
      this.cdr.markForCheck();
    });
  }

}
