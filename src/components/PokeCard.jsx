import { useState } from "react";

const typeColors = {
  grass: "retro-green",
  fire: "retro-red",
  water: "retro-blue",
  electric: "retro-yellow",
  psychic: "retro-red",
  ice: "retro-blue",
  dragon: "retro-red",
  dark: "bg-gray-900 text-gray-300",
  fairy: "retro-pink",
  normal: "retro-gray",
  fighting: "retro-red",
  flying: "retro-blue",
  poison: "retro-purple",
  ground: "bg-yellow-800 text-yellow-500",
  rock: "bg-yellow-900 text-yellow-300",
  bug: "retro-green",
  ghost: "bg-purple-900 text-purple-300",
  steel: "bg-gray-400 text-gray-800",
};

const getTypeClass = (types) => {
  const defaultClass = "bg-gray-800 text-gray-300";
  if (!types?.length) return defaultClass;
  const mainType = types[0].type.name;
  return typeColors[mainType] || defaultClass;
};

const PokemonId = ({ id, isDark }) => (
  <div className="w-full text-right mb-2">
    <span
      className={`text-xs font-mono px-2 py-1 rounded ${
        isDark ? "bg-black text-green-400" : "bg-gray-200 text-gray-800"
      }`}
    >
      #{String(id).padStart(3, "0")}
    </span>
  </div>
);

const PokemonImage = ({ sprite, name, isDark }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`w-32 h-32 flex items-center justify-center mb-4 pixel-border relative ${
        isDark ? "bg-black bg-opacity-30" : "bg-gray-100"
      }`}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse flex space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      )}
      <img
        src={sprite}
        alt={`${name} GIF`}
        className={`w-full h-full object-contain drop-shadow-lg pixelated transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

const PokemonName = ({ name, isDark }) => (
  <div
    className={`text-lg font-bold capitalize mb-3 tracking-wide text-center truncate w-full px-2 ${
      isDark ? "text-gray-300" : "text-gray-800"
    }`}
  >
    {name}
  </div>
);

const PokemonTypes = ({ types, typeClass }) => (
  <div className="flex justify-center gap-2 mb-4 w-full overflow-x-auto no-scrollbar">
    {types.map((typeObj) => (
      <span
        key={typeObj.type.name}
        className={`px-3 py-1 text-xs font-bold capitalize pixel-border ${typeClass} whitespace-nowrap`}
      >
        {typeObj.type.name}
      </span>
    ))}
  </div>
);

const PokemonStats = ({ height, weight, isDark }) => (
  <div className="w-full mb-3">
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div
        className={`flex px-2 py-1 justify-between rounded ${
          isDark ? "bg-black bg-opacity-20" : "bg-gray-200"
        }`}
      >
        <span>HT:</span>
        <span>{height / 10}m</span>
      </div>
      <div
        className={`flex px-2 py-1 justify-between rounded ${
          isDark ? "bg-black bg-opacity-20" : "bg-gray-200"
        }`}
      >
        <span>WT:</span>
        <span>{weight / 10}kg</span>
      </div>
    </div>
  </div>
);

const RetroDecorations = () => (
  <>
    <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-red-500 opacity-70"></div>
    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-500 opacity-70"></div>
  </>
);

const PokeCard = ({ pokemon, theme = "dark" }) => {
  const { id, name, sprites, types, height, weight } = pokemon;
  const typeClass = getTypeClass(types);
  const isDark = theme === "dark";

  const cardClasses = `
    pixel-border rounded-lg p-4 m-2 flex flex-col items-center w-full min-h-[342px] max-w-[300px]
    transition-all duration-300 transform hover:scale-105
    ${isDark ? "bg-gray-900" : "bg-white"}
    ${typeClass}
  `;

  return (
    <div className={cardClasses.trim().replace(/\s+/g, " ")}>
      <PokemonId id={id} isDark={isDark} />
      <PokemonImage
        sprite={sprites.other.showdown.front_default}
        name={name}
        isDark={isDark}
      />
      <PokemonName name={name} isDark={isDark} />
      <PokemonTypes types={types} typeClass={typeClass} />
      <PokemonStats height={height} weight={weight} isDark={isDark} />
      <RetroDecorations />
    </div>
  );
};

export default PokeCard;
