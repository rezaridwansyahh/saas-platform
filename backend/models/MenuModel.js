const db = require('../db/connection.js');

class MenuModel {
  static async getAll(){
    const result = await db.query(`
      SELECT * 
      FROM menus`
    );
    return result.rows;
  }

  static async getById(id){
    const result = await db.query(`
      SELECT * 
      FROM menus 
      WHERE id = $1`, 
      [id]);
    return result.rows[0];
  }

    static async getByModuleId(module_id){
    const result = await db.query(`
      SELECT mn.*
      FROM menus mn
      JOIN modules m ON mn.module_id = m.id
      WHERE m.id = $1
      ORDER BY mn.name;
      `, [module_id]);;
      return result.rows;
    }

  static async create({name, module_id}){
    const result = await db.query(`
      INSERT INTO menus (name, module_id) 
      VALUES ($1, $2) 
      RETURNING *`, 
      [name, module_id]);
    return result.rows[0];
  }

  static async update(id, {name}){
    const result = await db.query(`
      UPDATE menus 
      SET name = $1 
      WHERE id = $2 
      RETURNING *`, 
      [name, id]);
    return result.rows[0];
  }

  static async delete(id){
    const result = await db.query(`
      DELETE FROM menus 
      WHERE id = $1 
      RETURNING *`, 
      [id]);
    return result.rows[0];
  }
}

module.exports = MenuModel;