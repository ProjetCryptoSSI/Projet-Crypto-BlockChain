//import "./App.css";
import React, { Component } from 'react';
import Web3 from 'web3'
import "./Accueil.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import Authentification from '../abis/Authentification.json'
import ValiderPage from "./ValiderPage";
import LOGIN from "./Login";
import Authentifier from "./AuthentificationPage";
import Welcome from "./welcome";

import { useNavigate} from "react-router-dom";

import Navbar from './Navbar'
class Accueil extends Component {
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
      loading: true
    }
  }
  
  
 render() {
  return (
    <div>
    <Router>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <ul >
        <li className="navbar-brand "> Blockchain Authentification </li>
        <li id="liste"><Link to="/login" className="navbar-brand "> S'identifier </Link></li>
        <li id="liste"><Link to="/app" className="navbar-brand "> Generer  </Link></li>
        <li id="liste"><Link to="/valider" className="navbar-brand "> Valider </Link></li>
        <li id="liste"><Link to="/authentifier" className="navbar-brand "> Authentifier </Link></li>
      </ul>
            <p id="account_li" className="navbar-brand col-sm-3 ">{this.state.account}</p>
         
     
        
          
  
      </nav>
        <div className="container-fluid mt-5">
          <div className="row">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/app" element={<App />} />
          <Route path="/valider" element={<ValiderPage />} />
          <Route path="/login" element={<LOGIN />} />
          <Route path="/authentifier" element={<Authentifier />} />
        </Routes>
      
    
          </div>
        </div>
    </Router>
 
        </div>
  );
}
}


    



export default Accueil;
