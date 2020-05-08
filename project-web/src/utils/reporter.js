
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
// const a = {};
// setTimeout(() => {
//   throw new Error('hello is error')
// }, 1);
// setTimeout(() => {
//   throw new Error('nothing to work')
// }, 60 * 1000 *2);

setTimeout(() => {
  document.createElement('img').src='https://stackeflow.com/questions/22345290/how-to-get-sensor-data-over-tcp-ip-in-';
}, 6);

setTimeout(() => {
  document.createElement('img').src='http://sdfsdfasf.sdf.com/sdfdsaf/dsfa';
}, 60 * 1000 *2);