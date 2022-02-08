import React, { useEffect, useState } from "react";
import "./rick-and-morty.css";

function RickMorty() {
  const [listCharacter, setListCharacter] = useState([]); //el array donde estan todos los personajes
  const [character, setCharacter] = useState(""); // recibe el id de cada personaje
  const [selected, setSelected] = useState({}); // devuelve el personaje seleccionado

  const ObtenerDatos = async () => {
    const url = await fetch("https://rickandmortyapi.com/api/character");
    const data = await url.json();
    setListCharacter(data.results);
  };

  const selectCharacter = async () => {
    if (selected !== "") {
      const url = await fetch(
        `https://rickandmortyapi.com/api/character/${character}`
      );
      const data = await url.json();
      setSelected(data);
    }
  };
  useEffect(() => {
    // fetch ("https://rickandmortyapi.com/api/character")
    // .then((res) => res.json())
    // .then((data) => {
    //   setListCharacter(data.results);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    ObtenerDatos();
  }, []);

  useEffect(() => {
    selectCharacter();
  }, [character]);

  return (
    <div className="container">
      <h1>Rick and Morty App</h1>
      <select value={character} onChange={(e) => setCharacter(e.target.value)}>
        <option value=""> -- Select a Character --</option>
        {listCharacter.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
        ;
      </select>
      <div>
        {selected?.name ? (
          <div className="cards">
            <img src={selected.image} alt={selected.name} />
            <div className="card-txt">
              <h2>{selected.name}</h2>
              <div className="txt">
                <p>
                  species: <b>{selected.species}</b>{" "}
                </p>
                <p>
                  status: <b>{selected.status}</b>{" "}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="loading-txt">Seleccione un personaje</p>
        )}
      </div>
    </div>
  );
}

export default RickMorty;
