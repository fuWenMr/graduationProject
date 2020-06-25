document.getElementById('count_send_btn').onclick= function() {

  var key = document.getElementById('countKey').value;
  if (!key) {
    return ;
  }
  var value =  document.getElementById('countValue').value || 1;
  ___fw.count(key, value);
  alert('已发送 计数数据 key:' + key + ' value：' + value );
};

document.getElementById('speed_send_btn').onclick= function() {
  var key = document.getElementById('speedKey').value || 0;
  if (!key) {
    return ;
  }
  var value =  document.getElementById('speedValue').value || 1;
  ___fw.count(key, value);
  alert('已发送 计速数据 key:' + key + ' value：' + value );
};
