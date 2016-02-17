$(document).ready( function() {

var color;
var nightmode = false;
var vibrantmode = true;
var currentFont = 1;

function refreshData() {
    changeColor(getColor(vibrantmode), false);
    
    $("#hex").text(getColor(vibrantmode));

    var currentColor = getColor(false);
    $("#time").text(currentColor.slice(1,3)+":"+currentColor.slice(3,5)+":"+currentColor.slice(5,7));
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
        //calls changeColor so the change feels reponsive
        changeColor(getColor(vibrantmode), true);
    } else if (e.which == 102) {
        // F cycles through the available fonts
        cycleFont(currentFont);
    } else if (e.which == 104) {
        // H toggles the hotkey box
        $("#hotkeys").toggle();
    }
});

function cycleFont() {
    switch(currentFont) {
        case 1:
            currentFont = 2;
            $("#hex").css("font-family", "Aurebesh");
            $("#time").css("font-family",  "Aurebesh");
            break;
        case 2:
            currentFont = 3;
            $("#hex").css("font-family", "VT323");
            $("#time").css("font-family", "VT323");
            break;
        case 3:
            currentFont = 1;
            $("#hex").css("font-family", "UbuntuMono");
            $("#time").css("font-family", "UbuntuMono");
            break;
    }
}

function decimalToHexString(number) {
    if (number < 0)    {
    	number = 0xFFFFFFFF + number + 1;
    }

    return number.toString(16).toUpperCase();
}

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

        h = Math.round(h * 11.09); // converts 0-23 to 0-255
        m = Math.round(m * 4.32);  // converts 0-59 to 0-255
        s = Math.round(s * 4.32);

        h = decimalToHexString(h);
        m = decimalToHexString(m);
        s = decimalToHexString(s);

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
          $("#time").stop().animate({color : '#ffffff'}, {duration: 500, queue: false});
      		$("body").stop().animate({backgroundColor : color}, {duration: 500, queue: false});
    	} else {
          $("#hex").stop().animate({color : color}, {duration: 500, queue: false});
          $("#time").stop().animate({color : color}, {duration: 500, queue: false});
      		$("body").stop().animate({backgroundColor : '#000000'}, {duration: 500, queue: false});
    	}
  } else {
      if (!nightmode){
          $("#hex").animate({color : '#ffffff'}, {duration: 500, queue: false});
          $("#time").animate({color : '#ffffff'}, {duration: 500, queue: false});
          $("body").animate({backgroundColor : color}, {duration: 500, queue: false});
      } else {
          $("#hex").animate({color : color}, {duration: 500, queue: false});
          $("#time").animate({color : color}, {duration: 500, queue: false});
          $("body").animate({backgroundColor : '#000000'}, {duration: 500, queue: false});
      }
  }

}

//Run the script
refreshData();
setInterval(refreshData, 1000);
});
