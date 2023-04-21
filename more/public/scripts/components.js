const header = makeElement('header',{
	style:`
		background:white;
		width:100%;
		display:flex;
		align-items:center;
		justify-content:space-around;
		flex-wrap:wrap;
	`,
	innerHTML:`
		<div
		style="
			padding:10px;
			display:flex;
			align-items:center;
			flex-direction:column;
		"
		>	
			<img src=/file?fn=happy-face.png
			style="
				width:32px;
				height:32px;
			"
			>
			<span
			style="
				font-size:15px;
				color:black;
			"
			>NgomikAjaUdah</span>
		</div>
		<div
		style="
			padding:10px;
			font-size:20px;
			display:flex;
			align-items:center;
		"
		>
		  <div
			style="
			margin-left:10px;
			"
		  >
		    <input
		    style="
		      background:lightgray;
			  
			  padding:10px;
			  border:1.5px solid lightgray;
		    "
		    placeholder='Cari Komik...'
		    ><button
		    style="
		      background:black;
		      color:white;
			  padding:10px;
			  border:1.5px solid black;
			  border-left:0;
		    "
		    >Go</button>
		  </div>
		</div>
	`,
	onadded(){
		searchHandling(this);
	}
});

const searchHandling = function(el){
	el.find('button').onclick = ()=>{
		const input = el.find('input');
		if(input.value!=''){
			const result = [];
			find('header').contentBackup.forEach(item=>{
				if(item.title.toLowerCase().indexOf(input.value)!=-1)result.push(item);
			})
			find('#container').innerHTML = '';
			displayContent(result,true,[0,(result.length-1>20)?20:result.length-1]);
			//handline no result.
			if(result.length===0){
				find('#container').innerHTML = `
					<div
					style="
						display:flex;
						height:100%;
						align-items:center;
					"
					>
						<span
						style="
							padding:10px;
							background:white;
						"
						>Hasil tidak ditemukan!</span>
					</div>
				`
			}
		}else {find('#container').innerHTML = '';displayContent(find('header').contentBackup,false,[0,20])};
	}
}

const category = makeElement('div',{
	id:'category',
	style:`
		background:white;
		color:black;
		width:100%;
		height:10%;
		overflow:auto;
		display:flex;
		font-size:15px;
		align-items:center;
		border-top:1px solid black;
	`,
	onadded(){
		const category = ['List','Rekomendasi','Populer','Riwayat'];
		category.forEach(item=>{
			this.addChild(makeElement('div',{
				style:`
					margin:0 10px;
					cursor:pointer;
				`,
				innerHTML:`
					<span id=${item}>${item}</span>
				`,
				itemTo:item,
				onclick(){
					this.changeCategory();
				},
				changeCategory(){
					find('content').remove();
					find('main').addChild(content(this.itemTo));
				}
			}))
		})
}	
	
})

const content = function(category){
	return makeElement('content',{
		style:`
			background:black;
			height:100%;
			width:100%;
			display:flex;
			align-items:center;
			justify-content:center;
			overflow:auto;
		`,
		onscroll(){
			this.findall('#contentBox').forEach(box=>{
				if(box.getBoundingClientRect().y<-100 || box.getBoundingClientRect().y>this.offsetHeight+100){
					hideElement(box.find('img'));
				}else{
					showElement(box.find('img'))
				}
			})
			this.newContent();
		},
		newContent(){
			if(this.scrollTop+this.offsetHeight===this.scrollHeight){
				if(this.content.load[1]<=this.content.contents.length){
					if(this.content.contents.length-this.content.load[1]>20){
						displayContent(this.content.contents,false,[this.content.load[1]+1,this.content.load[1]+20]);
					}
				}
			}
		},
		onadded(){
			//requesting the content.
			//maybe its should be wait for a minute. i think.
			this.addChild(makeElement('div',{
				id:'container',
				style:`
					width:90%;
					height:90%;
					padding:10px;
					display:flex;
					flex-wrap:wrap;
					justify-content:center;
				`,
			}))
			this.addChild(openLoading('Sedang memuat konten...'));
			const loadingDiv = this.find('#loadingDiv');
			if(category!='Riwayat'){
				cOn.get({
					url:`/file?fn=komik${category}.base&&dir=base`,
					onload(r){
						loadingDiv.remove();
						indicatorWorkingHandle(category);
						displayContent(JSON.parse(r.target.responseText).data,true,[0,20]);
					}
				});
			}else{
				//work with riwayat.
				//open riwayat.
				indicatorWorkingHandle(category);
				const data = (!localStorage['riwayat']?[]:JSON.parse(localStorage['riwayat'])); 
				//JSON.parse(localStorage['riwayat'])||[];
				//handling null.
				if(is_null(data)){
					loadingDiv.remove();
					find('#container').innerHTML = `
						<div
						style="
							display:flex;
							height:100%;
							align-items:center;
						"
						>
							<span
							style="
								padding:10px;
								background:white;
							"
							>Belum ada data!</span>
						</div>
					`;
				}else{
					displayContent(data,true,[0,data.length-1]);
					loadingDiv.remove();
				}
			}
		}
	})
}

