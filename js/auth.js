// 登录验证功能

// 检查用户是否已登录
function checkLogin() {
    // 从localStorage获取登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
}

// 保存登录状态
function saveLoginState(username) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('loginTime', new Date().toString());
}

// 清除登录状态
function clearLoginState() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('loginTime');
}

// 获取当前登录用户信息
function getCurrentUser() {
    if (!checkLogin()) {
        return null;
    }
    
    return {
        username: localStorage.getItem('username'),
        loginTime: localStorage.getItem('loginTime')
    };
}

// 保护页面，如果未登录则重定向到登录页面
function protectPage() {
    if (!checkLogin()) {
        // 保存当前URL，以便登录后可以返回
        localStorage.setItem('redirectAfterLogin', window.location.href);
        // 重定向到登录页面
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// 登录后重定向到之前尝试访问的页面
function redirectAfterLogin() {
    const redirectUrl = localStorage.getItem('redirectAfterLogin') || 'elderly-fall-detection.html';
    localStorage.removeItem('redirectAfterLogin');
    window.location.href = redirectUrl;
}