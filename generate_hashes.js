const bcrypt = require('bcryptjs');

const passwords = [
  'admin123',
  'oper123', 
  'sup123',
  'ger123'
];

async function generateHashes() {
  for (const password of passwords) {
    const hash = await bcrypt.hash(password, 10);
    console.log(`${password}: ${hash}`);
  }
}

generateHashes();
