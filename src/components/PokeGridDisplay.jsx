import { useEffect, useState } from "react";
import PokeCard from "./PokeCard";
import fetchData from "../utils/FetchData";
import PokeCardSkeleton from "./PokeCardSkeleton";

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const ALL_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?limit=1302";

const PRELOAD_BATCH_SIZE = 100;
const SKELETON_COUNT = 20;

const PokeGridDisplay = () => {
  const [currentPokemonList, setCurrentPokemonList] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("dark");

  const fetchPokemonFromUrl = async (url) => {
    setLoading(true);
    try {
      const fetchedData = await fetchData(url);
      if (fetchedData && fetchedData.results) {
        setData(fetchedData);
        const details = await Promise.all(
          fetchedData.results.map((pokemon) => fetchData(pokemon.url))
        );
        setCurrentPokemonList(details);
      }
    } catch (error) {
      console.error("Failed to fetch Pokemon data:", error);
    }
    setLoading(false);
  };

  const preloadAllPokemon = async () => {
    try {
      const data = await fetchData(ALL_POKEMON_URL);
      if (data && data.results) {
        const allDetails = [];
        for (let i = 0; i < data.results.length; i += PRELOAD_BATCH_SIZE) {
          const batch = data.results.slice(i, i + PRELOAD_BATCH_SIZE);
          const batchDetails = await Promise.all(
            batch.map((pokemon) => fetchData(pokemon.url))
          );
          allDetails.push(...batchDetails);
        }
        setAllPokemon(allDetails);
      }
    } catch (error) {
      console.error("Failed to preload all Pokemon:", error);
    }
  };

  useEffect(() => {
    fetchPokemonFromUrl(API_URL);
    preloadAllPokemon();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  const handleNext = () => fetchPokemonFromUrl(data.next);
  const handlePrevious = () => fetchPokemonFromUrl(data.previous);
  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      const filtered = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query)
      );
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon([]);
    }
  };

  const renderHeader = () => (
    <div className="pixel-border bg-gray-800 rounded-lg mb-6 p-4 retro-green">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tighter">RETRO POKEDEX</h1>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-lg bg-black text-green-400 font-mono pixel-border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button onClick={toggleTheme} className="pixel-button">
          {theme === "dark" ? "🌙 DARK" : "☀️ LIGHT"} MODE
        </button>
      </div>
    </div>
  );

  const renderPokemonGrid = () => {
    const listToRender =
      searchQuery ? filteredPokemon : currentPokemonList;

    if (loading) {
      return Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <PokeCardSkeleton key={index} theme={theme} />
      ));
    }

    return listToRender.map((pokemon) => (
      <PokeCard key={pokemon.id} pokemon={pokemon} theme={theme} />
    ));
  };

  const renderPagination = () => {
    const formatId = (id) => id?.toString().padStart(3, "0") || "000";
    const firstId = formatId(currentPokemonList[0]?.id);
    const lastId = formatId(currentPokemonList[currentPokemonList.length - 1]?.id);

    return (
      !searchQuery && (
        <div className="pixel-border bg-gray-800 rounded-lg p-4 retro-green">
          <div className="flex flex-wrap justify-center gap-4">
            {data.previous && <button onClick={handlePrevious} className="pixel-button">← PREV</button>}
            <div className="flex items-center px-4 py-2 bg-black text-green-400 font-mono text-sm rounded">
              <span>ENTRY:</span>
              <span className="mx-2">{firstId}</span>
              <span>-</span>
              <span className="mx-2">{lastId}</span>
            </div>
            {data.next && <button onClick={handleNext} className="pixel-button">NEXT →</button>}
          </div>
        </div>
      )
    );
  };

  return (
    <div className="crt-effect min-h-screen p-4">
      <div className="max-w-9/12 mx-auto">
        {renderHeader()}
        <div className="pixel-border bg-gray-900 rounded-lg p-4 mb-6 retro-blue">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {renderPokemonGrid()}
          </div>
        </div>
        {renderPagination()}
        <div className="mt-6 text-center text-gray-400 text-xs">
          <p>RETRO POKEDEX SYSTEM v2.0</p>
          <p>1998 POKEMON COMPANY</p>
        </div>
      </div>
    </div>
  );
};

export default PokeGridDisplay;
