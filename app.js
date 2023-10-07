const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter name of the folder: ', (folderName) => {

const folderPath = './chats/'+   (!folderName)? './chats/MagicTraderSignals':folderName

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach(file => {
      if (path.extname(file) === '.html') {
        fs.readFile(path.join(folderPath, file), 'utf8', (err, data) => {
          if (err) {
            console.error(`Error reading file: ${file}`);
            return;
          }

          const $ = cheerio.load(data);
          const text = $('div.text:contains("📊 Trading Report (JUNE/07)")').text(); // Adjust the selector as needed

          console.log(`File: ${file}`);

          if(text.includes('📊 Trading Report') && (text.includes('WIN') || text.includes('LOSS') )){
             console.log(`Text: ${text}`);
          }
           
        });
      }
    });
  });

  rl.close();
});
