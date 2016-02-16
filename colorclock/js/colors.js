$(document).ready( function() {

function refreshData() {

    x = 1;  // x = seconds
 	var d = new Date()
 	var h = d.getHours();
 	var m = d.getMinutes();
 	var s = d.getSeconds();
 	
 	if (h<=9) {h = '0'+h};
 	if (m<=9) {m = '0'+m};
	if (s<=9) {s = '0'+s};
	
 	var	color = '#'+h+m+s;
 	
    changeColor(color);
    $("#hex").text(color);
     
    setTimeout(refreshData, x*1000);
}
  
var nightmode = false;
  
refreshData(); // execute function

$(document).keypress(function(e) {
	if (e.which == 110) {
		//switch to night mode or back
		nightmode = !nightmode;
	}
});

function changeColor(color) {
	if (!nightmode){
		$("body").animate({backgroundColor : color}, 500);
		$("#hex").animate({color : '#ffffff'}, 500);
	} else {
		$("body").animate({backgroundColor : '#000000'}, 500);
		$("#hex").animate({color : color}, 500);
	}
	
}

});