const indicatorWorkingHandle = function(category){
	if(find('span.selectedCategory'))find('span.selectedCategory').classList.remove('selectedCategory');
	find(`span#${category}`).classList.add('selectedCategory');
}

const displayContent = function(contents,save=true,load){
	if(save)find('header').contentBackup = contents;
	for(let i=load[0];i<=load[1];i++){
		find('#container').addChild(makeContentBox(contents[i],i));
	}
	find('content').content = {
		contents,
		load
	}
}

const makeContentBox = function(content,index){
	return makeElement('div',{
		id:'contentBox',
		index,
		style:`
			background:white;
			display:flex;
			align-items:center;
			justify-content:center;
			flex-direction:column;
			margin:5px;
			width:200px;
			height:200px;
			cursor:pointer;
		`,
		content,
		innerHTML:`
			<div
			style="
				width:100%;
				display:flex;
				justify-content:center;
				height:100%;
			">
				<img
				src=${content.image||content.thumbnail}
				style="
					object-fit:cover;
					background:white;
					width:200px;
					height:150px;
				"
				>
			</div>			
			<div
			style="
				width:100%;
				height:100%;
				display:flex;
				align-items:center;
				justify-content:center;
				flex-direction:column;
				overflow:auto;
			"
			>
				<span
				style="
				padding:5px;
				width:90%;
				font-weight:bold;
				text-align:center;
				"
				>${content.title.slice(0,30)}...</span>
			</div>
		`,
		onadded(){
			//handling img err,
			this.find('img').onerror = function(){
				this.src = '/file?fn=nofilefound.png';
			}
			this.findall('div').forEach(div=>{
				div.onclick = ()=>{
					getInfo(this.content.endpoint,this.content);
				}
			})
		}
	})
}

const getInfo = function(endpoint,forRiwayat){
	find('main').addChild(openLoading('Sedang memuat data...',(loading)=>{
		cOn.get({
			url:`https://komiku-api.fly.dev/api/comic/info${endpoint}`,
			onload(r){
				loading.remove();
				processLink(this.getJSONResponse().data,forRiwayat);
			}
		})
	}
	))
}

const processLink = function(content,forRiwayat){
  find('main').addChild(makeElement('div',{
    style:`
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:rgb(0,0,0,0.5);
      display:flex;
      align-items:center;
      flex-direction:column;
    `,
    onadded(){
			this.addChild(makeElement('div',{
				removable:this,
				style:`
					background:white;
					border-radius:0 0 10px 10px;
				`,
				id:'bar-video',
				innerHTML:`
					<div
					style="
						padding:20px;
						display:flex;
						justify-content:center;
						align-items:center;
						flex-direction:column;
					"
					>
						<div
						style="
							margin-bottom:10px;
							width:100%;
						"
						>
							<span
							style="
								font-size:20px;
								width:100%;
								text-align:left;
							"
							>${content.title}</span>
						</div>
						<div
						style="
							width:100%;
							display:inline-block;
						"
						>
							<div
							style="
								width:100%;
								position:relative;
								text-align:center;
							"
							>
								<img src=${content.thumbnail}
								style="
									width:200px;
									height:auto;
								">
							</div>
						</div>
						<div
						style="
							width:100%;
							margin-top:10px;
							display:flex;
							align-items:center;
							justify-content:center;
						"
						>
							<div
							style="
								font-weight:bold;
								width:50%;
								overflow:auto;
							"
							>
								<div>
									<span>Rating: ${content.rating}</span>
								</div>
								<div>
									<span>Pengarang: ${content.author}</span>
								</div>
								<div>
									<span>Status: ${content.status}</span>
								</div>
								<div>
									<span>Tipe: ${content.type}</span>
								</div>
								<div>
									<span>Jumlah Chapter: ${content.chapter_list.length}</span>
								</div>
							</div>
							<div
							style="
								width:50%;
								text-align:right;
								display:flex;
								justify-content:flex-end;
								align-items:center;
								flex-wrap:wrap;
							"
							>
								<span
								style="
									padding:10px;
									background:black;
									color:white;
									border-radius:5px;
									cursor:pointer;
									margin-right:10px;
								"
								id=readToogle
								>Baca</span>
								<span
								style="
									padding:10px;
									background:black;
									color:white;
									border-radius:5px;
									cursor:pointer;
								"
								id=closeToogle
								>Tutup</span>
							</div>
						</div>
					</div>
				`,
				onadded(){
					this.find('#readToogle').onclick = ()=>{
						openReader(content);
						saveData(forRiwayat);
					}
					this.find('#closeToogle').onclick = ()=>{
						this.removable.remove();
					}
				}
			}))
    }
  }))
}

