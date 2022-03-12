import pool from './DbConfig';

// create table if not exist
const userCertificateSchema = `
CREATE TABLE IF NOT EXISTS
CertificatesPrinted( 
  user_id VARCHAR(100) PRIMARY KEY NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  occupation VARCHAR(150) UNIQUE NOT NULL,
  dob VARCHAR(150) NOT NULL,
  occupdation VARCHAR(150) NOT NULL,
  address VARCHAR(150),
  print_count VARCHAR(150) DEFAULT 0,
  printed_on VARCHAR(150) NOT NULL,
  reprinted_on VARCHAR(150) NOT NULL
)
`;

// excute the query to create the table
pool.query(userCertificateSchema, (error, results) => {
  if (error) return console.log(`sorry! cannot create table ${error}`);
  console.log(`Certificate monitering table created ${results}`);
});

class CertificatePrintCount {
  constructor(
    userId,
    fullName,
    occupation,
    dob,
    ocupation,
    address,
    printCount,
    printedOn,
    rePrintedOn,
  ) {
    this.userId = userId;
    this.fullName = fullName;
    this.ocupation = ocupation;
    this.dob = dob;
    this.occupation = occupation;
    this.address = address;
    this.printCount = printCount;
    this.printedOn = printedOn;
    this.rePrintedOn = rePrintedOn;
  }

  // create new user account
  StoreCertificatePrint() {
    const query = 'INSERT INTO CertificatesPrinted(userId, fullName, occupation, dob, ocupation, address, printCount, printedOn, rePrintedOn';
    const values = [
      this.userId,
      this.fullName,
      this.occupation,
      this.dob,
      this.occupation,
      this.address,
      this.printCount,
      this.printedOn,
      this.rePrintedOn,
    ];
    return pool.query(query, values);
  }

  // get all printed certifcate counts -> te
  static getPrintCount() {
    return pool.query('SELECT COUNT(*) FROM CertificatesPrinted ');
  }

  // get printed certifcate by userid-> tei of dhis2
  static getPrintCountByUser(userId) {
    return pool.query(
      'SELECT print_count FROM CertificatesPrinted WHERE user_id=$1',
      [userId],
    );
  }

  // get all printed certifcate data and do some operation to provide to dashboard
  static getAllPrints() {
    return pool.query('SELECT * FROM CertificatesPrinted ');
  }

  // update counts when same user is reprinting the certificate,
  // get cuurent count first before updating
  static updateCertifcateCount(updatedCount, userId) {
    const query = `UPDATE CertificatesPrinted 
    SET print_count=$1,
    WHERE userId=$2`;
    const values = [updatedCount, userId];
    return pool.query(query, values);
  }
}

export default CertificatePrintCount;
