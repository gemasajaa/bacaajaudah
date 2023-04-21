const fs = require('fs');
const fileTypeHandler = require('./fileTypeHandler');
module.exports = {
	do(req,res){
		this[req.path](req.query.fn,res,req.query.dir);
	},
	"/scripts"(fn,res){
		res.file(`./more/public/scripts/${fn}.release.js`)
	},
	"/styles"(fn,res){
		res.file(`./more/public/styles/${fn}.release.css`);
	},
	"/file"(fn,res,cDir='public/media'){
		//handline filetype.
		res.file(`./more/${cDir}/${fn}`,{'content-type':'image/png'});
	}
}