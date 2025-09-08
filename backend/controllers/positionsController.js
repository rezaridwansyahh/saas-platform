const Positions = require('../models/positionsModel.js');
const Companies = require('../models/companiesModel.js');

class PositionsController {
  static async fetchPositionsById(req, res) {
    const companyId = req.user.companyId;
    const { id } = req.params;

    try {
      const position = await Positions.getPositionById(id);

      if (!position) {
        return res.status(404).json({ message: "Position not found" });
      }

      if (position.company_id !== companyId) {
        return res.status(403).json({ message: "You do not have permission to access this position" });
      }

      res.status(200).json({ position });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async fetchPositionsByCompanyId(req, res) {
    const companyId = req.user.companyId;

    try {
      const company = await Companies.getCompanyById(companyId);
      const positions = await Positions.getPositionByCompanyId(companyId);

      if (companyId !== company.company_id) {
        return res.status(403).json({ message: "You do not have permission to access this company's positions" });
      }

      res.status(200).json({ positions });
    }catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async addPosition(req, res) {
    const companyId = req.user.companyId;
    const {name, additional} = req.body;

    try {
      const newPosition = await Positions.addPosition(name, additional, companyId);
      res.status(201).json({ newPosition });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async editPosition(req, res) {
    const companyId = req.user.companyId;
    const { id } = req.params;
    const { name, additional } = req.body;
    const fields = {};

    if (name) fields.name = name;
    if (additional) fields.additional = additional;

    try {
      const position = await Positions.getPositionById(id);
      if (!position) {
        return res.status(404).json({ message: "Position not found" });
      }
      if (position.company_id !== companyId) {
        return res.status(403).json({ message: "You do not have permission to edit this position" });
      }

      const updatedPosition = await Positions.editPosition(id, fields);
      res.status(200).json({ updatedPosition });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deletePosition(req, res) {
    const companyId = req.user.companyId;
    const { id } = req.params;

    try {
      const position = await Positions.getPositionById(id);

      if (!position) {
        return res.status(404).json({ message: "Position not found" });
      }

      if (position.company_id !== companyId) {
        return res.status(403).json({ message: "You do not have permission to delete this position" });
      }
      
      await Positions.deletePosition(id);
      res.status(200).json({ message: "Position deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = PositionsController;