import { Ingredient } from "./ingredient";
import { Recipe } from "./recipe";

// sample data of recipes
export const recipes: Recipe[] = [
	new Recipe(
		"Taco Recipe",
		"assets/taco.png",
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere est eu nibh laoreet bibendum.",
		[new Ingredient("Taco", 1), new Ingredient("Meat", 1), new Ingredient("Tomatoes", 3)]
	),
	new Recipe(
		"Pizza Recipe",
		"assets/pizza.png",
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere est eu nibh laoreet bibendum.",
		[new Ingredient("Dough", 1), new Ingredient("Tomatoes", 4), new Ingredient("Olives", 12)]
	),
	new Recipe(
		"Hamburger Recipe",
		"assets/hamburger.png",
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere est eu nibh laoreet bibendum.",
		[
			new Ingredient("Meat", 1),
			new Ingredient("Buns", 2),
			new Ingredient("Tomatoes", 2),
			new Ingredient("Pickle", 1),
		]
	),
	new Recipe(
		"Schnitzel Recipe",
		"assets/schnitzel.png",
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere est eu nibh laoreet bibendum.",
		[new Ingredient("Meat", 1), new Ingredient("Buns", 1), new Ingredient("Lemon", 1), new Ingredient("Pickle", 2)]
	),
];
