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
		id=col.attr("id")?":"+(i)+":"+col.attr("id") : "."+(i)+"."+i;
		group[id] = col;	
		sort[i]=id;
	};
	cols=[]
	for(key in sort.sort()) cols[key]=group[sort[key]];
	
	for(i=0; i < cols.length ; i++) {
		data[i]={};
		col=cols[i];
//		Get content Height
		col.addClass("greenishColumns").wrapInner("<div id=\"gCsize\"/>");
		data[i]["height"]=$("#gCsize").innerHeight();
		$("#gCsize").children().unwrap();

//		Set min Scroll Position
		data[i]["minScroll"]=height;
		height+=col.innerHeight()
		col.data("data",data[i]);
		
		col.scrollTop(data[i]["minScroll"]);
	}

//	Set body min-height according to last column.
	i=cols.length-1;
	bodyHeight=cols[i].offset()["top"]+(data[i].height-data[i].minScroll)+($(window).height()-cols[i].offset()["top"]-cols[i].innerHeight());
	if(parseFloat($("body").css("min-height").replace("px","")) < bodyHeight)  
		$("body").css("min-height", bodyHeight);

	
	$(window).scroll($.gC.scroll);
	$(window).resize($.gC.scroll);
	
};
$.gC = $().greenishColumns;
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
	}
////////////////////////////////////////////////////////////////////////////////
});
})(jQuery);


