import pool from './DbConfig';

// create table if not exist
const userSchema = `
CREATE TABLE IF NOT EXISTS
Users(
  email VARCHAR(150) PRIMARY KEY NOT NULL,
  user_id VARCHAR(100) UNIQUE KEY NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  password VARCHAR(150) NOT NULL,
  created_on VARCHAR(150) NOT NULL,
)
`;
// excute the query to create the table
pool.query(userSchema, (error, results) => {
  if (error) return console.log(`sorry! cannot create table ${error}`);
  console.log(`Users to monitor certifcates printed table created ${results}`);
});

class Users {
  constructor(email, userId, fullName, password, createdOn) {
    this.email = email;
    this.userId = userId;
    this.fullName = fullName;
    this.password = password;
    this.createdOn = createdOn;
  }

  // create new user account
  createAccount() {
    const query = 'INSERT INTO users(email, userId, fullName, password, createdOn';
    const values = [this.email, this.userId, this.fullName, this.password, this.createdOn];
    return pool.query(query, values);
  }

  // login to view certificate printed counts
  static getUsers(email, userId) {
    return pool.query('SELECT * FROM users WHERE emaill=$1 OR userId =$2', [email, userId]);
  }

  // view all users who are currently monitering the certifcate printing
  static getAllUsers() {
    return pool.query('SELECT * FROM users ORDER BY createdon DESC');
  }
}

export default Users;
