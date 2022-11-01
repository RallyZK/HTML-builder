const fs = require('fs');
const path = require('path');
const pathToStyleFiles = path.resolve(__dirname, 'styles');
const pathToBundle = path.resolve(__dirname, 'project-dist', 'bundle.css');

const createBundleCss = async () => {
    return new Promise((resolve, reject) => fs.writeFile(pathToBundle, '', (err) => {
        if (err) return reject(err.message)
        console.log('File   "Bundle.css"  was successfully created')
        resolve()
    }))
}

const readStyleFiles = async () => {
    return new Promise((resolve, reject) => fs.readdir(pathToStyleFiles, (err, files) => {
        if (err) return reject(err.message)
        //console.log(files)
        files.forEach(el => {
            const ext = path.extname(path.join(pathToStyleFiles, el))
            if (ext === '.css') { 
                const separator = `/* ---------   styles from "${el}" file   -------- */`;               
                const readStream = fs.createReadStream(path.join(pathToStyleFiles, el), 'utf-8');
                readStream.on('data', (chunk) => {                    
                    fs.appendFile(pathToBundle, (separator + '\n\n' + chunk + '\n\n'), (err) => {
                        if (err) throw err
                        console.log(`File "${el}" data was successfully copied to "bundle.css"`);
                    })
                })
            }
        })
        resolve()
    }))
}

createBundleCss().then(() => readStyleFiles())