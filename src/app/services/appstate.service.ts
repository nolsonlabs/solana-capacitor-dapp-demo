import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppstateService implements OnDestroy {

  public fixed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean | null>(null);
  public authToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public publicKey$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public authorizationObject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public toastMessage$: BehaviorSubject<string> = new BehaviorSubject(null);
  public selectedWallet$: BehaviorSubject<string> = new BehaviorSubject(null);
  public small$: BehaviorSubject<boolean | null> = new BehaviorSubject(null);

  constructor(private toastCtrl: ToastController) {}

  async makeToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  ngOnDestroy() {

  }


}
