// router.js

// 1. 获取必要的 DOM 元素
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// 2. 定义你的“路由”映射
//    键 (key): 用户可能输入的搜索词 (建议用小写)
//    值 (value): 对应的本地 HTML 文件路径
const routes = {
    "首页": "index.html", // 可以定义一个回到首页的词
    "about": "about.html",
    "resources": "resources.html",
    "recipe": "recipe.html", // 也可以指向子目录的文件
    "bento": "bento.html",
    "zyt": "zyt.html",
    "zyt1": "zyt1.html",
    // --- 在这里添加更多你的页面映射 ---
    "test": "test.html"
};

// 3. 监听表单提交事件
searchForm.addEventListener('submit', function(event) {
    // 阻止表单的默认提交行为 (防止页面刷新或向服务器发送请求)
    event.preventDefault();

    // 获取用户输入的搜索词，并转换为小写，去除首尾空格
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        // 如果输入为空，什么也不做
        return;
    }

    // 检查是否是预定义的路由词
    if (routes.hasOwnProperty(searchTerm)) {
        // 如果是，跳转到对应的页面
        window.location.href = routes[searchTerm];
    } else {
        // 可选：检查输入是否像一个 URL
        if (isUrl(searchTerm)) {
            // 如果像 URL，尝试跳转（注意：需要添加 http:// 或 https://）
            let url = searchTerm;
            if (!searchTerm.startsWith('http://') && !searchTerm.startsWith('https://')) {
                url = 'https://' + searchTerm; // 默认使用 https
            }
             // 在新标签页打开外部链接通常更好
            window.open(url, '_blank');
            // 或者在当前标签页跳转: window.location.href = url;
        } else {
            // 如果不是预定义路由词，也不是 URL，可以给用户提示
            alert(`没有找到与 "${searchInput.value}" 相关的页面。`);
            // 或者跳转到一个统一的 "未找到" 页面
            // window.location.href = 'not-found.html';
        }
    }
});

// 简单的 URL 检查函数 (可以根据需要改进)
function isUrl(text) {
    // 这个正则表达式比较基础，可以识别常见的网址格式
    // 比如 www.example.com, example.com, http://example.com, https://example.com
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i' // case insensitive
    );
    return !!urlPattern.test(text) || text.includes('.'); // 简单地认为包含.也可能是网址
}

// --- (可选) 添加快捷方式的逻辑可以放在这里或 script.js ---
// 例如，动态添加快捷方式:
/*
const shortcutsContainer = document.getElementById('shortcutsContainer');
const shortcuts = [
    { label: 'YouTube', url: 'https://www.youtube.com', icon: 'fab fa-youtube' },
    { label: 'GitHub', url: 'https://www.github.com', icon: 'fab fa-github' },
    // 添加更多...
    { label: '添加快捷方式', url: '#', icon: 'fas fa-plus', isAddButton: true } // 特殊标记添加按钮
];

shortcuts.forEach(shortcut => {
    const link = document.createElement('a');
    link.href = shortcut.url;
    link.classList.add('shortcut-item');
    if (!shortcut.isAddButton && !shortcut.url.startsWith('#')) {
        link.target = '_blank'; // 在新标签页打开外部链接
    }

    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('shortcut-icon-wrapper');

    const icon = document.createElement('i');
    icon.className = shortcut.icon; // 使用 className 同时设置多个类
    iconWrapper.appendChild(icon);

    const label = document.createElement('span');
    label.classList.add('shortcut-label');
    label.textContent = shortcut.label;

    link.appendChild(iconWrapper);
    link.appendChild(label);

    if (shortcut.isAddButton) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('添加快捷方式功能待实现!');
            // 这里可以添加弹出框让用户输入网址和名称
        });
    }

    shortcutsContainer.appendChild(link);
});
*/