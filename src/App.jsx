import { useEffect, useState } from "react";
import "./App.css";

function App() {
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

  useEffect(() => {
    const dataFetcher = async () => {
      const pokimonsData = await fetchPokimonsData();
      setPokimons(pokimonsData);
      console.log(pokimons);
    };

    dataFetcher();
  }, []);

  async function fetchPokimonsData() {
    const pokimonsSet = new Set();

    pokemonNamesToFetch.forEach(async (pokimonName) => {
      try {
        const pokimon = await fetchPokimonData(pokimonName);
        pokimonsSet.add(pokimon);
      } catch (error) {
        console.error("Pokimon not found", error);
      }
    });

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
        name: data.name,
        imgUrl: data.sprites.front_default,
      };

      return pokimon;
    } catch (error) {
      console.error("error fetching data", error);
    }
  }
}

export default App;
