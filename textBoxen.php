<?
class textBoxen {
	public $boxes=array();
	static function head() {
		return "
		<style type=\"text/css\">
			body {	font-size:12px;
					margin:0px;
					padding:0px;
					}
			.textBox_top {	position:fixed;
							overflow:hidden;
							margin:0px;
							padding:2px 0px 2px 0px;
						}
			
			.textBox_bot {	position:absolute;
							border:0px;
							color:#EEEEEE;
							margin:0px;
							padding:0px;
							overflow:hidden;
							visibility:hidden;
						}
		</style>
		<script type=\"text/javascript\">
			var scrollPosition=0;
			var windowHeight=0;
			var maxHeight=0;
			function getWindowConstants() {
				if(window.pageYOffset) scrollPosition = window.pageYOffset;
				else if(document.documentElement && document.documentElement.scrollTop) scrollPosition = document.documentElement.scrollTop;
				else if(document.body && document.body.scrollTop) scrollPosition = document.body.scrollTop;
				else scrollPosition = 0;
				
				if(window.innerHeight) windowHeight = window.innerHeight;
				else if(document.documentElement && document.documentElement.offsetHeight) windowHeight = document.documentElement.offsetHeight;
				else if(document.body && document.body.offsetHeight) windowHeight = document.body.offsetHeight;
				else windowHeight = 0;
			}
			function scrollTextbox(Id, Add) {
				if(!document.getElementById(Id)) return;
				document.getElementById(Id).scrollTop = scrollPosition+Add;
				if(document.getElementById(Id+'_bot')) document.getElementById(Id+'_bot').style.paddingBottom = windowHeight-document.getElementById(Id).offsetTop-parseInt(document.getElementById(Id).style.height.replace(/px/g, ''))+'px';
				//if((document.getElementById(Id).scrollTop-Add) < scrollPosition && maxHeight == 0)  maxHeight =(scrollPosition+document.getElementById(Id).style.paddingBottom);
				//if(document.getElementById(Id+'_bot') && maxHeight > 0) document.getElementById(Id+'_bot').style.height = (maxHeight+Add)+'px';
			}
			
		</script>";
	}
	function foot() {
		$return="
		<script type=\"text/javascript\">
			function scrollTextboxen() {
				getWindowConstants();\n";
		foreach($this->boxes as $id => $constants) $return.="scrollTextbox('".$constants["id"]."',".$constants["scrollStart"].");\n";		
		$return.="
			}
 		</script>";
		return $return;
	
	}
	function box($id, $constants, $content, $scroll=true) {
		$border=substr($constants["border"],0,-strlen(strchr($constants["border"],"p")));
		$return="<div class=\"textBox_top\" name=\"textBox".$constants["id"]."\" id=\"".$constants["id"]."\">".$content."</div>";
		if($scroll==="last") $return.="<div class=\"textBox_bot\" name=\"textBox".$constants["id"]."\" id=\"".$constants["id"]."_bot\">".str_replace(array("name", "<form","<input"), array("1234","<blab","<blubt"),$content)."</div>";
		if($scroll) array_push($this->boxes, $constants);
		return $return;
	}
	function newBox() {
		return new textbox($this);
	}
}

class textBox {
	private $parent;
	public $boxes=array();
	public $content;
	public $border="0px";

	function __construct($parent) {
		$this->parent=$parent;
	}	
	
	function setBox($id,$h,$w,$x,$y,$border=false, $zIndex=2,  $margin="0") {
		if(!$border) $border=$this->border;
		$scrollStart=0;
		foreach($this->{boxes} as $boxId => $constants) $scrollStart+=$constants["h"]+$constants["border"];
		$this->parent->{boxes}[]=$this->{boxes}[$id]=array("id"=>$id,"boxIndex"=>(count($this->boxes)+1),"h"=>$h,"w"=>$w,"x"=>$x,"y"=>$y,"zIndex"=>$zIndex, "border"=>$border, "margin"=>$margin, "scrollStart"=>$scrollStart);
		
	}

	function printBoxes() {
		foreach ($this->{boxes} as $id => $constants) if($constants["boxIndex"]== count($this->boxes)) $content.=$this->parent->box($id, $constants, $this->content, "last");
			else $content.=$this->parent->box($id, $constants, $this->content);
		return $content;
	}
}
?>