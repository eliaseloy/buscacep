import { useState} from 'react';
import './styles.css';


import api from './services/api';

function App() {

  const [input, setInput] = useState('');

  const [cep, setCep] = useState({});

  async function clickSearch(){
    //alert('Valor do input:   ' + input)

    if(input === ''){
      alert("Informe algum cep válido!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      console.log(response.data)
      setCep(response.data)
      setInput("");
    }catch{
      alert("Erro ao buscar o cep informado...");
      setInput("")
    }
  }
  
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Informe o CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className="buttonSearch" onClick={clickSearch}> 
          Buscar CEP
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>
          
        </main>
      )}
      
    </div>
  );
}

export default App;
