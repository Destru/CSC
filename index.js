document.addEventListener("DOMContentLoaded", function() {
  // set background
  var backgrounds = ['18_0312b','18_0313b','18_0314b','18_0315b','18_0316b','18_0317b','18_0318b','18_0319b','18_0323b','18_0325b'];
  var fewerBackgrounds = ['18_0325b','18_0318b','18_0312b','18_0319b'];
  var body = document.getElementsByTagName('body')[0];

  const rand = fewerBackgrounds[Math.floor(Math.random() * fewerBackgrounds.length)];
  const app = document.getElementById("app");
  const background = new Image();

  background.src = '/images/'+rand+'.jpg';
  app.style.backgroundImage = 'url(/images/'+rand+'.jpg)';

  background.onload = function() {
    app.style.opacity = "1";
  }
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
    if ($online.style.opacity !== 1) $online.style.opacity = 1;
  });

  // set copyright years
  var copyleft = document.getElementById('copyleft-years');
  var currentYear = new Date().getFullYear();
  copyleft.innerHTML = '2016—' + currentYear + '.';
});
