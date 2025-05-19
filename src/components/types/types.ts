//typescript declaring the interfaces
export type Drink = {
  _id: string;
  idDrink?: string;
  drinkName?: string;
  shortDescription?: string;
  Category?: string;
  Glass?: string;
  Ice?: string;
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

//Catefory, Glass & Ice types

const categories = [
  "Cobbler",
  "Collins",
  "Daisy",
  "Flip",
  "Frozen",
  "Highball",
  "Julep",
  "Martini",
  "Punch",
  "Sling",
  "Sour",
  "Tiki",
  "Toddy",
  "Spritz",
  "Fizz",
];

const glasses = [
  "Highball",
  "Coup",
  "Hurricane",
  "Old Fashioned",
  "Julep Tin",
  "Wine",
  "Flute",
];

const iceTypes = ["Cubed", "Crushed", "Block", "Shaved", "Straight"];
