//typescript declaring the interfaces

export interface Drink {
  _id: string;
  idDrink?: string;
  drinkName: string;
  shortDescription: string;
  Category: string;
  Glass: string;
  Ice?: string;
  Ingredient1?: string;
  Ingredient2?: string;
  Ingredient3?: string;
  Ingredient4?: string;
  Ingredient5?: string;
  Ingredient6?: string;
  Measure1?: number;
  Measure2?: number;
  Measure3?: number;
  Measure4?: number;
  Measure5?: number;
  Measure6?: number;
  DrinkThumb?: string;
  Rating?: number;
  Instructions: string;
}

export interface User {
  username: string;
  password: string;
}
