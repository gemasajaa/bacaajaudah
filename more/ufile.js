const fs = require('fs');
module.exports = {
	handle(req,res){
		req.on('data',(data)=>{
			this.read(req,res,data);
		})
	},
	read(req,res,data){
		const fdata = JSON.parse(req.headers.filedata);
		fs.appendFile(`./more/private/media/photos/${fdata.fname}`,data,function(err){
			if(err)console.log(err);
			res.send('ok');
		})
	}
}