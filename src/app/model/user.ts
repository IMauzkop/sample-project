export class User {
	constructor(
		public email: string,
		public id: string,
		private readonly _token: string,
		private readonly _tokenExpirationDate: Date
	) {}

	get token() {
		return this._token;
	}

	get tokenExpirationDate() {
		return this._tokenExpirationDate;
	}
}
