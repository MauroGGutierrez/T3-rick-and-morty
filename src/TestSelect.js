import {useEffect, useState} from 'react';
import './TestSelect.css';

const TestSelect = () => {
const [selected, setSelected] = useState('');
const [options, setOptions] = useState([]);
const [user, setUser] = useState({});

const dataApi = [
  {
    id: '1',
    name: 'Pedro',
  },
  {
    id:'2',
    name:'Carlos',
  },
];

useEffect(() => {
  setOptions(dataApi);
}, []);

useEffect(() => {
  const usr = dataApi.find((u)=> u.id === selected)
  setUser(usr);
}, [selected]); //tenemos que estar atento al value del select

useEffect(() => {
  if (user?.name) {
    alert(`Bienvenido ${user.name}`)
  }
}, [user]);


  return (
    <div className="container">
      <h1>Test de Select</h1>
      <select value={selected} onChange={(e)=> setSelected(e.target.value)}>
        <option value="">-</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.id}>{opt.name}</option>
        ))}
      </select>
    </div>
  );
};

export default TestSelect;