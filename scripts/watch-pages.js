const fs = require('fs');
const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

const scssDir = path.join(__dirname, '../scss/object/page/');
const cssDir = path.join(__dirname, '../htdocs/aruda/assets/css/page/');

// SCSSをコンパイルする関数
const compileFile = (filePath) => {
  // 出力先ファイルのパスを生成
  const relativePath = path.relative(scssDir, filePath);
  const outputFile = path.join(cssDir, relativePath.replace('.scss', '.css'));

  // 出力先ディレクトリを作成（必要に応じて）
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // node-sassでコンパイル
  const command = `node-sass --output-style expanded ${filePath} ${outputFile}`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error compiling ${filePath}:`, stderr);
    } else {
      console.log(`Compiled ${filePath} to ${outputFile}`);
    }
  });
};

// ファイル監視
chokidar
  .watch(`${scssDir}**/*.scss`) // サブディレクトリを含むすべての.scssファイルを監視
  .on('change', (filePath) => {
    compileFile(filePath);
  })
  .on('add', (filePath) => {
    console.log(`File added: ${filePath}`);
    compileFile(filePath);
  })
  .on('unlink', (filePath) => {
    console.log(`File removed: ${filePath}`);
  });
