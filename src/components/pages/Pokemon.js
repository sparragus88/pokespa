import React, { useState, useEffect } from "react";
import "../../App.css";
import "../Cards.css";
import { useParams } from "react-router-dom";
import LoadingPokeball from "../LoadingPokeball";
import axios from "axios";
import CaptureSuccess from "../CaptureSuccess";
import CaptureFailed from "../CaptureFailed";
import Cookies from "js-cookie";

function Pokemon() {
  let { name } = useParams();
  const [loading, setLoading] = useState(false);
  const [owned, setOwned] = useState([]);
  const [id, setId] = useState(null);
  const [types, setTypes] = useState([]);
  const [moves, setMoves] = useState([]);
  const [tamed, setTamed] = useState([]);
  const [capture, setCapture] = useState(-1);
  const [pokemonName, setPokemonName] = useState("");
  let url = "https://pokeapi.co/api/v2/pokemon/";

  const getOwned = (name) => {
    let check = owned.filter((e) => e.name === name);
    return check;
  };

  const getOwnedCount = (name) => {
    let count = 0;
    let check = getOwned(name);
    if (check.length > 0) {
      count = check[0].owned;
    }

    return "" + count;
  };

  useEffect(() => {
    const axioPokemon = async () => {
        try {
          setLoading(true);
          await axios.get(`${url}${name}`).then((response) => {
            setLoading(false);
            setId(response.data.id);
            setTypes(response.data.types);
            setMoves(response.data.moves);
            let cookiesOwned = JSON.parse(Cookies.get("PokeSPA-pokemonOwned"));
            setOwned(cookiesOwned);
            let check = cookiesOwned.filter((e) => e.name === name);
            if (check.length > 0) {
              setTamed(check[0].tamed);
            }
          });
        } catch (e) {}
      };
    axioPokemon();
  }, [url,name]);

  // Handler Catch Pokemon

  const randomChance = () => {
    const min = 0;
    const max = 1;
    const rand = min + Math.random() * (max - min);
    setCapture(rand >= 0.5 ? 1 : 0);
  };

  const handlerClickCatch = () => {
    setLoading(true);
    randomChance();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handlerChangePokemonName = (e) => {
    setPokemonName(e.target.value);
  };

  const handlerKeypressPokemonName = (e) => {
    if (e.key === "Enter") {
      document.getElementById("btn-save-success").click();
    }
  };

  const handlerClickPokemonName = () => {
    if (pokemonName.trim() === "") {
      alert("You must give name to your pokemon");
      return false;
    }
    let check = getOwned(name);
    let allOwned = Object.assign([], owned);
    if (check.length > 0) {
      let idx = owned.findIndex((own) => {
        return own.name === name;
      });
      let record = Object.assign({}, owned[idx]);

      let checkNickname = record.tamed.filter(
        (e) => e.nickname === pokemonName
      );

      if (checkNickname.length > 0) {
        alert("Nickname already existst. You must give unique nickname.");
        return false;
      }
      record.owned += 1;
      record.tamed = [...record.tamed, { nickname: `${pokemonName}` }];

      allOwned[idx] = record;
    } else {
      let record = {
        name: name,
        id: id,
        owned: 1,
        tamed: [{ nickname: `${pokemonName}` }],
      };
      allOwned = [...allOwned, record];
    }
    setPokemonName("");
    setOwned(allOwned);
    Cookies.set("PokeSPA-pokemonOwned", JSON.stringify(allOwned));
    let checkTamed = allOwned.filter((e) => e.name === name);
    if (checkTamed.length > 0) {
      setTamed(checkTamed[0].tamed);
    }
    setCapture(-1);
  };

  const doRemove = (nickname) => {
    let allOwned = Object.assign([], owned);
    let idx = owned.findIndex((own) => {
      return own.name === name;
    });
    let record = Object.assign({}, owned[idx]);

    let idxNickname = record.tamed.findIndex((tame) => {
      return tame.nickname === nickname;
    });

    if (idxNickname >= 0) {
      let allTamed = Object.assign([], record.tamed);
      allTamed.splice(idxNickname, 1);
      record.tamed = allTamed;
      record.owned -= parseInt(1);
      if (record.owned > 0) {
        allOwned[idx] = record;
      } else {
        allOwned.splice(idx, 1);
      }

      setOwned(allOwned);
      Cookies.set("PokeSPA-pokemonOwned", JSON.stringify(allOwned));
      let check = allOwned.filter((e) => e.name === name);
      if (check.length > 0) {
        setTamed(check[0].tamed);
      } else {
        setTamed([]);
      }
    }
  };

  const handlerRemove = (nickname) => {
        setLoading(true);
        doRemove(nickname);
        setTimeout(() => {
        setLoading(false);
        }, 500);
  };

  const handlerClickBack = () => {
    setCapture(-1);
  };

  return (
    <>
      {loading && <LoadingPokeball />}
      {!loading && capture === 1 && (
        <CaptureSuccess
          name={name}
          pokemonName={pokemonName}
          handlerChangePokemonName={handlerChangePokemonName}
          handlerKeypressPokemonName={handlerKeypressPokemonName}
          handlerClickPokemonName={handlerClickPokemonName}
        />
      )}
      {!loading && capture === 0 && (
        <CaptureFailed name={name} handlerClickBack={handlerClickBack} />
      )}
      {!loading && capture === -1 && (
        <>
          <div className="cards__item cards__single">
            <figure className="cards__item__pic-wrap" data-category={name}>
              <img
                src={
                  id == null
                    ? "/simple_pokeball.gif"
                    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
                }
                alt={name}
                className="cards__item__img"
              />
              <div className="count-wrap">{getOwnedCount(name)}</div>
            </figure>
          </div>
          <div>
            <h4 className="moves__title">Moves</h4>
            <ul className="moves__wrapper">
              {moves.map((move) => (
                <li
                  className="moves__item"
                  key={move.move.name}
                >{`${move.move.name}`}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="moves__title">Types</h4>
            <ul className="types__wrapper">
              {types.map((type) => (
                <li
                  className="types__item"
                  key={type.type.name}
                >{`${type.type.name}`}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="moves__title">Owned Pokemons</h4>
            <ul className="owned__wrapper">
              {tamed.map((tame) => (
                <li
                  className="owned__item"
                  key={tame.nickname}
                  onClick={() => {
                      if(window.confirm(`Are you sure want to remove ${tame.nickname}`)){
                        handlerRemove(tame.nickname);
                      }
                  }}
                >
                  {`${tame.nickname}`}{" "}
                  <span className="owned__delete"> &times; </span>{" "}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button
              className="btn btn__primary btn-catch"
              id="btn-catch"
              onClick={handlerClickCatch}
            >
              Catch this Pokémon
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Pokemon;
