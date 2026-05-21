const games = [
    {
        "num": "01",
        "href": "01-Candy-Crush-Game/",
        "en": {
            "name": "Candy Crush Game",
            "desc": "Enjoy the classic match-three puzzle game where you swap colored candies to create matches and clear levels. 🍬🍭"
        },
        "zh": {
            "name": "糖果传奇游戏",
            "desc": "享受经典的三消益智游戏，交换彩色糖果以创建匹配并完成关卡。 🍬🍭"
        }
    },
    {
        "num": "02",
        "href": "02-Archery-Game/",
        "en": {
            "name": "Archery Game",
            "desc": "Test your aim in this challenging archery game where precision and timing are key to hitting the bullseye. 🏹"
        },
        "zh": {
            "name": "射箭游戏",
            "desc": "在这个具有挑战性的射箭游戏中测试你的瞄准能力，精准和时机是击中靶心的关键。 🏹"
        }
    },
    {
        "num": "03",
        "href": "03-Speed-Typing-Game/",
        "en": {
            "name": "Speed Typing Game",
            "desc": "Improve your typing speed and accuracy with this game that challenges you to type words quickly under time pressure. ⌨️"
        },
        "zh": {
            "name": "打字速度游戏",
            "desc": "通过这个游戏提高你的打字速度和准确性，挑战你在时间压力下快速输入单词。 ⌨️"
        }
    },
    {
        "num": "04",
        "href": "04-Breakout-Game/",
        "en": {
            "name": "Breakout Game",
            "desc": "Relive the arcade classic where you use a paddle to bounce a ball and break bricks, aiming for a high score. 🎮"
        },
        "zh": {
            "name": "打砖块游戏",
            "desc": "重温经典街机游戏，使用一个球拍击打球并打破砖块，争取高分。 🎮"
        }
    },
    {
        "num": "05",
        "href": "05-Minesweeper-Game/",
        "en": {
            "name": "Minesweeper Game",
            "desc": "Exercise your logical thinking with this puzzle game where you avoid hidden mines and uncover safe tiles. 💣"
        },
        "zh": {
            "name": "扫雷游戏",
            "desc": "经典的扫雷游戏，左键打开方块，推开（长按）标记方块，双击打开周围的方块。 💣"
        }
    },
    {
        "num": "06",
        "href": "06-Tower-Blocks/",
        "en": {
            "name": "Tower Blocks Game",
            "desc": "Build a tower by stacking blocks as high as possible without letting them topple over in this physics-based game. 🏗️"
        },
        "zh": {
            "name": "塔楼游戏",
            "desc": "在这个物理基础的游戏中，通过堆叠方块尽可能高地建造一座塔，而不让它们倒下。 🏗️"
        }
    },
    {
        "num": "07",
        "href": "07-Ping-Pong-Game/",
        "en": {
            "name": "Ping Pong Game",
            "desc": "Experience the thrill of table tennis as you compete against an AI opponent in this classic sports game. 🏓"
        },
        "zh": {
            "name": "乒乓球游戏",
            "desc": "在这个经典运动游戏中与 AI 对手竞争，体验乒乓球的刺激。 🏓"
        }
    },
    {
        "num": "08",
        "href": "08-Tetris-Game/",
        "en": {
            "name": "Tetris Game",
            "desc": "Arrange falling tetrominoes to create complete lines and score points in this addictive puzzle game. 🧱"
        },
        "zh": {
            "name": "俄罗斯方块游戏",
            "desc": "排列下落的方块以创建完整的行并在这个上瘾的益智游戏中得分，支持重力感应。 🧱"
        }
    },
    {
        "num": "09",
        "href": "09-Tilting-Maze-Game/",
        "en": {
            "name": "Tilting Maze Game",
            "desc": "Navigate a ball through a tilting maze, avoiding traps and reaching the goal in this challenging game of skill. 🌀"
        },
        "zh": {
            "name": "倾斜迷宫游戏",
            "desc": "在这个技能挑战游戏中，导航一个球通过倾斜的迷宫，避开陷阱并达到目标。 🌀"
        }
    },
    {
        "num": "10",
        "href": "10-Memory-Card-Game/",
        "en": {
            "name": "Memory Card Game",
            "desc": "Test your memory by matching pairs of cards in this classic concentration game. 🃏"
        },
        "zh": {
            "name": "记忆卡片游戏",
            "desc": "在这个经典的记忆游戏中，通过匹配成对的卡片来测试你的记忆力。 🃏"
        }
    },
    {
        "num": "11",
        "href": "11-Rock-Paper-Scissors/",
        "en": {
            "name": "Rock Paper Scissors Game",
            "desc": "Play the timeless hand game against the computer and see who comes out victorious. ✂️"
        },
        "zh": {
            "name": "剪刀石头布游戏",
            "desc": "与计算机进行这个经典手势游戏，看看谁将获胜。 ✂️"
        }
    },
    {
        "num": "12",
        "href": "12-Type-Number-Guessing-Game/",
        "en": {
            "name": "Type Number Guessing Game",
            "desc": "Guess the hidden number based on clues provided after each guess in this number guessing game. 🔢"
        },
        "zh": {
            "name": "输入数字猜谜游戏",
            "desc": "根据每次猜测后提供的线索来猜测隐藏的数字。 🔢"
        }
    },
    {
        "num": "13",
        "href": "13-Tic-Tac-Toe/",
        "en": {
            "name": "Tic Tac Toe Game",
            "desc": "Challenge a friend in this simple yet strategic game of placing Xs and Os in a 3x3 grid. ⭕❌"
        },
        "zh": {
            "name": "井字棋游戏",
            "desc": "在这个简单而战略性的游戏，在 3x3 网格中放置 X 和 O。 ⭕❌"
        }
    },
    {
        "num": "14",
        "href": "14-Snake-Game/",
        "en": {
            "name": "Snake Game",
            "desc": "Control a growing snake, eat food, and avoid collisions with walls and your own tail in this nostalgic arcade game. 🐍"
        },
        "zh": {
            "name": "贪吃蛇游戏",
            "desc": "控制一条不断生长的蛇，吃食物，避免与自己的尾巴发生碰撞，在这个怀旧的街机游戏中，支持重力感应。 🐍"
        }
    },
    {
        "num": "15",
        "href": "15-Connect-Four-Game/",
        "en": {
            "name": "Connect discs Game",
            "desc": "Strategically drop colored discs to connect them in a row vertically, horizontally, or diagonally in this classic board game. you can challenge your friends or AI with this game. 🔴🔵🔴"
        },
        "zh": {
            "name": "多子连珠游戏",
            "desc": "战略性地投放彩色圆盘，以纵向、横向或对角线连接棋子以获取胜利，在这个经典棋盘游戏中你可以挑战朋友或 AI。 🔵🔴"
        }
    },
    {
        "num": "16",
        "href": "16-Insect-Catch-Game/",
        "en": {
            "name": "Insect Catch Game",
            "desc": "Test your reflexes by clicking on randomly appearing insects to catch them before they disappear. 🐞"
        },
        "zh": {
            "name": "捕虫游戏",
            "desc": "通过点击随机出现的昆虫来测试你的反应能力，尽量在它们消失之前捕捉到它们。 🐞"
        }
    },
    {
        "num": "17",
        "href": "17-Typing-Game/",
        "en": {
            "name": "Typing Game",
            "desc": "Sharpen your typing skills by typing specific words or sentences as quickly and accurately as possible. ⌨️"
        },
        "zh": {
            "name": "打字游戏",
            "desc": "通过尽可能快速准确地输入特定的单词或句子来提高你的打字技能。 ⌨️"
        }
    },
    {
        "num": "18",
        "href": "18-Hangman-Game/",
        "en": {
            "name": "Hangman Game",
            "desc": "Guess the hidden word by suggesting letters within a certain number of guesses in this word-guessing game. You can also check the definitions of the words with internet 🎩"
        },
        "zh": {
            "name": "绞刑架游戏",
            "desc": "在这个猜字游戏中，通过在有限的猜测次数内建议字母来猜测隐藏的单词。并能通过网络查询该词的读音和解释 🎩"
        }
    },
    {
        "num": "19",
        "href": "19-Flappy-Bird-Game/",
        "en": {
            "name": "Flappy Bird Game",
            "desc": "Guide a bird through gaps in pipes by tapping to flap its wings, avoiding obstacles and aiming for a high score. 🐦"
        },
        "zh": {
            "name": "Flappy Bird 游戏",
            "desc": "通过点击来引导鸟儿穿过管道间隙，避免障碍物并争取高分。 🐦"
        }
    },
    {
        "num": "20",
        "href": "20-Crossy-Road-Game/",
        "en": {
            "name": "Crossy Road Game",
            "desc": "Help a character cross roads, rivers, and other obstacles in this endless hopping game with a retro arcade feel. 🚦"
        },
        "zh": {
            "name": "过马路游戏",
            "desc": "帮助角色穿越道路、河流和其他障碍，在这个具有复古街机风格的无尽跳跃游戏中。 🚦"
        }
    },
    {
        "num": "21",
        "href": "21-2048-Game/",
        "en": {
            "name": "2048 Game",
            "desc": "Slide numbered tiles on a grid to combine them and create a tile with the number 2048 in this addictive puzzle game. 🧩"
        },
        "zh": {
            "name": "2048 游戏",
            "desc": "在这个上瘾的益智游戏中，滑动数字方块以组合它们并创建一个数字为 2048 的方块。 🧩"
        }
    },
    {
        "num": "22",
        "href": "22-Dice-Roll-Simulator/",
        "en": {
            "name": "Dice Roll Simulator",
            "desc": "Simulate rolling dice to achieve different combinations or outcomes in this virtual dice rolling game. 🎲"
        },
        "zh": {
            "name": "骰子投掷模拟器",
            "desc": "模拟掷骰子以在这个虚拟骰子投掷游戏中获得不同的组合或结果。 🎲"
        }
    },
    {
        "num": "23",
        "href": "23-Shape-Clicker-Game/",
        "en": {
            "name": "Shape Clicker Game",
            "desc": "Click on various shapes appearing on the screen within a time limit to score points in this clicker game. 🔷🔶"
        },
        "zh": {
            "name": "形状点击游戏",
            "desc": "在时间限制内点击屏幕上出现的各种形状，以在这个点击游戏中得分。 🔷🔶"
        }
    },
    {
        "num": "24",
        "href": "24-Typing-Game/",
        "en": {
            "name": "Typing Game",
            "desc": "Improve your typing speed and accuracy by typing specific words or sentences under time pressure. ⌨️"
        },
        "zh": {
            "name": "打字游戏",
            "desc": "通过在时间压力下输入特定的单词或句子来提高你的打字速度和准确性。 ⌨️"
        }
    },
    {
        "num": "25",
        "href": "25-Speak-Number-Guessing-Game/",
        "en": {
            "name": "Speak Number Guessing Game",
            "desc": "Guess the hidden number by speaking your guesses aloud in this voice-activated number guessing game. 🗣️🔢"
        },
        "zh": {
            "name": "说出数字猜谜游戏",
            "desc": "通过大声说出你的猜测来猜测隐藏的数字，参与这个语音激活的数字猜测游戏。 🗣️🔢"
        }
    },
    {
        "num": "26",
        "href": "26-Fruit-Slicer-Game/",
        "en": {
            "name": "Fruit Slicer Game",
            "desc": "Swipe across the screen to slice falling fruits while avoiding bombs in this fast-paced fruit-slicing game. 🍉🔪"
        },
        "zh": {
            "name": "水果切割游戏",
            "desc": "在这个快节奏的水果切割游戏中，划过屏幕切割掉下来的水果，同时避免炸弹。 🍉🔪"
        }
    },
    {
        "num": "27",
        "href": "27-Quiz-Game/",
        "en": {
            "name": "Quiz Game",
            "desc": "Test your knowledge on various topics by answering trivia questions and aiming for a high score in this quiz game. 🧠📚"
        },
        "zh": {
            "name": "测验游戏",
            "desc": "通过回答各种主题的琐事问题来测试你的知识，在这个测验游戏中争取高分。 🧠📚"
        }
    },
    {
        "num": "28",
        "href": "28-Emoji-Catcher-Game/",
        "en": {
            "name": "Emoji Catcher Game",
            "desc": "Catch falling emojis with a basket or container while avoiding bombs and other obstacles in this emoji-catching game. 🎯😄"
        },
        "zh": {
            "name": "表情符号捕捉游戏",
            "desc": "表情包版的打地鼠游戏。 🎯😄"
        }
    },
    {
        "num": "29",
        "href": "29-Whack-A-Mole-Game/",
        "en": {
            "name": "Whack A Mole Game",
            "desc": "Test your reaction speed by hitting randomly appearing moles with a mallet before they disappear in this classic arcade game. 🕹️"
        },
        "zh": {
            "name": "打地鼠游戏",
            "desc": "通过在这个经典街机游戏中用锤子击打随机出现的地鼠来测试你的反应速度。 🕹️"
        }
    },
    {
        "num": "30",
        "href": "30-Guess-Number-Game/",
        "en": {
            "name": "Guess Number Game",
            "desc": "Guess a 4-digit number with A for right position and B for right number. Only eight chances. A good game for logical thinking.🧠🤖"
        },
        "zh": {
            "name": "猜数字游戏",
            "desc": "猜测一个 4 位数字，A 表示位置正确，B 表示数字正确。只有八次机会。一个锻炼逻辑思维的好游戏。🧠🤖"
        }
    },
    {
        "num": "31",
        "href": "31-Air-Hockey-Game/",
        "en": {
            "name": "Air Hockey Game",
            "desc": "A ping-pong like game with two players. control with mouse or keyboard or multi-touch screen. Play with your friends in this classic game. 🏀🏑"
        },
        "zh": {
            "name": "空气曲棍球游戏",
            "desc": "一个类似乒乓球的游戏，用键盘或鼠标或多触点屏幕来进行对战吧！🏀 🏑"
        }
    },
    {
        "num": "32",
        "href": "32-24-Point-Poker-Game/",
        "en": {
            "name": "24 Point Poker Game",
            "desc": "A classic 24 point poker game. Get four random cards to start. Use Add or Subtract or Multiply or Divide to calculate 24. 🎲🃏"
        },
        "zh": {
            "name": "24 点扑克",
            "desc": "一个益智计算类游戏，随机取四张扑克牌用加减乘除四则运算来计算24 点！🃏"
        }
    },
    {
        "num": "33",
        "href": "33-Snakes_ladders/",
        "en": {
            "name": "Snakes & Ladders",
            "desc": "The Classic Board Game Experience Enjoy the timeless family favorite where luck meets strategy! Roll the dice, climb the ladders to race ahead, but watch out for slippery snakes that might send you sliding back. 🎲🐍🪜"
        },
        "zh": {
            "name": "蛇与梯子",
            "desc": "经典棋盘游戏体验 享受这款历久弥新的家庭经典游戏，运气与策略的完美结合！掷出骰子，沿着梯子向上攀登抢占先机，但要小心那些滑溜溜的蛇，它们可能会让你功亏一篑。🎲🐍🪜"
        }
    },
    {
        "num": "34",
        "href": "34-helicopter-Game/",
        "en": {
            "name": "Helicopter Game",
            "desc": "A 3D helicopter shooting game. Control your helicopter to shoot targets and score high."
        },
        "zh": {
            "name": "直升飞机射击游戏",
            "desc": "3D直升机射击游戏。控制直升机射击目标并获取高分。"
        }
    },
    {
        "num": "35",
        "href": "35-RubikCube-Game/",
        "en": {
            "name": "Rubik's Cube Game",
            "desc": "A virtual 3D Rubik's Cube game. Solve the classic puzzle with multiple themes and difficulty settings."
        },
        "zh": {
            "name": "魔方游戏",
            "desc": "虚拟3D魔方游戏。解决经典的拼图，支持多种主题和难度设置。"
        }
    },
    {
        "num": "36",
        "href": "36-Cross-River-Game/",
        "en": {
            "name": "River crossing Game",
            "desc": "Classic river puzzle. Boat holds two. Avoid zombies eating survivors. 🧟‍♂️🚣"
        },
        "zh": {
            "name": "渡河谜题",
            "desc": "经典渡河谜题。船载两人，避免丧尸吃幸存者。🧟‍♂️🚣"
        }
    },
    {
        "num": "37",
        "href": "37-Word-Search-Relaxed/",
        "en": {
            "name": "Word Search Relaxed",
            "desc": "Discover hidden words in a dynamic grid with smooth animations and fade-in background music. A relaxing yet engaging puzzle experience. 🔍✨🎶"
        },
        "zh": {
            "name": "单词搜索（轻松版）",
            "desc": "在动态生成的字母网格中寻找隐藏单词，搭配渐入渐出的背景音乐和流畅动画，带来放松又沉浸的解谜体验。🔍✨🎶"
        }
    }
];