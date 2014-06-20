var fs=require('fs'), marked=require('marked'), yaml=require('js-yaml'), hljs=require('highlight.js');
var post_templ = 'post.us', in_dir = 'contents/', out_dir='production/';
post_templ = fs.readFileSync('templates/'+post_templ, 'utf8');

//data=fs.readFileSync('contents/index.yaml', 'utf8');
//console.log(JSON.stringify(yaml.safeLoad(data), "", 2));

processPost = function(path) {
	post = {};
	post.data = fs.readFileSync(in_dir+path, 'utf8').split('---');
	post.meta = yaml.safeLoad(post.data[1]);
	post.text = marked(post.data[2]).replace(new RegExp('-', 'g'), '&ndash;').replace(new RegExp(' &ndash; ', 'g'), ' &mdash; ');

	post.html = post_templ.replace(new RegExp('<%title%>', 'g'), post.meta.title).replace('<%content%>', post.text);
	post.name = post.meta.url+'.htm';

	fs.writeFile(out_dir+post.name, post.html);
}

processPost('1. Старт/PP-OD.md');