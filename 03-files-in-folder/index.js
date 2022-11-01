const fs = require('fs');
const path = require('path');
const pathToSecretFolder = path.join(__dirname, 'secret-folder');
const kb = 0.0009765625 // 1 b = 0.0009765625 kb

//console.log(path.basename(pathToSecretFolder))

fs.readdir(pathToSecretFolder, (error, items) => {
    //console.log(items)
    if (error) {
        console.log(err)
        return
    } else {
        items.forEach(el => {
            fs.stat(path.join(pathToSecretFolder, el), (err, stats) => {
                if (err) {
                    console.log(err)
                    return
                } else {
                    const isDir = stats.isDirectory();                    
                    const size = stats.size;
                    if (!isDir) {                
                        const ext = path.extname(path.join(pathToSecretFolder, el))
                        const name = path.basename(path.join(pathToSecretFolder, el), ext)                       
                        console.log(name, '-', ext.slice(1), '-', (size * kb).toFixed(3)+'kb' )
                    }
                }
            })            
        })
    }
})