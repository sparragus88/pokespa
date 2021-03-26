import React, { useState } from "react";
import "../../App.css";
import "./Home.css";
import Cookies from "js-cookie";

function Home() {
  const [fullName, setFullName] = useState("");
  const handlerClick = () => {
    if (fullName.trim() === "") {
      alert("You must enter your name to continue..");
      return false;
    }
    Cookies.set("PokeSPA-user", fullName);
    Cookies.set("PokeSPA-pokemonOwned", []);
    window.location = "/pokemon-list";
  };

  const handlerChange = (e) => {
    setFullName(e.target.value);
  };

  const handlerKeypress = (e) => {
    if (e.key === "Enter") {
      document.getElementById("btn-go").click();
    }
  };
  return (
    <>
      <div className="home__container">
        <h1>Welcome to pokeSPA!</h1>
        <p>
          Please enter your name <br />
          to start your journey to catch Pokémon
        </p>
        <input
          type="text"
          placeholder="Please type your name"
          id="name"
          name="name"
          autoComplete="off"
          value={fullName}
          onChange={handlerChange}
          onKeyPress={handlerKeypress}
        />

        <button
          className="btn btn__primary btn__medium"
          id="btn-go"
          onClick={handlerClick}
        >
          Lets Go!
        </button>
      </div>
    </>
  );
}

export default Home;
