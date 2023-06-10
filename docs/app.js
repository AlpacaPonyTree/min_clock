window.onload = () => {
    // 針のクラス
    class Hand {
        constructor(length, width) {
            this.len = length;
            this.width = width;
        }

        draw(time, max) {
            const ratio = time / max;
            const direction = ratio * 2 * Math.PI - Math.PI / 2;
            const x = Math.cos(direction) * this.len + 150;
            const y = Math.sin(direction) * this.len + 75;
            ctx.lineWidth = this.width;
            ctx.beginPath();
            ctx.moveTo(150, 75);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.closePath();
        }
    }

    // canvas要素を取得
    const cvs = document.querySelector('canvas');
    const timeTxt = document.getElementById('time');
    const WIDTH = cvs.width;
    const HEIGHT = cvs.height;
    const RADIUS = HEIGHT / 2;
    // コンテクストを取得
    const ctx = cvs.getContext('2d');
    // 分針、秒針、ミリ秒針を定義
    const minHand = new Hand(50, 10);
    const secHand = new Hand(RADIUS - 10, 5);
    const miliHand = new Hand(RADIUS - 5, 1);
    // 繰り返し
    setInterval(() => {
        const now = new Date();
        drawArc();
        const min = now.getMinutes();
        const sec = now.getSeconds();
        const mili = now.getMilliseconds();
        minHand.draw(min + sec / 60, 60);
        secHand.draw(sec, 60);
        miliHand.draw(mili, 1000);
        timeTxt.innerHTML = `${insertZero(min, 2)}:${insertZero(sec, 2)}:${insertZero(mili, 3)}`;
    }, 10);

    function drawArc() {
        ctx.strokeStyle = "black";
        ctx.clearRect(0, 0, 300, 300);
        ctx.beginPath();
        ctx.arc(WIDTH / 2, HEIGHT / 2, HEIGHT / 2 - 1, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
    }

    function insertZero(n, l) {
        let s = String(n);
        for (let i=s.length; i<l; i++) {
            s = '0' + s;
        }
        return s;
    }
}