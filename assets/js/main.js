/**
 * Jack's AI Tools - 主脚本
 * 负责：工具列表渲染、导航交互
 */

// 工具数据缓存
let toolsData = null;

/**
 * 加载工具数据
 */
async function loadToolsData() {
  if (toolsData) return toolsData;
  
  try {
    // 根据当前页面深度调整路径
    const isInTools = window.location.pathname.includes('/tools/');
    const basePath = isInTools ? '../' : '';
    
    const response = await fetch(`${basePath}data/tools.json`);
    toolsData = await response.json();
    return toolsData;
  } catch (error) {
    console.error('加载工具数据失败:', error);
    return { tools: [] };
  }
}

/**
 * 渲染工具卡片
 */
function renderToolCard(tool, basePath = '') {
  const tagsHtml = tool.tags.map(tag => 
    `<span class="card-tag">${tag}</span>`
  ).join('');
  
  // 外部链接处理
  const isExternal = tool.external || tool.url.startsWith('http');
  const url = isExternal ? tool.url : `${basePath}${tool.url}`;
  const externalAttrs = isExternal ? 'target="_blank" rel="noopener"' : '';
  
  return `
    <a href="${url}" ${externalAttrs} class="tool-link fade-in">
      <div class="card">
        <div class="card-icon">${tool.icon}</div>
        <h3 class="card-title">${tool.name}</h3>
        <p class="card-desc">${tool.description}</p>
        <div class="card-tags">${tagsHtml}</div>
      </div>
    </a>
  `;
}

/**
 * 渲染工具列表
 */
async function renderToolsList() {
  const container = document.getElementById('tools-grid');
  if (!container) return;
  
  const data = await loadToolsData();
  
  if (data.tools.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🛠️</div>
        <p>暂无工具，敬请期待...</p>
      </div>
    `;
    return;
  }
  
  // 根据当前页面深度调整链接路径
  const isInTools = window.location.pathname.includes('/tools/');
  const basePath = isInTools ? '../' : '';
  
  container.innerHTML = data.tools.map(tool => renderToolCard(tool, basePath)).join('');
}

/**
 * 高亮当前导航
 */
function highlightCurrentNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === './' && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) {
      link.classList.add('active');
    } else if (href && currentPath.includes(href)) {
      link.classList.add('active');
    }
  });
}

/**
 * 复制邮箱到剪贴板
 */
function setupEmailCopy() {
  const emailLink = document.getElementById('email-copy');
  if (!emailLink) return;
  
  emailLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = '269452034@qq.com';
    
    try {
      await navigator.clipboard.writeText(email);
      showToast('邮箱已复制到剪贴板');
    } catch (err) {
      window.location.href = `mailto:${email}`;
    }
  });
}

/**
 * 显示提示消息
 */
function showToast(message, duration = 2000) {
  // 移除已有的 toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: #1A1A1A;
    color: white;
    padding: 12px 24px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  `;
  
  document.body.appendChild(toast);
  
  // 动画显示
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  
  // 自动隐藏
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * 初始化
 */
document.addEventListener('DOMContentLoaded', () => {
  renderToolsList();
  highlightCurrentNav();
  setupEmailCopy();
});

// 导出函数供其他脚本使用
window.JackTools = {
  loadToolsData,
  renderToolsList,
  showToast
};
