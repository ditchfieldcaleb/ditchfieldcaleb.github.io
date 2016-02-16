$(document).ready( function() {

var color;
var nightmode = false;
var vibrantmode = false;

function refreshData() {
    changeColor(getColor(vibrantmode));
    $("#hex").text(getColor(false));
    setTimeout(refreshData, 1000);
  }

$(document).keypress(function(e) {
  if (e.which == 110) {
    // N toggles night-mode
		nightmode = !nightmode;
    //call changeColor so the change feels responsive
    changeColor(color);
	} else if (e.which == 118) {
    // V toggles vibrant-mode (full-range color)
    vibrantmode = !vibrantmode;
  }
});

function getColor(vibrantMode) {
  var d = new Date()
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();

  if (h<=9) {h = '0'+h};
  if (m<=9) {m = '0'+m};
  if (s<=9) {s = '0'+s};

  if (vibrantMode) {
    //Vibrant mode - convert to full-range colors & return

  } else {
    //Not vibrant mode - return limited range colors.
    return '#'+h+m+s;
  }
}

function changeColor(color) {
	if (!nightmode){
		$("body").animate({backgroundColor : color}, 500);
		$("#hex").animate({color : '#ffffff'}, 500);
	} else {
		$("body").animate({backgroundColor : '#000000'}, 500);
		$("#hex").animate({color : color}, 500);
	}

}

// Run the script.
refreshData(); // execute function
});
