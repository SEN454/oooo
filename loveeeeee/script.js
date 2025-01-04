// 设置周年纪念日
const anniversaryDate = new Date('2024-01-14T00:00:00');

// 获取显示时间的元素
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// 更新倒计时
function updateCountdown() {
    const now = new Date();
    const timeDifference = anniversaryDate - now;

    // 计算剩余时间
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // 更新显示并添加动画
    updateWithAnimation(daysElement, formatTime(days));
    updateWithAnimation(hoursElement, formatTime(hours));
    updateWithAnimation(minutesElement, formatTime(minutes));
    updateWithAnimation(secondsElement, formatTime(seconds));
}

// 带动画的更新函数
function updateWithAnimation(element, newValue) {
    if (element.textContent !== newValue) {
        element.classList.add('changing');
        element.textContent = newValue;
        setTimeout(() => {
            element.classList.remove('changing');
        }, 300);
    }
}

// 格式化时间显示（确保两位数）
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// 每秒更新一次
setInterval(updateCountdown, 1000);

// 立即执行一次以避免初始延迟
updateCountdown();

// 心形动画效果
const heartsContainer = document.getElementById('hearts-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // 随机大小和位置
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.width = Math.random() * 30 + 10 + 'px';
    heart.style.height = heart.style.width;
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    
    // 随机颜色
    const colors = ['#ff6b81', '#ff4757', '#ff7f50', '#ff6b6b'];
    heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    heartsContainer.appendChild(heart);
    
    // 动画结束后移除心形
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// 每200ms创建一个心形
setInterval(createHeart, 200);

// 音乐控制
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');

// 初始化音乐状态
let isMusicPlaying = false;

// 切换音乐播放状态
function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
    } else {
        bgMusic.play()
            .then(() => {
                musicToggle.classList.add('playing');
            })
            .catch(error => {
                console.error('音乐播放失败:', error);
                alert('请点击页面任意位置以允许播放音乐');
            });
    }
    isMusicPlaying = !isMusicPlaying;
}

// 添加音乐控制事件
musicToggle.addEventListener('click', toggleMusic);

// 首次点击页面时自动播放音乐
let firstClick = true;
document.addEventListener('click', (e) => {
    if (firstClick) {
        toggleMusic();
        firstClick = false;
    }
    
    // 点击页面创建心形
    const clickHeart = document.createElement('div');
    clickHeart.classList.add('heart');
    clickHeart.style.left = e.clientX + 'px';
    clickHeart.style.top = e.clientY + 'px';
    clickHeart.style.width = '40px';
    clickHeart.style.height = '40px';
    clickHeart.style.animationDuration = '1.5s';
    clickHeart.style.backgroundColor = '#ff6b81';
    
    heartsContainer.appendChild(clickHeart);
    
    clickHeart.addEventListener('animationend', () => {
        clickHeart.remove();
    });
});

// 甜蜜信息交互
const secretButton = document.querySelector('.secret-button');
const messagesContainer = document.querySelector('.messages-container');

secretButton.addEventListener('click', () => {
    // 切换显示状态
    messagesContainer.style.display = messagesContainer.style.display === 'block' ? 'none' : 'block';
    
    // 添加按钮动画
    secretButton.classList.add('clicked');
    setTimeout(() => {
        secretButton.classList.remove('clicked');
    }, 300);
    
    // 如果显示信息，则随机排列顺序
    if (messagesContainer.style.display === 'block') {
        const messageBoxes = Array.from(messagesContainer.children);
        messageBoxes.sort(() => Math.random() - 0.5);
        messagesContainer.innerHTML = '';
        messageBoxes.forEach(box => messagesContainer.appendChild(box));
    }
});

// 添加点击信息框的互动
messagesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('message-box')) {
        e.target.classList.toggle('expanded');
    }
});

// 狗狗动画逻辑
const dogsContainer = document.createElement('div');
dogsContainer.className = 'dogs-container';
document.body.appendChild(dogsContainer);

function createDog(type) {
    const dog = document.createElement('div');
    dog.className = `dog ${type}`;
    dog.style.animationDuration = `${Math.random() * 5 + 10}s`;
    dog.style.bottom = `${Math.random() * 30}px`;
    
    // 创建像素狗身体
    const body = document.createElement('div');
    body.className = 'pixel-body';
    dog.appendChild(body);
    
    // 创建像素狗头部
    const head = document.createElement('div');
    head.className = 'pixel-head';
    dog.appendChild(head);
    
    // 创建像素狗尾巴
    if (type === 'samoyed') {
        const tail = document.createElement('div');
        tail.className = 'pixel-tail';
        dog.appendChild(tail);
    }
    
    dogsContainer.appendChild(dog);
    
    dog.addEventListener('animationend', () => {
        dog.remove();
        createDog(type);
    });
}

// 创建多只狗狗
function createDogs() {
    const dogTypes = ['samoyed', 'german-shepherd'];
    for (let i = 0; i < 4; i++) {
        const type = dogTypes[Math.floor(Math.random() * dogTypes.length)];
        setTimeout(() => createDog(type), Math.random() * 5000);
    }
}

createDogs();
