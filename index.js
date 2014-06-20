var fs=require('fs'), marked=require('marked'), yaml=require('js-yaml'), hljs=require('highlight.js');
var post_templ = 'post.us', in_dir = 'contents/', out_dir='production/';
post_templ = fs.readFileSync('templates/'+post_templ, 'utf8');

//data=fs.readFileSync('contents/index.yaml', 'utf8');
//console.log(JSON.stringify(yaml.safeLoad(data), "", 2));

String.prototype.prettify = function(text) {
	var a = 1;
	return  this.replace(new RegExp('-', 'g'), '&ndash;')
				.replace(new RegExp(' &ndash; ', 'g'), '&nbsp;&mdash; ')
				.replace(new RegExp('&quot;', 'g'), function() {
					return (a++%2 ? '&laquo;' : '&raquo;');
				});
}

processPost = function(path) {
	post = {};
	post.data = fs.readFileSync(in_dir+path, 'utf8').split('---');
	post.meta = yaml.safeLoad(post.data[1]);
	post.text = marked(post.data[2]).prettify();

	post.html = post_templ.replace(new RegExp('<%title%>', 'g'), post.meta.title).replace('<%content%>', post.text);
	post.name = post.meta.url+'.htm';

	fs.writeFile(out_dir+post.name, post.html);
}

processPost('1. Старт/PP-OD.md');