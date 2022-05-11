const Authentification = artifacts.require('./Authentification.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Authentification', ([deployer, departement, rectorat]) => {
  let authentification

  before(async () => {
    authentification = await Authentification.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await authentification.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await authentification.name()
      assert.equal(name, 'Authentification Diplomes')
    })
  })

  describe('diplomes', async () => {
    let result, diplomeCount

    before(async () => {
      result = await authentification.createDiplome('abbad', 'imene',32018857,'informatique', { from: departement })
      diplomeCount = await authentification.diplomeCount()
    })

    it('creates diplomes', async () => {
      // SUCCESS
      assert.equal(diplomeCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), diplomeCount.toNumber(), 'id is correct')
      assert.equal(event.etud_nom, 'abbad', 'name is correct')
      assert.equal(event.etud_prenom, 'imene', 'firstname is correct')
      assert.equal(event.specialite, 'informatique', 'specialite is correct')
      assert.equal(event.matricule, '32018857', 'matricule is correct')
      assert.equal(event.owner, departement, 'owner is correct')
      assert.equal(event.valide, false, 'valide is correct')

      // FAILURE: Diplome must have a name
      await await authentification.createDiplome('', 'imene',32018857,'informatique', { from: departement }).should.be.rejected;
      // FAILURE: Diplome must have a firstname
      await await authentification.createDiplome('abbad', '',32018857,'informatique', { from: departement }).should.be.rejected;
      // FAILURE: Diplome must have a mat
      await await authentification.createDiplome('abbad', 'imene',0,'informatique', { from: departement }).should.be.rejected;
      // FAILURE: Diplome must have a specialite
      await await authentification.createDiplome('abbad', 'imene',32018857,'', { from: departement }).should.be.rejected;
    })
    it('checks diplomes', async () => {
     

      // SUCCESS: diplome validé
      result = await authentification.validerDiplome(diplomeCount, { from: rectorat})

      // Check logs
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), diplomeCount.toNumber(), 'id is correct')
      assert.equal(event.etud_nom, 'abbad', 'name is correct')
      assert.equal(event.etud_prenom, 'imene', 'firstname is correct')
      assert.equal(event.matricule, 32018857, 'matricule is correct')
      assert.equal(event.specialite, 'informatique', 'specialitee is correct')
      assert.equal(event.owner, rectorat, 'owner is correct')
      assert.equal(event.valide, true, 'validé is correct')


      // FAILURE: Tries to valider a diplome that does not exist, i.e., diplome must have valid id
      await authentification.validerDiplome(99, { from: rectorat}).should.be.rejected;      // FAILURE: Buyer tries to buy without enough ether
      // FAILURE: Deployer tries to valider the diplome, i.e., diplome can't be valider twice
      await authentification.validerDiplome(diplomeCount, { from: deployer }).should.be.rejected;
      // FAILURE: rectorat tries to valider again
      await authentification.validerDiplome(diplomeCount, { from: departement }).should.be.rejected;
    })
  })
})