import React, { useState, useEffect } from "react";
import "../../App.css";
import "../Cards.css";
import LoadingPokeball from "../LoadingPokeball";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function MyPokemon() {
  const [loading, setLoading] = useState(true);
  const [owned, setOwned] = useState([]);

  useEffect(() => {
    let cookiesOwned = Cookies.get("PokeSPA-pokemonOwned");
    setOwned(JSON.parse(cookiesOwned));
    setLoading(false);
  }, []);

  const getOwned = (name) => {
    let count = 0;
    if (owned.length > 0) {
      let check = owned.filter((e) => e.name === name);
      if (check.length > 0) {
        count = check[0].owned;
      }
    }

    return "" + count;
  };

  return (
    <>
      {loading ? (
        <LoadingPokeball />
      ) : (
        <div className="cards">
          <h1 className="cards__title">My Pokemon</h1>
          <div className="cards__container">
            <ul className="cards__items">
              {owned.map((pokemon) => (
                <li className="cards__item" key={pokemon.id}>
                  <Link
                    className="cards__item__link"
                    to={`/pokemon/${pokemon.name}`}
                  >
                    <figure
                      className="cards__item__pic-wrap cards_count-wrap"
                      data-category={pokemon.name}
                    >
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon["id"]}.svg`}
                        alt={pokemon.name}
                        className="cards__item__img"
                      />
                      <div className="count-wrap">{getOwned(pokemon.name)}</div>
                    </figure>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default MyPokemon;
