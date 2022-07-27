import "./App.css";
import Home from "./views/home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import { CardAllInfo } from "components/common";

import { PokemonProvider } from "hooks/usePokemon";

// let NoMatch = () => {
//   return <div>Ruta Desconocida</div>
// }

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div className="App">
      <PokemonProvider>
        <Routes location={background || location}>
          <Route path="/" element={<Home />}>
            <Route path="pokemon/:poke" element={<CardAllInfo state={true} />} />
          </Route>

          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>

        {background && (
          <Routes>
            <Route
              path="pokemon/:poke"
              element={<CardAllInfo state={true} />}
            ></Route>
          </Routes>
        )}
      </PokemonProvider>
    </div>
  );
}

export default App;
