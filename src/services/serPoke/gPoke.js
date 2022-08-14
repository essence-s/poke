const listPoke = async (limit = 151, offset = 0) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

const listPokeData = async (d,option = "url") => {
  let response;
  let data;
  if (option === "url") {
    response = await fetch(d);
    data = await response.json();
  }else if(option === "name") {
    response = await fetch(`https://pokeapi.co/api/v2/pokemon/${d}`);
    data = await response.json();
  }
  return data;
};

const getPokeImg = async (numbername) => {
  try {
    if (!numbername) return;
    let url = `https://pokeapi.co/api/v2/pokemon/${numbername}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data)
    return data;
  } catch (e) {
    console.log(e);
  }
};

const getTypesPoke = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

const getPokeSpecies = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data)
    return data;
  } catch (e) {
    console.log(e);
  }
};

const getEvolutionChain = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data)
    return data;
  } catch (e) {
    console.log(e);
  }
};

export {
  listPoke,
  listPokeData,
  getPokeImg,
  getTypesPoke,
  getPokeSpecies,
  getEvolutionChain,
};
