const view = require('./view.js');
const fm = require('./fileH.js');
//const showContentHandle = require('./showContentHandler');
//const showSrcReq = require('./showSrc');
module.exports = [
	{
		mM:'get',
		'/'(req,res){
			view.go('app',req,res);
		}
	},
	{
		mM:'get',
		'/scripts'(req,res){
			fm.do(req,res);
		}
	},
	{
		mM:'get',
		'/file'(req,res){
			fm.do(req,res);
		}
	}
];
