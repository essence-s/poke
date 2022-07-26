import { createContext, useContext, useState } from "react";
import { listPoke, listPokeData, } from "services/serPoke/gPoke";

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
  // console.log(PokemonContext)
  let getDataPokemons = async () => {
    let pokemoness = await listPoke();
    // console.log(pokemoness.results)
    const promises = pokemoness.results.map(async (pokemon) => {
      return await listPokeData(pokemon.url);
    });
    const results1 = await Promise.all(promises);

    setPokemonsData(results1);
  };

  return {
    pokemonsData,
    getDataPokemons,
  };
};

export {usePokemon,PokemonProvider};
