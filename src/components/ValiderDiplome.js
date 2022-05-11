import React, { Component } from 'react';

class ValiderDiplome extends Component {

  render() {
    return (
      <div id="content">
        <p> </p>
        <h2>Valider Diplome</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Prenom</th>
              <th scope="col">Specialite</th>
              <th scope="col">Niveau</th>
              <th scope="col">Owner</th>
              <th scope="col">Validé</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="diplomeList">
            { this.props.diplomes.map((diplome, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{diplome.id.toString()}</th>
                  <td>{diplome.etud_nom}</td>
                  <td>{diplome.etud_prenom}</td>
                  <td>{diplome.specialite}</td>
                  <td>{diplome.niveau}</td>
                  <td>{diplome.owner}</td>
                  <td>{diplome.valide.toString()}</td>
              
        
                  <td>
                    { !diplome.valide
                      ? <button
                          name={diplome.id}
                          onClick={(event) => {
                            this.props.validerDiplome(diplome.id)
                          }}
                        >
                          Valider
                        </button>
                      : null
                    }
                  </td>
                </tr>
              )
            }
            )}
               
              </tbody>
            </table>
          </div>
    );
  }
}
export default ValiderDiplome;