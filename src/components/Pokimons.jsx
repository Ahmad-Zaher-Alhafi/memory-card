import { useEffect, useState } from "react";
import Pokimon from "./Pokimon";
import "/src/styles/Pokimons.css";

function Pokimons() {
  const pokemonNamesToFetch = [
    "pikachu",
    "charizard",
    "bulbasaur",
    "squirtle",
    "jigglypuff",
    "meowth",
    "eevee",
    "snorlax",
    "mewtwo",
    "gengar",
  ];

  const [pokimons, setPokimons] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const dataFetcher = async () => {
      const pokimonsData = await fetchPokimonsData();
      setPokimons([...pokimonsData]);
      console.log(pokimons);
    };

    dataFetcher();
  }, []);

  async function fetchPokimonsData() {
    const pokimonsSet = new Set();

    for (let pokimonName of pokemonNamesToFetch) {
      try {
        const pokimon = await fetchPokimonData(pokimonName);
        pokimonsSet.add(pokimon);
      } catch (error) {
        console.error("Pokimon not found", error);
      }
    }

    return pokimonsSet;
  }

  async function fetchPokimonData(pokimonName) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokimonName}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const pokimon = {
        key: crypto.randomUUID(),
        name: data.name,
        imgUrl: data.sprites.front_default,
        isClicked: false,
      };

      return pokimon;
    } catch (error) {
      console.error("error fetching data", error);
    }
  }

  function onPokimonclicked(key) {
    const clickedPokimon = pokimons.find((pokimon) => pokimon.key === key);

    if (clickedPokimon.isClicked) {
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      console.log("You lose!");
      const resetPokimons = pokimons.map((pokimon) => {
        pokimon.isClicked = false;
        return pokimon;
      });
      setPokimons(resetPokimons);
    } else {
      const modifiedPokimons = pokimons.map((pokimon) => {
        if (pokimon.key === key) {
          pokimon.isClicked = true;
        }

        return pokimon;
      });

      setPokimons(modifiedPokimons);
      setScore((pre) => pre + 1);
    }

    shuffelPokimons();
    console.log(score);
    console.log(bestScore);
  }

  function shuffelPokimons() {
    const pok = [...pokimons];

    // Start from the last element and swap each element with a random element before it
    for (let i = pok.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1)); // Get a random index between 0 and i
      [pok[i], pok[randomIndex]] = [pok[randomIndex], pok[i]]; // Swap the elements
    }

    setPokimons(pok);
    console.log(pok);
  }

  return (
    <>
      <div className="pokimons">
        {pokimons.map((pokimon) => {
          return (
            <Pokimon
              pokimon={pokimon}
              key={pokimon.key}
              onClick={(key) => onPokimonclicked(key)}
            ></Pokimon>
          );
        })}
      </div>

      <div className="scoreArea">
        <div className="score">Score: {score}</div>
        <div className="bestScore">Best score: {bestScore}</div>
      </div>
    </>
  );
}

export default Pokimons;
