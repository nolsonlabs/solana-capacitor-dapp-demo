import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

import { AppstateService } from '../../services/appstate.service';

@Component({
  selector: 'app-wallet-picker',
  templateUrl: './wallet-picker.component.html',
  styleUrls: ['./wallet-picker.component.scss'],
})
export class WalletPickerComponent {

  constructor(private modalCtrl: ModalController,
              public appstate: AppstateService,
              private sanitizer: DomSanitizer
              ) { }

  selectWallet(wallet: any) {
    Object.assign(wallet, {
      dAppPlatform: this.appstate.walletsAndEnvironment$.value?.dAppPlatform,
      dAppOs: this.appstate.walletsAndEnvironment$.value?.aAppOs
    });

    this.appstate.selectedWallet$.next(wallet);
    this.dismiss();
  }

  getImage(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
