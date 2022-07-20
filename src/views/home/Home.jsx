import React, { useEffect, useState } from "react";
import { CardAllInfo } from "components/common";
import CardPoke from "components/common/cardPoke/CardPoke";
import { listPoke, listPokeData, getTypesPoke } from "services/serPoke/gPoke";
import "./home.css";
import load from "./files/load.gif";

const Home = () => {
  let [pokemonesData, setPokemonData] = useState([]);

  let listDataPokemon = async () => {
    let pokemoness = await listPoke();
    // console.log(pokemoness.results)
    const promises = pokemoness.results.map(async (pokemon) => {
      return await listPokeData(pokemon.url);
    });
    const results1 = await Promise.all(promises);

    setPokemonData(results1);
  };
  let [stateModal, setStateModal] = useState(false);
  let [dataModal, setDataModal] = useState({});

  let onModal = (data) => {
    setStateModal(true);
    setDataModal(data);
  };

  useEffect(() => {
    listDataPokemon();
  }, []);

  return (
    <div className="home">
      {pokemonesData.length > 0 ? (
        <div className="pokemones">
          <CardAllInfo
            setState={setStateModal}
            state={stateModal}
            data={dataModal}
          ></CardAllInfo>
          {pokemonesData.map((r) => (
            <CardPoke
              key={r.name}
              data={r}
              onClick={() => onModal(r)}
            ></CardPoke>
          ))}
        </div>
      ) : <img className="pokeload" src={load} alt="" />}
    </div>
  );
};

export default Home;
