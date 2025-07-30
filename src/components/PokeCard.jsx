import React from "react";

const PokeCard = ({ pokemon }) => {
  return (
    <div>
      <div>
        <img src={pokemon.sprites.other.showdown.front_default} alt="" />
      </div>
      <div>{pokemon.name}</div>
    </div>
  );
};

export default PokeCard;
