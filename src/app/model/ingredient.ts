export class Ingredient {
	/*
		Typescript will create properties using the constructor
		parameters names, and assign the values of those with the
		provided arguments.
	*/
	constructor(private _name: string, private _amount: number) {}

	public get name() {
		return this._name;
	}

	public get amount() {
		return this._amount;
	}

	private toJSON() {
		return {
			name: this.name,
			amount: this.amount,
		};
	}
}
