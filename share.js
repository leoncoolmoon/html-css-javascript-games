(function() {
    const currentLang = localStorage.getItem('lang') || 'en';
    const translations = {
        en: {
            share: "Share",
            home: "Home",
            copied: "Link copied to clipboard!",
            shareTitle: document.title,
            shareText: "Check out this game!"
        },
        zh: {
            share: "分享",
            home: "首页",
            copied: "链接已复制到剪贴板！",
            shareTitle: document.title,
            shareText: "快来玩这个游戏！"
        }
    };
    const t = translations[currentLang];

    const style = document.createElement('style');
    style.textContent = `
        .floating-controls {
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 9999;
        }
        .floating-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #4CAF50;
            color: white;
            border: none;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: transform 0.2s, background-color 0.2s;
            text-decoration: none;
        }
        .floating-btn:hover {
            transform: scale(1.1);
            background-color: #45a049;
        }
        @media print {
            .floating-controls { display: none; }
        }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.className = 'floating-controls';

    const homeBtn = document.createElement('a');
    homeBtn.href = '../index.html';
    homeBtn.className = 'floating-btn';
    homeBtn.title = t.home;
    homeBtn.innerHTML = '🏠';

    const shareBtn = document.createElement('button');
    shareBtn.className = 'floating-btn';
    shareBtn.title = t.share;
    shareBtn.innerHTML = '🔗';
    shareBtn.onclick = async () => {
        const shareData = {
            title: t.shareTitle,
            text: t.shareText,
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert(t.copied);
            }
        } catch (err) {
            if (err.name !== 'AbortError') console.error('Error sharing:', err);
        }
    };

    container.appendChild(homeBtn);
    container.appendChild(shareBtn);
    document.body.appendChild(container);
})();
