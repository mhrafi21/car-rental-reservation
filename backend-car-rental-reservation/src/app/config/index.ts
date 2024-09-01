import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  Default_pass: process.env.DEFAULT_PASS,
  NODE_ENV: process.env.NODE_DEV,
  default_password: process.env.DEFAULT_PASS,
  JWT_SECRET: process.env.JWT_ACCESS_SECRET,
}
