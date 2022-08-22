import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ToastController } from '@ionic/angular';

import { SolanaWalletAdaptor } from 'solana-wallet-adaptor-capacitor';

@Injectable({
  providedIn: 'root'
})
export class AppstateService {

  // Viewport
  public fixed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean | null>(null);

  // Available wallets & environment
  public walletsAndEnvironment$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Active wallet
  public authToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public publicKey$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public authorizationObject$: BehaviorSubject<any> = new BehaviorSubject<any>(
    { authorized: false, authToken: '', publicKey: '', connection: null}
    );

  // Toast data for messages from app
  public toastMessage$: BehaviorSubject<string> = new BehaviorSubject(null);
  public selectedWallet$: BehaviorSubject<any> = new BehaviorSubject(null);
  public small$: BehaviorSubject<boolean | null> = new BehaviorSubject(null);

  constructor(private toastCtrl: ToastController) {}

  async makeToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async getWalletAndEnvironmentInfo() {
    const walletAndEnvironmentInfo = await SolanaWalletAdaptor.getWalletAndEnvironmentInfo();
    this.walletsAndEnvironment$.next(walletAndEnvironmentInfo);
  }

}
