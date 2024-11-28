let FlatModel = require("../models/FlatModel");

exports.createFlat = function (req, res, next) {
  let newFlat = req.body;
  let flat = new FlatModel(newFlat);
  flat
    .save()
    .then((data) => {
      res.status(201).json({message:"Flat successfully created", data:data})
    })
    .catch((err) => {
      res.json({ err: err });
    });
};
exports.getflatbyID = async function (req, res, next) {
  let flatID = req.params.id;
  let flat = await FlatModel.findOne({_id: flatID});
  if(!flat){
    res.json({error:"Flat does not exist!"});
    return;
  }
  res.json({ data: flat});
};
exports.getAllFlats = function (req, res, next) {
  FlatModel.find({})
  .then((data) => {
    res.json({ data: data });
  })
  .catch((error) => {
    res.status(400).json({ error: error });
  });
};
exports.deleteFlat = function (req, res, next){
  let id = req.params.id;
  FlatModel.findByIdAndDelete(id)
  .then((data) =>{
    res.status(201).json({message:"Flat deleted", data:data});
  })
  .catch((error) =>{
    res.json({error: error});
  });
}