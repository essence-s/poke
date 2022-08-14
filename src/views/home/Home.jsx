import React, { useEffect, useState } from "react";
import { BoxPokemons, Search } from "components/common";
import "./home.css";

import { usePokemon } from "hooks/usePokemon";

const Home = () => {
  let {
    pokemonsData,
    getDataPokemons,
    pokemonByName,
    getPokemonByName,
    namesPokemons,
    getNamesPokemon,
  } = usePokemon();


  let [searchdata, setSearchData] = useState([]);
  let [result, setResult] = useState([]);

  let [pokemons, setPokemons] = useState([]);
  let [pokemonsInitial, setPokemonsInitial] = useState([]);
  useEffect(() => {
    getDataPokemons().then((d) => {
      setPokemonsInitial(d);
      setPokemons(d);
    });
    getNamesPokemon();
  }, []);

  useEffect(() => {
    setPokemons([]);
    // console.log(result);
    if (result?.search === "") {
      setPokemons(pokemonsInitial);
    } else if (result?.coincidences?.length === 0) {
      setPokemons(pokemonsInitial);
      // console.log("coincile");
    } else {
      getPokemonByName(result?.coincidences || []).then((d) => {
        setPokemons(d);
        // console.log("byname");
      });
    }
  }, [result]);

  return (
    <div className="home">
      <Search
        className="home__search"
        data={namesPokemons}
        result={setResult}
      ></Search>
      <BoxPokemons pokemons={pokemons}></BoxPokemons>
    </div>
  );
};

export default Home;
