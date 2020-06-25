
import { getRandomInt } from '~/utils';

const fw = window.__fw || {};
function count(key, value = 1, timmeout=0) {
  
  setTimeout(() => {
    fw.count && fw.count(key, value);
  }, timmeout)
}

fw.speed && window.__fw.speed(0, getRandomInt(2000));
fw.speed && window.__fw.speed(2, getRandomInt(2000));
fw.speed && window.__fw.speed(3, getRandomInt(2000));

count('app_login', getRandomInt(200), 300);

count('user_forget_passWord', getRandomInt(20));

count('looking_for_speed' + getRandomInt(15), 4 , 200);

count('necvdaslkfe_hello_world', getRandomInt(20), 500);


// 制造一次错误
function run() {
  const a = {};
  // a.hello3();
  if (getRandomInt(20) > 15) {
    setTimeout(() => {
      if (getRandomInt(20) > 5) {
        setTimeout(()=>{ a.hello()},1);
        // setTimeout(() => {window.location.reload();}, 1100);
      } else {
        // setTimeout(() => {window.location.reload();}, 1100);
      }
      a.hello();
    }, 1);
  }
}
run();


// 制造一次 api上报
if (getRandomInt(20) >11) {
  fw.api && fw.api('eep://api.hello', 220 + getRandomInt(750), false, 500, 'error');
} else {
  fw.api && fw.api('eep://api.hello', 200 + getRandomInt(150),);
}




// const urls = [
//   '#/app/data/index',
//   '#/app/data/error',
//   '#/app/data/api',
//   '#/app/data/sum',
//   '#/app/setting/alarm',
//   '#/app/setting/sdk',
//   '#/app/appList',
// ];

// setTimeout( () => {
//   const url = `http://localhost:8080/${urls[getRandomInt(7)]}`;
//   console.log('看看', url)
//   window.location.href = url
// }, 1000 * 60 * 0.3);