// animate the banner
function nudge() {
  var stage = document.getElementById('the-stage');
  var style = window.getComputedStyle(stage);
  var posX = parseInt(style.backgroundPositionX);
  posX++;
  if (posX > 2400) posX = -800;
  stage.style.backgroundPositionX = posX + 'px';
}

var setTheStage;
(setTheStage = function() {
  window.setInterval(nudge, 64);
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
      twitchLink.style.opacity = .1;
    }
    else {
      twitchLink.style.opacity = 1;
    }
    twitchLink.style.display = 'inline-block';
  });
})();

// set copyright years
var setCurrentYear;
(setCurrentYear = function() {
  var copyleft = document.getElementById('copyleft-years');
  var currentYear = new Date().getFullYear();
  copyleft.innerHTML = '1982—' + currentYear + '.';
})();
