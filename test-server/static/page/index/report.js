
___fw.count('app_login');

___fw.count('user_find_num' ,  getRandomInt(20));

___fw.count('user_find_num_big' ,  getRandomInt(400));

___fw.speed(0, getRandomInt(2000));

___fw.speed(2, getRandomInt(2000));

___fw.speed(3, getRandomInt(2000));




// 进行一次api请求
// 制造一次 api上报
if (getRandomInt(20) > 13) {
  ___fw.api('eep://api.hello', 220 + getRandomInt(100), false, 500, 'error');
} else {
  ___fw.api('eep://api.hello', 200 + getRandomInt(100));
}