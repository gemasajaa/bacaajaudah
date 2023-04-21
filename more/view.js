const iModule = require('./iModule');
const template = require('./template');
module.exports = {
	go(scene,req,res){
		res.string(template[scene]());
	}
}