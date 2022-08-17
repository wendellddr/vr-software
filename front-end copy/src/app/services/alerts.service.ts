import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}

  alert(
    title: string,
    message: string,
    denyButton?: string,
    confirmButton?: string,
    cancelButton?: string,
    icon: SweetAlertIcon = 'warning',
  ) {
    return new Promise((call) => {
      Swal.fire({
        title:
          title || title !== '' ? title : 'Tem certeza que deseja continuar?',
        icon,
        text: message,
        showCloseButton: true,
        showCancelButton: true,
        showDenyButton: denyButton ? true : false,
        cancelButtonText: cancelButton ? cancelButton : 'Não',
        confirmButtonText: confirmButton ? confirmButton : 'Sim',
        denyButtonText: denyButton,
      }).then((result) => {
        if (denyButton || cancelButton) {
          call(result);
        }
        if (result.value && result.value === true) {
          call(true);
        } else {
          call(false);
        }
      });
    });
  }
}
