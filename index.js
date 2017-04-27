function setCurrentYear() {
  var copyleft = document.getElementById('copyleft-years');
  var currentYear = new Date().getFullYear();
  copyleft.innerHTML = '1982—' + currentYear;
}
setCurrentYear();

// WIP Pixel Rain
function makeRaindrop() {
  var raindrop = document.createElement('div');
  raindrop.className = 'raindrop';
  document.appendChild(raindrop);
}
