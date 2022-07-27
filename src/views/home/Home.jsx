import React, { useEffect } from "react";
import CardPoke from "components/common/cardPoke/CardPoke";
import "./home.css";
import load from "./files/load.gif";
import { Link, Outlet, useLocation } from "react-router-dom";
import { usePokemon } from "hooks/usePokemon";

const Home = () => {
  let { pokemonsData, getDataPokemons } = usePokemon();
  let location = useLocation();

  useEffect(() => {
    getDataPokemons();
  },[]);

  return (
    <div className="home">
      {pokemonsData.length > 0 ? (
        <div className="pokemones">
          {pokemonsData.map((r) => (
            <Link
              to={`/pokemon/${r.name}`}
              key={r.name}
              state={{ background: location, dataPoke: r }}
              className="home-link"
            >
              <CardPoke data={r}></CardPoke>
            </Link>
          ))}

          <Outlet></Outlet>
        </div>
      ) : (
        <img className="pokeload" src={load} alt="" />
      )}
    </div>
  );
};

export default Home;
