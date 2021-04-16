import { Ingredient } from "./ingredient";

export class Recipe {
	constructor(
		private _name: string,
		private _imagePath: string,
		private _description: string,
		private _ingredients: Ingredient[]
	) {}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get imagePath(): string {
		return this._imagePath;
	}

	set imagePath(value: string) {
		this._imagePath = value;
	}

	get description(): string {
		return this._description;
	}

	set description(value: string) {
		this._description = value;
	}

	get ingredients(): Ingredient[] {
		return this._ingredients;
	}

	set ingredients(value: Ingredient[]) {
		this._ingredients = value;
	}

	private toJSON() {
		return {
			name: this.name,
			imagePath: this.imagePath,
			description: this.description,
			ingredients: this.ingredients,
		};
	}
}
