Array.prototype.getRandom = function(){
	return this[Math.floor(Math.random()*this.length)];
}
JSON.toEncoded = function(obj){
	let string = '';
	for(let i in obj){
		string += `${i}=${obj[i]}&&`;
	}
	return string;
}
//Object.prototype.len = function(){
//	let x = 0;
//	for(let i in this){x++}
//	return x-2;
//}
//Object.prototype.forEach = function(callback){
//	let i = 0;
//	for(let key in this){
//		callback(this[key],i);
//		i++;
//	}
//}
//Object.prototype.isVector = function(){
//	if(
//		this.x && typeof this.x === 'number' &&
//		this.y && typeof this.y === 'number'
//		)return true;
//	return false;
//}
//Object.prototype.VSubstract = function(vector){
//	if(this.isVector()){
//		return {x:this.x-vector.x,y:this.y-vector.y}
//	}
//}
//Object.prototype.getVector = function(){
//	if(this.isVector()){
//		const x = this.x;
//		const y = this.y;
//		return {x,y};
//	}return null;
////}
//Object.prototype.moveTo = function(vector){
//	if(this.isVector()){
//		const nvector = this.VSubstract(vector);
//		const theta = Math.atan2(nvector.y,nvector.x);
//		this.x += Math.cos(theta);
//		this.y -= Math.sin(theta);
//		return this.getVector();
//	}return false;
//}
//Object.prototype.sameVector = function(vector){
//	if(this.isVector()&&vector.isVector()){
//		if(Math.round(this.x) === Math.round(vector.x) && Math.round(this.y) === Math.round(vector.y))return true;
//		return false;
//	}
//}
const vector2 = function(x=0,y=0){
	return {x,y};
}
const forIn = function(n,f){
	for(let i=0;i<n;i++)if(f)f(i);
}
const getRad = function(n){return n*Math.PI/180}
const vector2Dir = function(v1,v2){
	return Math.atan2(v2.x-v1.x,v2.y-v1.y);
}
const transformV = function(v1,v2){
	return vector2(v2.x-v1.x,v2.y-v1.y);
}
const getMagnitude = function(vector){
	return Math.hypot(vector.x,vector.y);
}
const random = function(len,min=0){
	return Math.floor(Math.random()*len)+min;
}
const find = function(p){
	return document.querySelector(p);
}
const findall = function(p){
	return document.querySelectorAll(p);
}
const flex = {
	components:[]	
}
const makeElement = function(name,optional={}){
	Object.assign(optional,{
		find(p){
			return this.querySelector(p);
		},
		findall(p){
			return this.querySelectorAll(p);
		},
		addChild(child){
			this.appendChild(child);
			flex.components.push(child);
			if(child.onstyling)child.onstyling();
			if(child.onadded)child.onadded();
		},
		show(setting='block'){
			if(this.style.display === 'none' || this.style.display === ''){
				this.style.display = setting; 
			}
		},
		hide(){
			if(this.style.display !== 'none' || this.style.display !== ''){
				this.style.display = 'none';
			}
		},
		saveRemove(p){
			const el = this.find(p);
			if(el)el.remove();
		}
	})
	return Object.assign(document.createElement(name),optional);
}
document.body.addChild = function(child){
	this.appendChild(child);
	if(child.onstyling)child.onstyling();
	if(child.onadded)child.onadded();
}

window.onresize = function(e){
	flex.components.forEach(component=>{
		if(component.onscreenChange)component.onscreenChange(e);
	})
}
const cOn = {
	x:new XMLHttpRequest(),
	init(){
		this.x.someSettings = [];
		this.x.getJSONResponse = ()=>{
		  return JSON.parse(this.x.responseText);
		}
	},
	post(config){
		this.init();
		Object.assign(this.x,config);
		this.x.open('POST',config.url);
		if(this.x.someSettings.length>0){
			this.x.someSettings.forEach(x=>{
				this.x[x[0]](x[1],[x[2]]);
			});
		}
		this.x.send(config.data);
	},
	get(config){
		this.init();
		Object.assign(this.x,config);
		this.x.open('GET',config.url);
		this.x.send();
	}
}
const uploadFile = function(type='readAsArrayBuffer',file,transferRate=1000,progress,callback,dataoptional={}){
	const fs = new FileReader();
	fs.onload = function(){
		const data = this.result;
		let uploaded = 0;
		let uploadedf = false;
		const send = function(){
			let start = uploaded;
			let end = start+transferRate;
			if(end>data.byteLength){
				end = end-(end-data.byteLength);
				uploadedf = true;
			}
			let chunk = data.slice(start,end);
			cOn.post({
				url:'/upload',
				someSettings:[['setRequestHeader','content-type','application/octet-stream'],
					['setRequestHeader','filedata',JSON.stringify(Object.assign({
						fname:file.name
					},dataoptional))],
				],
				data:chunk,
				onload(response){
					uploaded += chunk.byteLength;
					progress(uploaded);
					if(uploadedf){
						callback(response);
					}else send();
				}
			})
		}
		send();
		
	}
	fs[type](file);
}
const readFile = function(src,readMode,callback){
	const fr = new FileReader();
	fr[readMode](src);
	fr.onloadend = function(){
		callback(this.result);
	}
}
const showElement = function(el,displaymode='flex'){
	el.style.display = displaymode;
}
const hideElement = function(el){
	el.style.display = 'none';
}
const getTime = function(){
	return new Date().getTime();
}
const OBJevaluate = function(obj){
  const newObj = {};
  for(let i in obj){
    if(obj[i]){
      newObj[i] = obj[i];
    }
  }
  return newObj;
}

const imgErrHandler = function(){
	console.log(this);
}

const is_null = function(arr){
	return arr.length === 0;
}