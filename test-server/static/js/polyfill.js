window.___fw = {};
!function(){
  var t = window.__fw || {};

  ___fw.count = t.count || function(){ console.log('count', arguments); }
  ___fw.speed = t.speed || function(){ console.log('speed', arguments); }
  ___fw.api = t.api || function(){ console.log('api', arguments); }
}();


/**
 * 生成 0 -max的随机数
 * @param max 
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// 制造一次错误
var a = {};
if (getRandomInt(20) > 15) {
  setTimeout(() => {
    if (getRandomInt(20) > 7) {
      setTimeout(()=>{ a.hello()}, 1);
    } else if (getRandomInt(20) > 5) {
      setTimeout(()=>{ a.work()}, 1);
    }
    a.hello();
  }, 1);
}