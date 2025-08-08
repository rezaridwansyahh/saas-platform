const { getPositionById, getPositionByCompanyId, addPosition, deletePosition, editPosition } = require('../models/positionsModel.js');
const { getCompanyById } = require('../models/companiesModel.js');
const { add } = require('winston');

exports.fetchPositionsId = async (req, res) => {
  const companyId = req.user.companyId;
  const { id } = req.params;

  try {
    const position = await getPositionById(id);

    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }

    if (position.company_id !== companyId) {
      return res.status(403).json({ message: "You do not have permission to access this position" });
    }

    res.status(200).json({ position });
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.fetchPositionsIdByCompanyId = async (req, res) => {
  const companyId = req.user.companyId;

  try{
    const company = await getCompanyById(companyId);
    const positions = await getPositionByCompanyId(companyId);

    if (companyId !== company.company_id) {
      return res.status(403).json({ message: "You do not have permission to access this company's positions" });
    }

    res.status(200).json({ positions });
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.addPosition = async (req, res) => {
  const companyId = req.user.companyId;
  const {name, additional} = req.body;
  try{
    const newPosition = await addPosition(name, additional, companyId);
    res.status(201).json({ newPosition });
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.editPosition = async (req, res) => {
  const companyId = req.user.companyId;
  const { id } = req.params;
  const { name, additional } = req.body;
  const fields = {};

  if (name) fields.name = name;
  if (additional) fields.additional = additional;

  try{
    const position = await getPositionById(id);
    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }
    if (position.company_id !== companyId) {
      return res.status(403).json({ message: "You do not have permission to edit this position" });
    }


    const updatedPosition = await editPosition(id, fields);
    res.status(200).json({ updatedPosition });
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.deletePosition = async (req, res) => {
  const companyId = req.user.companyId;
  const { id } = req.params;

  try{
    const position = await getPositionById(id);
    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }

    if (position.company_id !== companyId) {
      return res.status(403).json({ message: "You do not have permission to delete this position" });
    }
    await deletePosition(id);
    res.status(200).json({ message: "Position deleted successfully" });
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}



