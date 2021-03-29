import fs from 'fs'

fs.readFile('test.txt', 'utf-8', (err, msg)=>console.log(msg))
console.log('done')