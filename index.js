var fs=require('fs'), yaml=require('js-yaml'), marked=require('marked'), hljs=require('highlight.js');
var post_templ = 'post.us', in_dir = 'contents/', out_dir='production/';
post_templ = fs.readFileSync('templates/'+post_templ, 'utf8');

var data=yaml.safeLoad(fs.readFileSync('contents/index.yaml', 'utf8'));

String.prototype.prettify = function() { return this.replace(/ - /g, '&nbsp;&mdash; ').replace(/"([^"]*)"/g, '&laquo;$1&raquo;'); }

var processPost = function(path) {
	var data = fs.readFileSync(in_dir+path+'.md', 'utf8').split('---');
	var post = {meta: yaml.safeLoad(data[1]), text: marked(data[2].prettify())};
	console.log('Processing: '+post.meta.title);

	post.html = post_templ.replace(/<%title%>/g, post.meta.title).replace(/<%content%>/g, post.text);
	post.name = post.meta.url+'.htm';

	fs.writeFileSync(out_dir+post.name, post.html);
	return {link: post.name, title: post.meta.title};
}

function iterate_index(path, obj, make_level)
{
	var index = "";
	for(var i in obj)
	{
		if(typeof obj[i] != 'string')
			index += Array.isArray(obj[i]) ? i + '\r\n<ol>\r\n' + iterate_index(path + i + '/', obj[i]) + '</ol>\r\n' : iterate_index(path, obj[i]);
		else
		{
			obj[i] = processPost(path + obj[i]);
			index += '<li>' + obj[i].title + '</li>\r\n';
		}
	}
	return index;
}

var index = iterate_index('', data.Index);

console.log(JSON.stringify(data, '', 4))
console.log(index);