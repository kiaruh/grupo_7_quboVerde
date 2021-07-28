let b = require('bcryptjs')
let a = b.hashSync('nico1234',10)
console.log(a);


console.log(b.compareSync("nico1234" , a));