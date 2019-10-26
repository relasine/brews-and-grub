export default async () => {
  const foodOptions = await foodFetch();
  const beerOptions = await beerFetch();
  return { foodOptions, beerOptions };
};

const beerFetch = async () => {
  const url = "https://brews-and-grub-api.herokuapp.com/beer_types";

  const response = await fetch(url);
  return await response.json();
};

const foodFetch = async () => {
  const url = "https://brews-and-grub-api.herokuapp.com/food_truck_types";

  const response = await fetch(url);
  return await response.json();
};
