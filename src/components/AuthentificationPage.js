import React, { Component ,useState} from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import Authentification from '../abis/Authentification.json'
import Navbar from './Navbar'
import { useNavigate, useParams } from "react-router-dom";
import './AuthentificationPage.css';
class Authentifier extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Authentification.networks[networkId]
    if(networkData) {
      const authentification = web3.eth.Contract(Authentification.abi, networkData.address)
      this.setState({ authentification })
      const diplomeCount = await authentification.methods.diplomeCount().call()
      this.setState({ diplomeCount })
      this.setState({ loading: false})
      // Load diplomes
      for (var i = 1; i <= diplomeCount; i++) {
        const diplome = await authentification.methods.diplomes(i).call()
        this.setState({
          diplomes: [...this.state.diplomes, diplome]
        })
      }
      console.log(this.state.diplomes)
      

    } else {
      window.alert('Authentification contract not deployed to detected network.')
    }
  } 

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      diplomeCount: 0,
      diplomes: [],
      loading: true,
      data : null,
      print: false,
      bool: false
    }
     this.getData = this.getData.bind(this)
     this.searchDiplome = this.searchDiplome.bind(this)
}
 getData(val){
    this.setState({data : val.target.value});
    this.setState({print : false});
  }
 
  searchDiplome(id) {
    if(id <=this.state.diplomeCount && id >0 ){
    if ((this.state.diplomes[(id-1)]).valide)
      return true
    else return false 
  }else return false
}
  render() {
  return (
    
    <div className="App"> 
        <div>
          <div className="cert">
          <h1>Certifier Diplome</h1><br/>
            <input type="text" placeholder=" ID Diplome" onChange={this.getData}/>
            <button id="b2" class="btn btn-primary" onClick={() => {
                              this.setState({print : true})
                              this.setState({bool : this.searchDiplome(this.state.data)})
            }}> Rechercher</button>
            {
              !this.state.bool
              ?<h2> Non Certifié </h2>
         
              :<h2> Certifié Par La Blockchain </h2>
            }
          </div>
        </div>
    </div>


    );
  }
}

export default Authentifier;
