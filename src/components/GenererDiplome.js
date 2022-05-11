import React, { Component } from 'react';
import "./GenererDiplome.css"
class GenererDiplome extends Component {

  render() {
    return (
      <div id="content_generer">
        <h1>Generer Diplome</h1>
        <br/>
        <form onSubmit={(event) => {
          event.preventDefault()
          const nom = this.diplomeNom.value
          const prenom = this.diplomePrenom.value
          const mat = this.diplomeMatricule.value.toString()
          const spec = this.diplomeSpecialite.value
          const niv = this.diplomeNiveau.value
          this.props.createDiplome(nom,prenom,mat,spec,niv)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="diplomeNom"
              type="text"
              ref={(input) => { this.diplomeNom = input }}
              className="form-control"
              placeholder="Nom"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="diplomePrenom"
              type="text"
              ref={(input) => { this.diplomePrenom = input }}
              className="form-control"
              placeholder="Prenom"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="diplomeMatricule"
              type="text"
              ref={(input) => { this.diplomeMatricule = input }}
              className="form-control"
              placeholder="Matricule"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="diplomeSpecialite"
              type="text"
              ref={(input) => { this.diplomeSpecialite = input }}
              className="form-control"
              placeholder="Specialite"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="diplomeNiveau"
              type="text"
              ref={(input) => { this.diplomeNiveau = input }}
              className="form-control"
              placeholder="L - M - D"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Generer Diplome</button>
        </form>
        
      </div>
    );
  }
}
export default GenererDiplome;