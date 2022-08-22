import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'walletNotInstalledNoDeeplink'
})
export class WalletNotInstalledNoDeeplinkPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    const modifyObj = {...value};
    const result = modifyObj?.walletInfo?.filter(wallet => !wallet?.walletInstalled)
                                   .filter(wallet => !wallet?.walletHasDeepLinkCapability || modifyObj?.dAppPlatform === 'web');
    modifyObj.walletInfo = result;
    const output = {...modifyObj};
    return output;
  }

}
