export interface Ingredient {
  name: string;
  measure: number;
}

export type Drink = {
  _id: string;
  idDrink?: string;
  drinkName?: string;
  shortDescription?: string;
  Category?: string;
  Glass?: string;
  Ice?: string;
  Ingredients: Ingredient[];
  Instructions?: string;
  DrinkThumb?: string;
  Rating?: number;
} & {
  [key in `Ingredient${1 | 2 | 3 | 4 | 5 | 6}`]?: string;
} & {
  [key in `Measure${1 | 2 | 3 | 4 | 5 | 6}`]?: string;
};

export interface User {
  username: string;
  password: string;
}
