import { createContext, useContext, useState } from "react";
import { listPoke, listPokeData } from "services/serPoke/gPoke";

const PokemonContext = createContext("hello");

const PokemonProvider = ({ children }) => {
  let [pokemonsData, setPokemonsData] = useState([]);

  return (
    <PokemonContext.Provider value={{ pokemonsData, setPokemonsData }}>
      {children}
    </PokemonContext.Provider>
  );
};

const usePokemon = () => {
  let { pokemonsData, setPokemonsData } = useContext(PokemonContext);
  let [namesPokemons,setNamePokemons] = useState([])
  let [pokemonByName,setPokemonByName] = useState([])
  // console.log(PokemonContext)
  let getDataPokemons = async () => {
    let pokemoness = await listPoke();
    // console.log(pokemoness.results)
    const promises = pokemoness.results.map(async (pokemon) => {
      return await listPokeData(pokemon.url);
    });
    const results1 = await Promise.all(promises);

    setPokemonsData(results1);
    return results1
  };

  let getPokemonByName = async(data) => {
    const promises = data.map(async (pokemon) => {
      return await listPokeData(pokemon.name,'name');
    });
    const results1 = await Promise.all(promises);

    // setPokemonByName(results1);
    return results1
  };

  let getNamesPokemon =async () =>{
    let pokemoness = await listPoke(100000,0);
    // console.log(pokemoness.results)
    setNamePokemons(pokemoness.results)
  }

  return {
    pokemonsData,
    getDataPokemons,
    pokemonByName,
    getPokemonByName,
    namesPokemons,
    getNamesPokemon,
  };
};

export { usePokemon, PokemonProvider };
