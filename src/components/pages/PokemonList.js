import React, { useState, useEffect } from "react";
import "../../App.css";
import "../Cards.css";
import LoadingPokeball from "../LoadingPokeball";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function PokemonList() {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [owned, setOwned] = useState([]);
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=0&offset=20"
  );
  const [urlNext, setUrlNext] = useState(null);
  const [urlPrev, setUrlPrev] = useState(null);

  useEffect(() => {
    const axioPokemon = async () => {
      try {
        setLoading(true);
        await axios.get(url).then((response) => {
          setUrlNext(response.data["next"]);
          setUrlPrev(response.data["previous"]);
          let result = [];
          response.data["results"].forEach((res) => {
            let url = res["url"].split("/");
            res["id"] = url[6];
            result = [...result, res];
          });
          setLoading(false);
          setPokemons(result);
          let cookiesOwned = Cookies.get("PokeSPA-pokemonOwned");
          setOwned(JSON.parse(cookiesOwned));
        });
      } catch (e) {}
    };
    axioPokemon();
  }, [url]);

  const handlerClickNext = () => {
    setUrl(urlNext);
  };

  const handlerClickPrev = () => {
    setUrl(urlPrev);
  };

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
          <h1 className="cards__title">Gotta Catch 'Em All</h1>
          <div className="cards__container">
            <ul className="cards__items">
              {pokemons.map((pokemon) => (
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
            <div className="wrapper-btn">
              {urlPrev != null && (
                <button
                  className="btn btn__primary btn__medium"
                  id="btn-prev"
                  onClick={handlerClickPrev}
                >
                  Prev
                </button>
              )}
              {urlNext != null && (
                <button
                  className="btn btn__primary btn__medium"
                  id="btn-next"
                  onClick={handlerClickNext}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonList;
