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
  Measure1?: string | number;
  Measure2?: string | number;
  Measure3?: string | number;
  Measure4?: string | number;
  Measure5?: string | number;
  Measure6?: string | number;
  DrinkThumb?: string;
  Rating?: number;
  Instructions: string;
}
