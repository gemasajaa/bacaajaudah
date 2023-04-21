//const dog = require('./dog');
const fs = require('fs');
module.exports = async function(req,res){
	fs.readFile(`./more/base/movies${req.query.category}.list`,(err,data)=>{
		if(err)throw err;
		res.send(data.toString());
	})
}