/*! 
 * greenishColumns: jQuery plugin that allows multicolumn scrolling - v0.0 - alpha (4/29/2011)
 * http://www.philippadrian.com
 * 
 * Copyright (c) 2011 Philipp C. Adrian
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses. 
 */
(function($) {
////////////////////////////////////////////////////////////////////////////////
$.gC = $.fn.greenishColumns = function (opts){
	$.gC.imageLoadTest($("img",this), $(this), function(){
		var cols=$(this),
			col,i,id,
			height=0,
			bodyHeight,
			sort=[],
			data={},
			group={};
			
	//	Order Elements: First ids alphabetical then nonIDs by dom placment.
		for(i=0; i < cols.length ; i++) {
			col=cols.eq(i);
			id=col.attr("id")?":"+(i)+":"+col.attr("id") : "."+(i)+"."+i;
			group[id] = col;	
			sort[i]=id;
		};
		cols=[]
		for(key in sort.sort()) cols[key]=group[sort[key]];
		
		cols[key].addClass("gCLast");
		for(i=0; i < cols.length ; i++) {
			data[i]={},
			col=cols[i];
//			Get content Height
			col.addClass("greenishColumns").wrapInner("<div id=\"gCsize\"/>");
			data[i]["height"]=$("#gCsize").innerHeight();
			$("#gCsize").children().unwrap();
	
//			Set min Scroll Position
			data[i]["minScroll"]=height;
			height+=col.innerHeight()
			col.data("data",data[i]);
			
			col.scrollTop(data[i]["minScroll"]);
			
		}	
		$.gC.refresh();
	});	
	$(window).scroll($.gC.scroll);
	$(window).resize($.gC.refresh);
	$(window).resize($.gC.scroll);
};
$.extend($.gC, {
	scrollTop : 0,

////////////////////////////////////////////////////////////////////////////////
	scroll: function (e) {
		var scrollTop=$(this).scrollTop(),
			columns=$(".greenishColumns"),
			column, data;

		for(i=0; i<columns.length; i++) {
			column=columns.eq(i),
			data=column.data("data");
			column.scrollTop(scrollTop+data.minScroll);
		};
	},
	
////////////////////////////////////////////////////////////////////////////////
	refresh: function (e) {

//		Set body min-height according to last column.
		var columns=$(".gCLast"),
			height=$(window).height(),
			bodyHeight=0,
			body=$("body"),
			column, data, offTop,newBodyHeight;

		for(i=0; i<columns.length; i++) {
			column=columns.eq(i),
			data=column.data("data");

			offTop=column.offset()["top"] - body.scrollTop();
			console.log("+"+offTop, "-"+data.height, "+"+data.minScroll, "-"+height, "-"+offTop, "+"+column.innerHeight());
			newBodyHeight=offTop+(data.height-data.minScroll)+(height+offTop-column.innerHeight());
			console.log(offTop);
			bodyHeight=bodyHeight<newBodyHeight? newBodyHeight:bodyHeight
		}
	
		//if(parseFloat($("body").css("min-height").replace("px","")) < bodyHeight)
			$("body").css("min-height", bodyHeight);
			
		console.log($("body").height());
			
	},
////////////////////////////////////////////////////////////////////////////////
	imageLoadTestInterval:{},
	imageLoadTest: function (images, context, callback) {
		$.gC.imageLoadTestInterval = setInterval(function(){
			var loaded = true;
			images.each(function(){
				if(! $(this).height()){
					loaded = false;
				}
			});
			if(loaded){
				setTimeout(function(){callback.apply(context);},0);
				clearInterval($.gC.imageLoadTestInterval);
			}
		}, 10);
	}
////////////////////////////////////////////////////////////////////////////////
});
})(jQuery);


