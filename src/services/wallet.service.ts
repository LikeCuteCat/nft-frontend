abstract class Wallet {
	private wallet: any;

	init(wallet: any): void {
		this.wallet = wallet;
	}

	getWalletType(): string {
		return `Your wallet = ${this.wallet}`;
	}

	abstract getAddress(): string;
}

// const wallet = new Wallet('test');

export class Metamask extends Wallet {
	getAddress(): string {
		return `0x1111`;
	}
}
