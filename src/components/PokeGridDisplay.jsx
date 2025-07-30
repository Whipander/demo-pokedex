import { useEffect, useState } from "react";
import PokeCard from "./PokeCard";
import fetchData from "../utils/FetchData";
const API_URL = "https://pokeapi.co/api/v2/pokemon";

const PokeGridDisplay = () => {
  const [currentPokemonList, setCurrentPokemonList] = useState([]);
  const [data, setData] = useState({});

  const fetchPokemonFromUrl = async (url) => {
    const data = await fetchData(url);
    if (data && data.results) {
      setData(data);
      const details = await Promise.all(
        data.results.map((pokemon) => fetchData(pokemon.url))
      );
      setCurrentPokemonList(details);
    }
  };

  useEffect(() => {
    fetchPokemonFromUrl(API_URL);
  }, []);

  const handleNext = () => {
    fetchPokemonFromUrl(data.next);
  };

  const handlePrevious = () => {
    fetchPokemonFromUrl(data.previous);
  };

  return (
    <>
      <div>
        {currentPokemonList.map((pokemon) => {
          return <PokeCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
      {data.previous ? (
        <button onClick={handlePrevious}>Previous</button>
      ) : (
        <></>
      )}
      {data.next ? <button onClick={handleNext}>Next</button> : <></>}
    </>
  );
};

export default PokeGridDisplay;
