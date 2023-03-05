//JavaScript code should be executed in "strict mode"
'use strict'

// Import the filesystem module
const fs = require('fs');
const { writeFile } = require('fs/promises');

(async function main() {
   //Read the original file
   // for (let i = 0; i < 1098; i++) {
   ;

   // Function to get current filenames
   // in directory
   const targetDir = process.argv[2] || process.cwd();
   for (let i = 0; i < 33; i++) {
      fs.copyFile('1.json', `${targetDir}/${i + 1}.json`, (err) => {
         if (err)
            throw err;
         console.log('File coppied ', i + 2);
      });
   }
   process.exit(0);
})();
