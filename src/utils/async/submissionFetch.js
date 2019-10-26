export default async (beer, food, location) => {
  const url = `https://brews-and-grub-api.herokuapp.com/search?food=${food}&beer=${beer}`;

  const response = await fetch(url);

  return await response.json();
};
