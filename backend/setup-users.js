const bcrypt = require('bcryptjs');

const users = [
  { email: 'admin@logistica.com', password: 'admin123', rol_id: 1 },
  { email: 'operador@logistica.com', password: 'oper123', rol_id: 2 },
  { email: 'supervisor@logistica.com', password: 'sup123', rol_id: 3 },
  { email: 'gerente@logistica.com', password: 'ger123', rol_id: 4 }
];

async function generateHashes() {
  console.log('Generating bcrypt hashes for test users...\n');
  
  for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);
    console.log(`UPDATE usuarios SET password_hash = '${hash}' WHERE email = '${user.email}';`);
  }
  
  console.log('\nCopy these UPDATE statements and run them in your database after initial setup.');
}

generateHashes().catch(console.error);
