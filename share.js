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
        /* Global layout fixes to prevent vertical overflow */
        html, body {
            height: 100dvh !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            width: 100vw !important;
        }

        /* Ensure all elements respect box-sizing */
        * { box-sizing: border-box; }

        /* Constrain common game containers and canvases */
        canvas, #game-container, .container, .game-board, .grid, main, #board, .game-area, #canvas, .game {
            max-height: 84dvh !important;
            max-width: 100vw !important;
            object-fit: contain !important;
        }

        /* Prevent large images from causing overflow */
        img { max-height: 80dvh !important; object-fit: contain !important; }

        /* Floating controls styling */
        .floating-controls {
            position: fixed;
            bottom: 15px;
            right: 15px;
            display: flex;
            flex-direction: row-reverse;
            gap: 10px;
            z-index: 10000;
        }
        .floating-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(76, 175, 80, 0.75);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }
        .floating-btn:hover {
            transform: scale(1.1);
            background-color: rgba(76, 175, 80, 0.9);
            box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }
        .floating-btn:active {
            transform: scale(0.9);
        }
        @media (max-width: 600px), (max-height: 600px) {
            .floating-btn {
                width: 36px;
                height: 36px;
                font-size: 18px;
            }
            .floating-controls {
                bottom: 12px;
                right: 12px;
                gap: 8px;
            }
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

    container.appendChild(shareBtn);
    container.appendChild(homeBtn);

    // Ensure body exists before appending
    if (document.body) {
        document.body.appendChild(container);
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(container);
        });
    }
})();