const saveData = function(content){
	const data = (!localStorage['riwayat']?[]:JSON.parse(localStorage['riwayat']));
	//check includes one.
	const titleList = [];
	data.forEach(item=>{titleList.push(item.title)});
	if(!titleList.includes(content.title)){
		data.push(content);
		localStorage['riwayat'] = JSON.stringify(data);
	}
}

const openReader = function(content){
	find('main').addChild(makeElement('div',{
		style:`
			position:absolute;
			width:100%;
			height:100%;
			background:rgb(0,0,0,0.5);
			top:0;
			left:0;
			display:flex;
			justify-content:center;
		`,
		innerHTML:`
			<div
			id='readerBox'
			style="
				background:white;
				height:100%;
				display:flex;
				flex-direction:column;
			"
			>
				<div
				style="
					height:10%;
					width:100%;
					border-bottom:1px solid black;
					display:flex;
					justify-content:flex-start;
					align-items:center;
					overflow:auto;
				"
				id="chapter"
				>
					
				</div>
				<div
				style="
					height:80%;
					width:100%;
					border-bottom:1px solid black;
					display:flex;
					flex-direction:column;
					justify-content:flex-start;
					align-items:center;
					overflow:auto;
				"
				id='imgbox'
				>
					
				</div>
				<div
				style="
					height:10%;
					width:100%;
					display:flex;
					align-items:center;
					justify-content:center;
				"
				id=closeToogle
				>
					<span
					style="
						padding:10px;
						background:black;
						cursor:pointer;
						color:white;
					"
					>Tutup</span>
				</div>
			</div>
		`,
		onadded(){
			const parent = this;
			//handling close button.
			this.find('#closeToogle').onclick = ()=>{this.remove()}
			//display chapter.
			const chapterDisplay = (imgs)=>{
				const imgbox = this.find('#imgbox');
				imgbox.innerHTML = '';
				imgs.forEach(img=>{
					imgbox.appendChild(makeElement('div',{
						style:`
							background:black;
							max-width:90%;
							margin-bottom:10px;
						`,
						innerHTML:`
							<img src=${img}
							style="
								max-width:100%;
								max-height:100%;
								object-fit:cover;
							">
						`
					}))
				})
			}
			//work on chapter.
			for(let i=content.chapter_list.length-1;i>=0;i--){
				this.find('#chapter').appendChild(makeElement('div',{
					style:`
						text-align:center;
						padding:10px;
					`,
					innerHTML:`
						<span
						style=display:inline-block;font-size:11px;cursor:pointer;
						>${content.chapter_list[i].name}</span>
					`,
					endpoint:content.chapter_list[i].endpoint,
					onclick(){
						const loading = openLoading('Memuat Kontent...');
						find('main').addChild(loading);
						cOn.get({
							url:`https://komiku-api.fly.dev/api/comic/chapter${this.endpoint}`,
							onload(){
								chapterDisplay(this.getJSONResponse().data.image);
								loading.remove();
							}
						});
						//handle clicked.
						this.handleClickedChapter();
					},
					handleClickedChapter(){
						parent.findall('span').forEach(span=>{
							span.classList.remove('selectedCategory');
						});
						this.find('span').classList.add('selectedCategory');
					}
				}));
			}
			this.find('#chapter div').click();
		}
	}))
}

const openLoading = function(loadingmsg,added){
	return makeElement('div',{
		id:'loadingDiv',
		style:`
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
			background:rgb(0,0,0,0.5);
			display:flex;
			align-items:center;
			justify-content:center;
		`,
		innerHTML:`
			<div
			style="
				background:white;
				padding:10px;
			"
			>
				<span>${loadingmsg}</span>
			</div>
		`,
		onadded(){
			if(added)added(this);
		}
	})
}
























