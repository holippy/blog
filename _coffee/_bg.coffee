class window.BgAnime
	constructor: (data)->

		###
		svgData 読み込むsvgデータのパスを配列で取得
		svgDataLength svnDataのlengthをキャッシュ
		loadCounter svgデータ読み込み用カウンター初期値は0
		###
		@svgData = data
		@svgDataLength = data.length
		@loadCounter = 0


	###
	svgデータを先読み
	先読みが済んだらsetItemsへ
	###

	svgLoad : ()->
		that = @
		
		for val, i in @svgData
			(->
				item = new Image
				item.src = val
				$(item).on 'load', ()=>
					that.loadCounter = that.loadCounter + 1
					console.log that.loadCounter

					if that.loadCounter is that.svgDataLength
						that.setItems()
			)()

	###
	###

	setItems : ()->
		that  = @

		for val, i in @svgData
			$('body').append("""<figure class="svg#{i+1}"><img src="#{val}"></figure>""")
