const db = require('../db/connection.js');

class Users {
  static async getAllUsers() {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  }

  static async getUserById(id) {
    const result = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return result.rows[0];
  }

  static async getUserByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async getUserByEmployeeId(employeeId) {
    const result = await db.query('SELECT * FROM users WHERE employee_id = $1', [employeeId]);
    return result.rows[0];
  }

  static async addUser (employee_id, email, password) {
    const result = await db.query('INSERT INTO users (employee_id, email, user_password) VALUES ($1, $2, $3) RETURNING *', [employee_id, email, password]);
    return result.rows[0];
  }

  static async deleteUser(id) {
    const result = await db.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async updateUser(id, fields) {
    const key = Object.keys(fields);
    const value = Object.values(fields);

    const setClause = key.map((k, index) => `${k} = $${index + 1}`).join(', ');

    const query = `UPDATE users SET ${setClause} WHERE user_id = $${key.length + 1} RETURNING *`;
    const result = await db.query(query, [...value, id]);

    return result.rows[0];
  }

}

module.exports = Users;