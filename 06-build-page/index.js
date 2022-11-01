const fs = require('fs');
const path = require('path');
const pathToProjectDist = path.resolve(__dirname, 'project-dist');
const pathToAssets = path.resolve(__dirname, 'assets');

const createPDDir = async () => {
    return new Promise((resolve, reject) => fs.mkdir(pathToProjectDist, { recursive: true }, (err) => {
        if (err) return reject(err.message)
        console.log('Directory   "project-dist"  was successfully created')
        resolve()
    }))
}

const createAssetsDir = async () => {
    return new Promise((resolve, reject) => fs.mkdir(path.join(pathToProjectDist, 'assets'), { recursive: true }, (err) => {
        if (err) return reject(err.message)
        console.log('Directory   "assets"  was successfully created')
        resolve()
    }))
}

const copyDirs = async () => {
    return new Promise((resolve, reject) => fs.readdir(pathToAssets, (err, dirs) => {
        if (err) return reject(err.message)
        //console.log(dirs)
        dirs.forEach(direl => {
            fs.mkdir(path.join(pathToProjectDist, 'assets', direl), { recursive: true }, (err) => {
                if (err) {
                    console.log(err.message, 'in copydirs')
                    return
                }
                console.log(`Directory   ${direl}  was successfully created`) 
            })                      
        })
        resolve()        
    }))
}

const deletePrevFiles = async () => {
    return new Promise((resolve, reject) => fs.readdir(path.join(pathToProjectDist, 'assets'), (err, dirs) => {
        if (err) return reject(err.message)
        dirs.forEach(direl => {

            fs.readdir(path.join(pathToProjectDist, 'assets', direl), (err, files) => {
                if (err) {
                    console.log(err.message, 'in delete fs.readdir')
                    return
                }   

                files.forEach(fileel => {
                    fs.unlink(path.join(pathToProjectDist, 'assets', direl, fileel), (err) => {
                        if (err) {
                            console.log(err.message, 'in delete files.forEach')
                            return
                        }
                    //console.log(`file ${fileel} was deleted`)
                    })
                })                
            })
        })        
        resolve()
    }))
}

const copyFiles = async () => {
    return new Promise((resolve, reject) => fs.readdir(pathToAssets, (err, dirs) => {
        if (err) return reject(err.message)
        //console.log(dirs, 'in copy files')
        dirs.forEach(direl => {

            fs.readdir(path.join(pathToAssets, direl), (err, files) => {
                if (err) {
                    console.log(err.message, 'in copy fs.readdir')
                    return
                }
                
                files.forEach(fileel => {
                    
                    const originPath = path.join(pathToAssets, direl, fileel);
                    const copyPath = path.join(pathToProjectDist, 'assets', direl, fileel);

                    //console.log(originPath)
                    //console.log(copyPath)

                    fs.copyFile(originPath, copyPath, (err) => {
                        if (err) {
                            console.log(err.message, 'in copy files.forEach');
                            return
                        }
                        //console.log(`File   "${fileel}"   was successfully copied`)
                    })
                })
            })
        })
        resolve()
    }))
}


const createStyleCss = async () => {
    return new Promise((resolve, reject) => fs.writeFile(path.join(pathToProjectDist, 'style.css'), '', (err) => {
        if (err) return reject(err.message)
        console.log('File   "style.css"  was successfully created')
        resolve()
    }))
}

const readStyleFiles = async () => {
    return new Promise((resolve, reject) => fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
        if (err) return reject(err.message)
        //console.log(files)        
        files.forEach(el => {
            const ext = path.extname(path.join(__dirname, 'styles', el))
            if (ext === '.css') { 
                const separator = `/* ---------   styles from "${el}" file   -------- */`;               
                const readStream = fs.createReadStream(path.join(__dirname, 'styles', el), 'utf-8');
                readStream.on('data', (chunk) => {                    
                    fs.appendFile(path.join(pathToProjectDist, 'style.css'), (separator + '\n\n' + chunk + '\n\n'), (err) => {
                        if (err) throw err
                        console.log(`File "${el}" data was successfully copied to "style.css"`);
                    })
                })
            }
        })
        resolve()
    }))
}

const createHTML = async () => {
    return new Promise((resolve, reject) => fs.writeFile(path.join(pathToProjectDist, 'index.html'), '', (err) => {
        if (err) return reject(err.message)
        console.log('File   "index.html"  was successfully created')
        resolve()
    }))
}


let arr;
const getHTMLtags = async () => {
    return new Promise((resolve, reject) => fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
        if (err) return reject(err.message)
        
        arr = data.toString();
        arr = arr.split("\n"); 
        let headerNum, artNum, footerNum;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].includes('{{header}}')) {
                headerNum = i                
                fs.readFile(path.join(__dirname, 'components', 'header.html'), (err, data) => {
                    if (err) return reject(err.message)
                    arr[i] = data.toString()// + "\n";
                })
            } else if (arr[i].includes('{{articles}}')) {
                artNum = i;
                fs.readFile(path.join(__dirname, 'components', 'articles.html'), (err, data) => {
                    if (err) return reject(err.message)
                    arr[i] = data.toString()// + "\n";
                })
            } else if (arr[i].includes('{{footer}}')) {
                footerNum = i
                fs.readFile(path.join(__dirname, 'components', 'footer.html'), (err, data) => {
                    if (err) return reject(err.message)
                    arr[i] = data.toString()// + "\n";             
                })
            } else if (arr[i].includes('{{about}}')) {
                footerNum = i
                fs.readFile(path.join(__dirname, 'components', 'about.html'), (err, data) => {
                    if (err) return reject(err.message)
                    arr[i] = data.toString()// + "\n";             
                })
            }
        }
        // console.log('headerNum', headerNum)
        // console.log('artNum', artNum)
        // console.log('footerNum', footerNum)
        // console.log(arr);        
        resolve()        
    }))
}

const updateHTML = async () => {
    return new Promise((resolve, reject) => fs.appendFile(path.join(pathToProjectDist, 'index.html'), arr.join("\n"), (err) => {
        if (err) throw err
        console.log(`File  "index.html"  data was successfully updated`);
        resolve()
    }))    
}

// let headerComponent = '', mainComponent = '', footerComponent = '';

// const checkComponents = async (file, component) => {
//     return new Promise((resolve, reject) => fs.access(path.join(__dirname, 'components', file), '', (err) => {
//         if (err) {
//             console.log(err.message)
//             return
//         }
//         component = file;
//         //console.log(`File   "${file}"  exist;`, 'component: ', component);
//         resolve()
//     }))
// }


createPDDir()
    .then(() => createAssetsDir())
    .then(() => copyDirs())
    .then(() => deletePrevFiles())
    .then(() => copyFiles())    
    .then(() => createHTML())
    .then(() => getHTMLtags())
    .then(() => createStyleCss())
    .then(() => readStyleFiles())
    .then(() => updateHTML())








    // .then(() => checkComponents('header.html', headerComponent))
    // .then(() => checkComponents('articles.html', mainComponent))
    // .then(() => checkComponents('about.html', mainComponent))
    // .then(() => checkComponents('footer.html', footerComponent))
   
