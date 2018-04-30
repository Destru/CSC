function checkDiscord(callback) {
  const xobj = new XMLHttpRequest();
  xobj.open('GET', 'https://discordapp.com/api/guilds/160320676580818951/widget.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

document.addEventListener("DOMContentLoaded", function() {
  const app = document.getElementById("app");
  const background = new Image();
  const backgrounds = ['18_0325b','18_0318b','18_0312b','18_0319b'];
  const copyleft = document.getElementById('copyleft-years');
  const currentYear = new Date().getFullYear();
  const rand = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  app.style.backgroundImage = 'url(images/'+rand+'.jpg)';
  background.src = 'images/'+rand+'.jpg';
  background.onload = function() {
    app.style.opacity = "1";
    checkDiscord(function(response) {
      const online = document.getElementById('online');
      const onlineCount = document.getElementById('discord-count');
      const json = JSON.parse(response);
      if (json.members.length > 0) {
        onlineCount.innerHTML = json.members.length;
        online.style.opacity = 1;
      }
    });
    copyleft.innerHTML = '2016—' + currentYear + '.';
  }
});
