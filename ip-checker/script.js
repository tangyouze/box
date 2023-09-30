document.getElementById('fetch-ip').addEventListener('click', function() {
    // 这里以 https://api.ipify.org?format=json 为例，你可以替换为其他API
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ipAddress = data.ip;
        document.getElementById('ip-address').innerText = `你的 IP 地址是：${ipAddress}`;
      })
      .catch(error => {
        console.error('获取IP地址出错', error);
        document.getElementById('ip-address').innerText = '获取IP地址失败';
      });
  });
  