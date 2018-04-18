// animate the banner
function nudge() {
  var stage = document.getElementById('the-stage');
  var style = window.getComputedStyle(stage);
  var posBackgroundX = parseInt(style.backgroundPositionX);
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  if (posBackgroundX < -666) {
    animateHeader = null;
  }
  else {
    posBackgroundX--;
  }

  stage.style.backgroundPositionX = posBackgroundX + 'px';
}

var animateHeader;
(animateHeader = function() {
  // window.setInterval(nudge, 666);
})();

// discord live users
function checkDiscord(callback) {
  var xobj = new XMLHttpRequest();
  xobj.open('GET', 'https://discordapp.com/api/guilds/160320676580818951/widget.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

var setDiscordCount;
(setDiscordCount = function() {
  checkDiscord(function(response) {
    var $online = document.getElementById('online');
    var $count = document.getElementById('discord-count');
    var json = JSON.parse(response);
    if (json.members.length > 0) {
      $count.innerHTML = json.members.length;
    }
    else {
      $online.innerHTML = 'Online now';
    }
    $online.style.opacity = 1;
  });
})();

// set copyright years
var setCurrentYear;
(setCurrentYear = function() {
  var copyleft = document.getElementById('copyleft-years');
  var currentYear = new Date().getFullYear();
  copyleft.innerHTML = '2016—' + currentYear + '.';
})();
