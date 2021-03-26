import React from "react";
import "./Capture.css";

function CaptureSuccess(props) {
  return (
    <div className="wrapper-capture-success">
      <h1>{props.name} Captured!!</h1>
      <p>
        Please give a nickname <br />
        to your new Pokémon
      </p>
      <input
        type="text"
        placeholder="Please type a unique nickname"
        id="newCapture"
        name="pokemonName"
        autoComplete="off"
        value={props.pokemonName}
        onChange={props.handlerChangePokemonName}
        onKeyPress={props.handlerKeypressPokemonName}
      />

      <button
        className="btn btn__primary btn__medium"
        id="btn-save-success"
        onClick={props.handlerClickPokemonName}
      >
        Save
      </button>
    </div>
  );
}

export default CaptureSuccess;
