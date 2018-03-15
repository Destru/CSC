// animate the banner
function nudge() {
  var stage = document.getElementById('the-stage');
  var style = window.getComputedStyle(stage);
  var posBackgroundX = parseInt(style.backgroundPositionX);
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  if (posBackgroundX < -666) {
    posBackgroundX = width - 10;
  }
  else {
    posBackgroundX--;
  }

  stage.style.backgroundPositionX = posBackgroundX + 'px';
}

var setTheStage;
(setTheStage = function() {
  window.setInterval(nudge, 250);
})();

// highlight Twitch link (if live)
function checkTwitch(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'https://api.twitch.tv/kraken/streams/notdestru?client_id=kcq01v6zv3ii7b3ruauhxv47n8941d', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

var setTwitchLink;
(setTwitchLink = function() {
  checkTwitch(function(response) {
    var twitchLink = document.getElementById('twitch-link');
    var json = JSON.parse(response);
    if (json.stream === null) {
      twitchLink.removeAttribute('href');
      twitchLink.style.display = 'none';
    }
    else {
      twitchLink.setAttribute('href', 'https://twitch.tv/notdestru');
      twitchLink.style.display = 'inline-block';
      twitchLink.style.opacity = 1;
    }
  });
})();

// get Discord live users
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
