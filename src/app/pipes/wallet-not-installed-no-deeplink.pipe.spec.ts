import { WalletNotInstalledNoDeeplinkPipe } from './wallet-not-installed-no-deeplink.pipe';

describe('WalletNotInstalledPipe', () => {
  it('create an instance', () => {
    const pipe = new WalletNotInstalledNoDeeplinkPipe();
    expect(pipe).toBeTruthy();
  });
});
