const fs = require('fs');
const path = require('path');
const pathToFiles = path.resolve(__dirname, 'files');
const pathToFilesCopy = path.resolve(__dirname, 'files-copy');

const copyDir = async () => {
    return new Promise((resolve, reject) => fs.mkdir(pathToFilesCopy, { recursive: true }, (err) => {
        if (err) return reject(err.message)
        console.log('Directory   "files-copy"  was successfully created')
        resolve()
    }))
}

const deleteFiles = async () => {
    return new Promise((resolve, reject) => fs.readdir(pathToFilesCopy, (err, files) => {
        if (err) return reject(err.message)
        files.forEach(el => {
            fs.unlink(path.join(pathToFilesCopy, el), (err) => {
                if (err) throw err
            })
        })
        //console.log('prev files deleted')
        resolve()
    }))
}

const copyFiles = async () => {
    return new Promise((resolve, reject) => fs.readdir(pathToFiles, (err, files) => {
        if (err) return reject(err.message)
        //console.log(files)
        files.forEach(el => {
            const originPath = path.join(pathToFiles, el);
            const copyPath = path.join(pathToFilesCopy, el);
            fs.copyFile(originPath, copyPath, (err) => {
                if (err) throw err
                console.log(`File   "${el}"   was successfully copied`)
            })
        })
        resolve()
    }))
}

copyDir()
    .then(() => deleteFiles())
    .then(() => copyFiles())