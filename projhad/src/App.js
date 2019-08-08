import React from 'react';
import axios from 'axios';
import  './App.css';

class App extends React.Component {
   
  
  state = {
    persons: [],
    nome: '',
    clube: '',
    tempoInscricao:'',
    tempoFinal:'',
    provaId:'',
    id:''
      }

      handleChange = event => {
        this.setState({ nome: event.target.value});
       }
    
       handleChangeClub = event => {
        this.setState({ clube: event.target.value});
       }
       handleChangetempoInscricao = event => {
        this.setState({ tempoInscricao: event.target.value});
       }
       handleChangetempoFinal = event => {
        this.setState({ tempoFinal: event.target.value});
       }
       handleChangeidprova = event => {
        this.setState({ provaId: event.target.value});
       }
       handleChangeid= event => {
        this.setState({ id: event.target.value});
       }
 
       handleSubmit = event => {
        event.preventDefault();
      
        axios.post('http://educaio.ufrn.br/api/inscricoes', { 
          nome: this.state.nome,
          clube: this.state.clube,
          tempoInscricao: parseInt(this.state.tempoInscricao),
          tempoFinal: parseInt(this.state.tempoFinal),
          provaId: parseInt(this.state.provaId)
        })
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
        }

        handleSubmit2 = event => {
          event.preventDefault();
        
          axios.put('http://educaio.ufrn.br/api/inscricoes', { 
            nome: this.state.nome,
            clube: this.state.clube,
            tempoInscricao: parseInt(this.state.tempoInscricao),
            tempoFinal: parseInt(this.state.tempoFinal),
            provaId: parseInt(this.state.provaId),
            id: parseInt(this.state.id),
          })
            .then(res => {
              console.log(res);
              console.log(res.data);
            })
          }



   mostrarlist = event => { 
    event.preventDefault(); 
   
    axios.get('http://educaio.ufrn.br/api/inscricoes')
    .then(res => {
    const persons = res.data;
    this.setState({ persons });
    })
   }

  //DELETAR
    handleChange1 = event => {
      this.setState({ id: event.target.value });
    }
  
    handleSubmit1 = event => {
      event.preventDefault();
  
      axios.delete(`http://educaio.ufrn.br/api/inscricoes/${this.state.id}`)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }
    //fimdeletar
    

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <h2>INSCRIÇÃO</h2>
          <label class="label">
            Nome:
            <input class="text" type="text" name="nome" onChange={this.handleChange} />
          </label>
          <p/>
          <label class="label">
            Clube:
            <input class="text" type="text" name="clube" onChange={this.handleChangeClub} />
          </label>
          <p/>
          <label class="label">
            Tempo de Inscrição: 
            <input class="text" type="text" name="tempoInscricao" onChange={this.handleChangetempoInscricao} />
          </label>
          <p/>
          <label class="label">
            Tempo Final: 
            <input class="text" type="text" name="tempoInscricao" onChange={this.handleChangetempoFinal} />
          </label>
          <p/>
          <label class="label">
            ID de Prova:
            <input class="text"  type="text" name="idprova" onChange={this.handleChangeidprova} />
          </label>
          <p/>
          <button type="submit" class="bot">INSCREVER</button>            

         </form>
      
      <h2>ATUALIZAR</h2>
         <form onSubmit={this.handleSubmit2 }>
          <label class="label">           
                ID:
                <input class="text" type="text" name="id" onChange={this.handleChangeid} />
              </label>
              <p>
              <button type="submit" class="bot">Atualizar</button> </p>
         </form>

       <div>
        <form onSubmit={this.handleSubmit1}>
        <h2>DELETAR</h2>
          <label class="label">
            ID DA INSCRIÇÃO:
            <input class="text"  type="text" name="id" onChange={this.handleChange1} />
          </label>
          <p> <button type="submit" class="bot">Deletar</button></p>
        </form>
     </div>

  <h2>VISUALIZAR INSCRIÇÕES</h2>
 <ul> 
 <form onSubmit={this.mostrarlist}> 
     <button type="submit" class="bot">MOSTRAR LISTA</button>    

 { this.state.persons.map(person => <li key={person.id}>{"ID: "+person.id}
                                      {" Nome: "+person.nome}
                                      {" provaID: "+person.provaId}
                                      {" Tempo de Inscricao: "+person.tempoInscricao}
                                      {" Tempo Final: "+person.tempoFinal}
                                      {" Clube: "+person.clube}
                                      </li>
                                          )}
     </form>                                        
  </ul> 
  </div> 
  )
  }
}

export default App;