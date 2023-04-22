document.body.onload = function(){
	document.body.style.margin = '0';
	const main = makeElement('main',{
		style:`
			display:flex;
			width:100%;
			height:100%;
			background:teal;
			position:absolute;
			flex-direction:column;
			font-family:monospace;
			align-items:center;
		`,
		onadded(){
			this.addChild(header);
			this.addChild(category);
			this.addChild(content('List'));
			this.addChild(makeElement('div',{
				id:'anouncePop',
				style:`
					position:absolute;
					width:100%;
					height:100%;
					background:rgb(0,0,0,0.5);
					display:flex;
					justify-content:center;
					align-items:flex-start;
				`,
				innerHTML:`
					<div
					id=anouncebox
					style="
						background:white;
						padding:20px;
					"
					>
						<div
						style=font-size:20px;
						>
							<span>Selamat Datang Di BacaAjaUdah!</span>
						</div>
						<div
						style=margin-top:12px;
						>	
							<div>
								<span>Web ini dijual!<br>
									Web sudah playable, memiliki banyak kontent. <br>Kontent akan bertambah. Secara otomatis.<br>
									Jika tertarik silahkan hubungi saya, tenang harga terjangkau.
								</span>
							</div>
							<div
							style="
								margin-top:10px;
							"
							>
								<span>
									Terimakasih, tertanda Gema.
								</span>
							</div>
						</div>
						<div
						style="
							margin-top:20px;
							text-align:right;
							margin-bottom:10px;
						"
						>
							<span id=donationbutton
							style="
								background:Black;
								padding:10px;
								color:white;
								cursor:pointer;
							">Donasi</span>
							<span id=buttonclose
							style="
								background:Black;
								padding:10px;
								color:white;
								cursor:pointer;
							">Lanjutkan</span>
						</div>
					</div>
				`,
				onadded(){
					this.find('#buttonclose').onclick = function(){
						find('#anouncePop').remove();
					};
					this.find('#donationbutton').onclick = function(){
						open(find('header').donationLink,'_blank');
					}
				}
			}))
		}
	})
	document.body.addChild(main);
}
