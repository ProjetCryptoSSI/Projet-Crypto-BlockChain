pragma solidity ^0.5.0;

contract Authentification {
    string public name;
    uint public diplomeCount = 0;
    mapping(uint => Diplome) public diplomes;


    struct Diplome {
        uint id;
        string etud_nom;
        string etud_prenom;
        uint matricule;
        string specialite;
        string niveau;
        //uint price;
        address owner;
        //address payable owner;
        bool valide;
        bytes32 hash_diplome;
    }

    event DiplomeCreated(
        uint id,
        string etud_nom,
        string etud_prenom,
        uint matricule,
        string specialite,
        string niveau,
        //uint price,
        address owner,
        bool valide,
        bytes32 hash_diplome
    );
    event DiplomeValide(
	    uint id,
        string etud_nom,
        string etud_prenom,
        uint matricule,
        string specialite,
        string niveau,
        //uint price,
        address owner,
        bool valide,
        bytes32 hash_diplome
	);
    constructor() public {
        name = "Authentification Diplomes";
    }
    function hash(uint _id, string memory etud_nom)
        public pure returns(bytes32)
    {
        return keccak256(abi.encodePacked(_id, etud_nom));
    }
    function createDiplome(string memory _etud_nom,string memory _etud_prenom, uint _matricule,string memory _specialite,string memory _niveau) public {
        // Require a valid name
        require(bytes(_etud_nom).length > 0);
        // Require a valid firstname
        require(bytes(_etud_prenom).length > 0);
        // Require a valid matricule
        require(_matricule > 0);
        // Require a valid specialty
        require(bytes(_specialite).length > 0);
        // Require a valid niveau
        require(bytes(_niveau).length > 0);
        // Increment product count
        diplomeCount ++;
        bytes32 _hash_diplome = hash(diplomeCount,_etud_nom);
        // Create the product
        diplomes[diplomeCount] = Diplome(diplomeCount, _etud_nom,_etud_prenom, _matricule,_specialite,_niveau, msg.sender, false,_hash_diplome);

        // Trigger an event
        emit DiplomeCreated(diplomeCount, _etud_nom,_etud_prenom, _matricule,_specialite,_niveau, msg.sender, false, _hash_diplome);
    }
    function searchHash(bytes32 _hash) public view returns(uint){
        for (uint i=0; i< diplomeCount; i++ ){
            if(diplomes[i].hash_diplome == _hash ){
                return i;
            }
            else{
                return 0;
            }
        }
    }
    function getHash(uint id) public view returns(bytes32){
        return diplomes[id].hash_diplome;
    }
    function validerDiplome(uint _id) public  {
	    // Fetch the diploma
	    Diplome memory _diplome = diplomes[_id];
	    // Fetch the owner
	    address _seller = _diplome.owner;
	    // Make sure the product has a valid id
	    require(_diplome.id > 0 && _diplome.id <= diplomeCount);
	    // Require that the diplome has not been validated already
        require(!_diplome.valide);
	    // Require that the buyer is not the seller
	    require(_seller != msg.sender);
	    // Transfer ownership to the buyer
	    _diplome.owner = msg.sender;
	    // Mark as validé
	    _diplome.valide = true;
        //console.log("check validé",_diplome.valide.toString());
	    // Update the diplome
	    diplomes[_id] = _diplome;
	    
	    // Trigger an event
	    emit DiplomeValide(diplomeCount, _diplome.etud_nom,_diplome.etud_prenom, _diplome.matricule,_diplome.specialite,_diplome.niveau, msg.sender, true, _diplome.hash_diplome);
	}
    function searchDiplome(uint _id) public view returns (bool) {
        // Fetch the diploma
        Diplome memory _diplome = diplomes[_id];
        // Fetch the owner
        address _seller = _diplome.owner;
        // Make sure the product has a valid id
        require(_diplome.id > 0 && _diplome.id <= diplomeCount);
        // Require that the diplome has  been validated already
        require(_diplome.valide);
       // Require a valid name
        require(bytes(_diplome.etud_nom).length > 0);
        // Require a valid firstname
        require(bytes(_diplome.etud_prenom).length > 0);
        // Require a valid matricule
        require(_diplome.matricule > 0);
         // Transfer ownership to the buyer
        _diplome.owner = _diplome.owner;
        // Require a valid specialty
        require(bytes(_diplome.specialite).length > 0);
        // Require a valid niveau
        require(bytes(_diplome.niveau).length > 0);
        if (_diplome.id > 0 && _diplome.id <= diplomeCount) { return true;}
        else{return false;}
    }
    
}