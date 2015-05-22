var size = module.exports = {};
function getSize() {
  size.height = window.innerHeight;
  size.width = window.innerWidth;
}
getSize();
window.addEventListener('resize', getSize);
