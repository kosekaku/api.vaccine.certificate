import { Pool, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// dev 
const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
});

export default pool;
