import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable()
export class ToastService {

  constructor(private toastController: ToastController) { }

  async present(request: ToastOptions) {
    const toast = await this.toastController.create(request);
    toast.present();
  }

}