(function () {
  var btnTiles = document.getElementById('btnTiles')
  btnTiles.addEventListener("click", function() {
    document.getElementById('list').classList.remove("show");
    document.getElementById('list').classList.add("hide");
    document.getElementById('tiles').classList.remove("hide");
    document.getElementById('tiles').classList.add("show");
  },false);

  var btnList = document.getElementById('btnList')
  btnList.addEventListener("click", function() {
    document.getElementById('tiles').classList.remove("show");
    document.getElementById('tiles').classList.add("hide");
    document.getElementById('list').classList.remove("hide");
    document.getElementById('list').classList.add("show");
  },false);

})();
