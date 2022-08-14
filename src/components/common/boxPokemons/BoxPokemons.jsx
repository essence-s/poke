import React from "react";
import "./boxPokemons.css";

import load from "./files/load.gif";
import { CardPoke } from "components/common";
import { Link, Outlet, useLocation } from "react-router-dom";

const BoxPokemons = ({pokemons=[]}) => {

  let location = useLocation();

  return (
    pokemons.length > 0 ? (
        <div className="boxPokemons">
          {pokemons.map((r) => (
            <Link
              to={`/pokemon/${r.name}`}
              key={r.name}
              state={{ background: location, dataPoke: r }}
              className="boxPokemons__link"
            >
              <CardPoke data={r}></CardPoke>
            </Link>
          ))}

          <Outlet></Outlet>
        </div>
      ) : (
        <img className="boxPokemons__pokeload" src={load} alt="" />
      )
    
  );
};

export default BoxPokemons;
