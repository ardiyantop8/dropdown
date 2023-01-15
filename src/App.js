import './App.css';
import Select from 'react-select'
import {useEffect, useState } from 'react';

function App() {
  const [datas, setDatas] = useState([])
  const [userSelect, setUserSelect] = useState("") /* membuat variable const dengan yg kiri adalah tempat nilainya dan yg kanan adalah untuk mensetnya dengan metode useState */
  const [isShow, setIsShow] = useState(false) 
  
  const getBerries = async () => {
    const berries = await fetch("https://pokeapi.co/api/v2/berry/")
    const value = await berries.json()
    let result = value.results.map(data => {
      return {
        label : data.name,
        value : data.name
      }
    })
    setDatas(result.sort((a,b) => a.label.localeCompare(b.label))) /* sort untuk mengurutkan data secara ascending */
  }

  useEffect(() => {
    getBerries()
  }, [])

  const handleSubmit = () => {
    // console.log('Nilai yg dipilih = ', userSelect) /* Untuk menampilkan hasilnya dengan userSelect */
    setIsShow(state => !state)
  }

  const handleChange = (value) => {
    setUserSelect(value) /* Untuk mengeset value yg dipilih kedalam setUserSelect */
  }

  return (
    <div className="App">
      <button onClick={() => handleSubmit()} disabled={!userSelect}>{isShow ? "Hide Button" : "Show Values"}</button>
      <Select options={datas} onChange={(e) => handleChange(e.value)}></Select>
      <h1>Nilai yang dipilih adalah : {isShow ? userSelect : ""}</h1>
    </div>
  );
}

export default App;
