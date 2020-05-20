//读取文件
export function readFile(file) {
    return new Promise((resolve,reject) => {
        let reader = new FileReader;
        reader.readAsText(file);
        reader.onload = (ev) => {
            resolve(ev.target.result)
        };
    });
}


//节流器
export function throttle(func, delay) {
    var timer = null;
    return function(){
        var context = this;
        var args = arguments;
        if(!timer){
            timer = setTimeout(function(){
                func.apply(context,args);
                timer = null;
            },delay)
        }
    }
}

//返回min和max之间的一个随机数
export function random(min,max) {
    return Math.random()*(max - min) + min;
}

//返回window宽高
export function getWindowWH() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    window.onresize = function() {
        w = window.innerWidth;
        h = window.innerHeight;
    };
    return {w,h}
}

//返回雨滴效果
export function drawRain(w,h,canContent) {
    function Rain() {};
    Rain.prototype = {
        init: function() {
            this.x = random(0, w);
            this.y = 0;
            this.v = random(1,2);
            this.h = random(0.9*h, 0.95*h);
            // 圆属性　
            this.r = random(1,5);
            this.vr = random(1,2);
            this.a = 1;
            this.va = 0.9;
        },
        draw: function() {
            if(this.y < this.h) {
                canContent.fillStyle = "#00ccb6";
                canContent.fillRect(this.x, this.y, 2, 6);
            } else {
                canContent.strokeStyle = "rgba(0,204,182"+this.a+")";
                canContent.beginPath();
                canContent.arc(this.x,this.y,this.r,0,Math.PI*2);
                canContent.stroke();
            }  
        },
        move: function() {
            if(this.y < this.h) {
                this.y += this.v;
            } else {
                if(this.a > 0.2 && this.r < 30) {
                    this.r += this.vr;
                    this.a *= this.va;
                } else {
                    this.init();
                }
            }
            this.draw()
        }
    }
    // 收集创建雨滴
    let rainArray = []
    //创建雨滴
    function clearRain() {
        var rain = new Rain;
        rain.init();
        rain.draw();
        rainArray.push(rain)
    };
    for(let i=0; i<30; i++) {
        setTimeout(clearRain,200*i);
    };
    //雨滴移动
    function moveRain() {
        canContent.fillStyle = "rgba(247,240,217,0.5)";
        canContent.fillRect(0,0,w,h);
        for(let i = 0; i<rainArray.length;i++) {
            rainArray[i].move();
        }
    }
    function timeOut(func, time) {
        func&&func();
        setTimeout(function() {
            timeOut.call(this, func, time);
        }.bind(this), time);
    };
    timeOut(moveRain, 1000/60);
};


//canvas点扩散spread
export function drawPointSpread(x,y,canContent) {
    function Point () {};
    Point.prototype = {
        init: function() {
            this.x = x;
            this.y = y;
            //圆
            this.r = 1;
            this.vr = random(1,1.5);
            this.a = 1;
            this.va = 0.9;
        },
        draw: function() {
            canContent.strokeStyle = "rgba(0,204,182"+this.a+")";
            canContent.beginPath();
            canContent.arc(this.x,this.y,this.r,0,Math.PI*2);
            canContent.stroke();
        },
        move: function() {
            if(this.a > 0.2) {
                this.r += this.vr;
                this.a *= this.va;
            } else {
                return;
            }
            this.draw();
        }
    };
    //创造点
    var point = new Point;
    point.init();
    point.draw();
    //点移动
    function movePoint() {
        point.move()
    }
    function timeOut(func, time) {
        func&&func();
        setTimeout(function() {
            timeOut.call(this, func, time)
        }.bind(this),time)
    }
    timeOut(movePoint, 1000/60);
}

//验证邮箱
export function verifyMail(mail) {
    let r = /^[\w.-]+@[a-zA-Z0-9]+(\.[a-z]+)+$/g;
    return r.test(mail)
}


//对象合并函数
