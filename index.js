var fs=require('fs'), marked=require('marked'), yaml=require('js-yaml'), hljs=require('highlight.js');

//data=fs.readFileSync('contents/index.yaml', 'utf8');
//console.log(JSON.stringify(yaml.safeLoad(data), "", 2));

data = fs.readFileSync('contents/1. Старт/PP-OD.md', 'utf8').split('---');
meta = yaml.safeLoad(data[1]);
text = marked(data[2]);
console.log(meta);
console.log(text);