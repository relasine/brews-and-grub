import { mockFood, mockBeer } from "../mocks/mockFoodAndBeer";

export default async () => {
  const foodOptions = Promise.resolve(mockFood);
  const beerOptions = Promise.resolve(mockBeer);
  await beerFetch();
  return { foodOptions, beerOptions };
};

const beerFetch = async () => {
  const url = "https://brews-and-grub-api.herokuapp.com/beer_types";

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
};
