import React, { useEffect, useState } from 'react';
import './rick-and-morty.css';

function RickMorty() {
  const [listCharacter, setListCharacter] = useState([]); //el array donde estan todos los personajes 
  const [character, setCharacter] = useState(''); // recibe el id de cada personaje 
  const [selected, setSelected] = useState(''); // devuelve el personaje seleccionado
  const [add, setAdd] = useState([]);


  const ObtenerDatos = async() => {
    const url = await fetch ('https://rickandmortyapi.com/api/character');
    const data = await url.json();
    console.log(data.results);
    setListCharacter(data.results);
  }

  const selectCharacter = async(e) => {
    setSelected(character);
    if (selected !== '') {
      const url = await fetch(`https://rickandmortyapi.com/api/character/${selected}`);
      const data = await url.json();
      console.log({ name: data.name, status: data.status, species: data.species, image: data.image });
      setAdd([ {name: data.name, status: data.status, species: data.species, image: data.image} ]);
    }
  }

  // const onChangeBox =(e) => {
  //   const selectedId = e.target.value;
  //   const selectedPj = data.results.filter((d) => d.id == selectedId)[0];
  //   setCharacter(selectedPj)
  // }

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
    selectCharacter()
  },[character]);

  return (
    <div className="container">
      <h1>Rick and Morty App</h1>
      <select value={ character?.id } onChange={(e) => setCharacter(e.target.value) } name="select"> 
      <option value={""}> -- Select a Character --</option>
        {
          listCharacter.map(item => {
            return <option key={item.id} value={item.id}>{item.name}</option>
          })
        };
      </select>
      <div>
        {
          add.map (card => {
              return( 
                <div key={card} className="cards">
                <img src={card.image} alt={card.name} />
                <div className='card-txt'>
                  <h2>{card.name}</h2>
                  <div className='txt'>
                  <p>species: <b>{card.species}</b> </p>
                  <p>status: <b>{card.status}</b> </p>
                  </div>
                </div>
              </div>
              )
          })
        }
      </div>
    </div>
  );
}

export default RickMorty;
