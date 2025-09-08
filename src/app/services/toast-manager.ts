import { Injectable } from '@angular/core';
import { ToastData } from '../interfaces/toast-data';
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToastManager {

  private toastStatus = new BehaviorSubject<ToastData>({
    type: 'info',
    message: '',
    visible: false
  });

  constructor() {}

  public toast$ = this.toastStatus.asObservable();

  public show(type: 'success' | 'info' | 'error', message: string, visible: boolean, duration: number) {
    this.toastStatus.next({ type, message, visible });

    setTimeout(() => {
      this.hide();
    }, duration);
  }

  public hide() {
    this.toastStatus.next({...this.toastStatus.value, visible: false});
  }
  
}
