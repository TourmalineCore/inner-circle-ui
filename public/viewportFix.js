/* eslint-disable */

var customViewportCorrectionVariable = 'vh';

function setViewportProperty(doc) {
  var prevClientHeight;
  var customVar = '--' + ( customViewportCorrectionVariable || 'vh' );

  function handleResize() {
    var clientHeight = doc.clientHeight;

    if (clientHeight === prevClientHeight) return;

    requestAnimationFrame(function updateViewportHeight(){
      doc.style.setProperty(customVar, (clientHeight * 0.01) + 'px');
      prevClientHeight = clientHeight;
    });
  }

  handleResize();

  return handleResize;
}

window.addEventListener('resize', setViewportProperty(document.documentElement));