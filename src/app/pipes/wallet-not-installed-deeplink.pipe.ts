import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'walletNotInstalledDeeplink'
})
export class WalletNotInstalledDeeplinkPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    const modifyObj = {...value};
    const result = modifyObj?.walletInfo?.filter(wallet => !wallet?.walletInstalled)
                                       .filter(wallet => wallet?.walletHasDeepLinkCapability && modifyObj?.dAppPlatform === 'android');
    modifyObj.walletInfo = result;
    const output = {...modifyObj};
    return output;
  }

}
