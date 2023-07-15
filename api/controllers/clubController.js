const Club = require('../models/club');


exports.getClubs = async (req,res) => {
    Club
    .find()
    .then(data => {
      res.json({data : data});
    })
    .catch(err => {
      res.status(404).json({message : 'No club Found'});
    })
}