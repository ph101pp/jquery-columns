/*! 
 * greenishColumns: jQuery plugin that allows multicolumn scrolling - v0.0 - alpha (4/29/2011)
 * http://www.philippadrian.com
 * 
 * Copyright (c) 2011 Philipp C. Adrian
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses. 
 */
;(function($) {
////////////////////////////////////////////////////////////////////////////////
$.fn.greenishColumns = function (opts){
	var cols=$(this),
		col,i,id,height=0,bodyHeight,
		sort=[],
		data={},
		group={};
		
	

//	Order Elements: First ids alphabetical then nonIDs by dom placment.. and the whole thing in revers for later calculations.
	for(i=0; i < cols.length ; i++) {
		col=cols.eq(i);
		id=col.attr("id")?":"+(cols.length-i)+":"+col.attr("id") : "."+(cols.length-i)+"."+i;
		group[id] = col;	
		sort[i]=id;
	};
	cols=[]
	for(key in sort.sort()) cols[key]=group[sort[key]];
	

	for(i=0; i < cols.length ; i++) {
		data[i]={};
		col=cols[i];
//		Get content Height
		col
			.addClass("greenishColumns")
			.wrapInner("<div id=\"gCsize\"/>");
		
		data[i]["height"]=$("#gCsize").innerHeight();
		
		$("#gCsize")
			.children()
			.unwrap();
			
		data[i]["maxScroll"]=data[i]["height"]-height;
		height+=col.innerHeight();
	}
	height=0;
	for(i=cols.length-1; i >=0 ; i--) {
		col=cols[i];
		col.scrollTop(height);
		data[i]["minScroll"]=height;
		height+=col.innerHeight()
		col.data("data",data[i]);
	}

//	Set body min-height if its the last column.
	bodyHeight=cols[0].offset()["top"]+(data[0].height-data[0].minScroll)+($(window).height()-cols[0].offset()["top"]-cols[0].innerHeight());
	if(parseFloat($("body").css("min-height").replace("px","")) < bodyHeight)  
		$("body").css("min-height", bodyHeight);



	
	$(document).scroll($.gC.scroll);
	
};
$.gC = $().greenishColumns;
$.extend($.gC, {
	scrollTop : 0,

////////////////////////////////////////////////////////////////////////////////
	scroll: function (e) {
		var scrollTop=$(this).scrollTop(),
			scrolled=scrollTop-$.gC.scrollTop,
			columns=$(".greenishColumns"),
			column, data
			;
			
		$.gC.scrollTop=scrollTop;
		
		for(i=0; i<columns.length; i++) {
			column=columns.eq(i),
			data=column.data("data");
			scrollTop=column.scrollTop()+scrolled;

			if(scrollTop < data.minScroll) scrollTop=data.minScroll;
			else if(scrollTop > data.maxScroll) scrollTop=data.minScroll;
			
			column.scrollTop(scrollTop);
		};
	
	
	}
////////////////////////////////////////////////////////////////////////////////
});
})(jQuery);


