import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import Authentification from '../abis/Authentification.json'
import Navbar from './Navbar'
import ValiderDiplome from './ValiderDiplome'
class ValiderPage extends Component {
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
    this.validerDiplome = this.validerDiplome.bind(this)

  }
  
  validerDiplome(id) {
    this.setState({ loading: true })
    this.state.authentification.methods.validerDiplome(id).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  render() {
    return (
      <div>
        
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <ValiderDiplome
                      diplomes = {this.state.diplomes}
                      validerDiplome = {this.validerDiplome}/>
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default ValiderPage;
