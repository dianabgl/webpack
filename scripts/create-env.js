//Script correrá sobre node, utilizará FileSystem para poder trabajar con el sistema opertativo y crear archivos en la computadora
const fs = require('fs');

fs.writeFileSync('./.env', `API=${process.env.API}\n`);
