const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const scssDir = path.join(__dirname, '../scss/object/page/');
const cssDir = path.join(__dirname, '../htdocs/aruda/assets/css/page/');

// CSS出力先ディレクトリを作成
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}

// 再帰的にSCSSファイルを取得する関数
function getAllScssFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      // ディレクトリの場合は再帰的に探索
      results = results.concat(getAllScssFiles(filePath));
    } else if (file.endsWith('.scss')) {
      // .scssファイルの場合はリストに追加
      results.push(filePath);
    }
  });

  return results;
}

// SCSSファイルを取得
const scssFiles = getAllScssFiles(scssDir);

scssFiles.forEach((inputFile) => {
  // 入力ファイルに対応する出力ファイルのパスを生成
  const relativePath = path.relative(scssDir, inputFile);
  const outputFile = path.join(cssDir, relativePath.replace('.scss', '.css'));

  // 出力先のディレクトリを作成（必要に応じて）
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // node-sassで個別コンパイル
  const command = `node-sass --output-style expanded ${inputFile} ${outputFile}`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error compiling ${inputFile}:`, stderr);
    } else {
      console.log(`Compiled ${inputFile} to ${outputFile}`);
    }
  });
});
