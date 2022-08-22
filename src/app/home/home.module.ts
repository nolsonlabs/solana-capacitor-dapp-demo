import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { WalletPickerComponent } from '../components/wallet-picker/wallet-picker.component';

import { WalletInstalledPipe } from '../pipes/wallet-installed.pipe';
import { WalletNotInstalledDeeplinkPipe } from '../pipes/wallet-not-installed-deeplink.pipe';
import { WalletNotInstalledNoDeeplinkPipe } from '../pipes/wallet-not-installed-no-deeplink.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    WalletPickerComponent,
    WalletInstalledPipe,
    WalletNotInstalledDeeplinkPipe,
    WalletNotInstalledNoDeeplinkPipe
  ]
})
export class HomePageModule {}
