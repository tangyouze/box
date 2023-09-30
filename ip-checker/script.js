// API列表
const apiList = [
    'https://api.ipify.org?format=json',
    'https://api64.ipify.org?format=json',
    // 添加其他3个API
  ];
  
  const ipListElement = document.getElementById('ip-list');
  const loadingElement = document.getElementById('loading');
  
  // 页面加载时自动执行
  window.onload = function() {
    // 显示加载指示器
    loadingElement.style.display = 'block';
  
    // 使用Promise.all等待所有API响应
    Promise.all(apiList.map(url => fetch(url)
      .then(response => response.json())
      .catch(error => ({ error }))
    ))
    .then(results => {
      // 隐藏加载指示器
      loadingElement.style.display = 'none';
  
      results.forEach((result, index) => {
        const listItem = document.createElement('li');
  
        if (result.ip) {
          listItem.textContent = `来源${index + 1}：${result.ip}`;
        } else {
          listItem.innerHTML = `
            <span class="error">来源${index + 1}：获取失败</span>
            <span class="error-detail">${result.error}</span>
          `;
        }
  
        ipListElement.appendChild(listItem);
      });
    });
  };
  