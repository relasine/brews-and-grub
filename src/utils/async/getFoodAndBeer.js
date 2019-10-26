import { mockFood, mockBeer } from "../mocks/mockFoodAndBeer";

export default async () => {
  const foodOptions = Promise.resolve(mockFood);
  const beerOptions = Promise.resolve(mockBeer);
  return { foodOptions, beerOptions };
};
