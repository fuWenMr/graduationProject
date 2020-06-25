const cp = require('child_process');
// Ugulify
const process = require('process');
var fs = require('fs');

const cwd = process.cwd();
const staticPath = cwd + '\\build\\static';
const jsPath = staticPath + '\\js';

console.log('工作目录为', cwd);
console.log('build目录为', staticPath);

try {
  cp.execSync(`md minJs`, {
    cwd: staticPath,
  });
  console.log('目录创建成功');
} catch(e) {
  console.log('目录可能已经存在');
}



let files = fs.readdirSync(jsPath);

files.forEach((fileName) => {
  const t = fileName.split('.');
  if (t[t.length - 1] === 'js') {
    console.log(fileName);
    cp.execSync(`uglifyjs ./js/${fileName} -o ./minJs/${fileName} -c`, {
      cwd: staticPath,
    });
    console.log(fileName, '压缩完成');
  }
});




// var join = require('path').join;
 
// function getJsonFiles(jsonPath){
//     let jsonFiles = [];
//     function findJsonFile(path){
//         let files = fs.readdirSync(path);
//         files.forEach(function (item, index) {
//             let fPath = join(path,item);
//             let stat = fs.statSync(fPath);
//             if(stat.isDirectory() === true) {
//                 findJsonFile(fPath);
//             }
//             if (stat.isFile() === true) { 
//               jsonFiles.push(fPath);
//             }
//         });
//     }
//     findJsonFile(jsonPath);
//     console.log(jsonFiles);
// }
 



