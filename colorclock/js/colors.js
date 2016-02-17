$(document).ready( function() {

var color;
var nightmode = false;
var vibrantmode = true;

function refreshData() {
    changeColor(getColor(vibrantmode), false);
    $("#hex").text(getColor(false));
}

$(document).keypress(function(e) {
    if (e.which == 110) {
        // N toggles night-mode
      	nightmode = !nightmode;
        //call changeColor so the change feels responsive
        changeColor(getColor(vibrantmode), true);
    } else if (e.which == 118) {
        // V toggles vibrant-mode (full-range color)
        vibrantmode = !vibrantmode;
        //calle changeColor so the change feels reponsive
        changeColor(getColor(vibrantmode), true);
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

        h = Math.round(h * 11.09) // converts 0-23 to 0-255
        m = Math.round(m * 4.32)  // converts 0-59 to 0-255
        s = Math.round(s * 4.32)

        return '#'+h+m+s;
    } else {
      //Not vibrant mode - return limited range colors.
        return '#'+h+m+s;
    }
}

function changeColor(color, stopOthers) {
  if (stopOthers) {
      if (!nightmode){
          $("#hex").stop().animate({color : '#ffffff'}, {duration: 500, queue: false});
      		$("body").stop().animate({backgroundColor : color}, {duration: 500, queue: false});
    	} else {
          $("#hex").stop().animate({color : color}, {duration: 500, queue: false});
      		$("body").stop().animate({backgroundColor : '#000000'}, {duration: 500, queue: false});
    	}
  } else {
      if (!nightmode){
          $("#hex").animate({color : '#ffffff'}, {duration: 500, queue: false});
          $("body").animate({backgroundColor : color}, {duration: 500, queue: false});
      } else {
          $("#hex").animate({color : color}, {duration: 500, queue: false});
          $("body").animate({backgroundColor : '#000000'}, {duration: 500, queue: false});
      }
  }

}

//Run the script
refreshData();
setInterval(refreshData, 1000);
});
