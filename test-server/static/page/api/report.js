var apiTimeInput = document.getElementById('apiTime');
var apiUrlIput = document.getElementById('apiUrl');
var apiCodeIput = document.getElementById('apiCode');
var apiSuccessIput = document.getElementById('apiSuccess');
var apiResponeInput  = document.getElementById('apiRespone');

apiTimeInput.value = 30 + getRandomInt(1500);

var apiListDom = document.getElementById('apiList');
apiListDom.onclick = function(e) {
  if (apiListDom === e.target) {
    return;
  }
  apiUrlIput.value = e.target.innerText;
};

apiCodeIput.oninput = function (e) {
  var value = e.target.value;
  console.log(value)
  if ( Number(value) > 400) {
    apiSuccessIput.value = 1;
  } else {
    apiSuccessIput.value = 0;
  }
}

document.getElementById('apiSendBtn').onclick = function() {
  var apiUrl = apiUrlIput.value;
  var apiTime = Number(apiTimeInput.value) || 1;
  var apiSuccess = apiSuccessIput.value || 0;
  var apiCode = apiCodeIput.value;
  var apiRespone = apiResponeInput.value || 'error'
  if (!apiUrl || !apiCode) {
    return ;
  }

  if (apiSuccess == 0) {
    ___fw.api(apiUrl, apiTime);
    console.log(apiUrl, apiTime)
    alert('上报：调用成功' );
    
  } else {
    ___fw.api(apiUrl, apiTime, false, Number(apiCode), apiRespone);
    console.log(apiUrl, apiTime, false, Number(apiCode), apiRespone);
  }

};
