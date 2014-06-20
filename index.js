var fs=require('fs'), marked=require('marked'), yaml=require('js-yaml'), hljs=require('highlight.js');
var post_templ = 'post.us', in_dir = 'contents/', out_dir='production/';
post_templ = fs.readFileSync('templates/'+post_templ, 'utf8');

//data=fs.readFileSync('contents/index.yaml', 'utf8');
//console.log(JSON.stringify(yaml.safeLoad(data), "", 2));

String.prototype.prettify = function() { return this.replace(/ - /g, '&nbsp;&mdash; ').replace(/"([^"]*)"/g, '&laquo;$1&raquo;'); }

processPost = function(path) {
	data = fs.readFileSync(in_dir+path, 'utf8').split('---');
	post = {meta: yaml.safeLoad(data[1]), text: marked(data[2].prettify())};

	post.html = post_templ.replace(/<%title%>/g, post.meta.title).replace(/<%content%>/g, post.text);
	post.name = post.meta.url+'.htm';

	fs.writeFile(out_dir+post.name, post.html);
}

processPost('1. Старт/PP-OD.md');