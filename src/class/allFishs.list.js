
// 速度 【低 中 高】  speed  = 1 2 5;
// 高度 【低 中 高】  height =  800 1600 2000  +- 200
// 路径 
/*
4）螺纹线                  x = Math.sin(t) + t ; y = cos(t)  + 
4）螺纹线 加速线				 x = Math.sin(t) + t*t ; y = cos(t)  + 
1）匀速直线				x = t ;y = height
2）加速直线				x = t*t ;y = height



!/
allFish.
*/

var allfish = new Object();


//type1 螺旋曲线
allfish.type1 = function () {

    var speed = [.2, .4, 1];
    var height = [1200, 800, 400];
    var h = height[0] + 600 * Math.random();
    var r1 = 50 + 50 * Math.random();
    var r2 =  50 + 50 * Math.random();
    return {
        type: 1,
        score: 5,
        path: {
            x: function (t) {
                return Math.cos(t / 720) * r1 + t / 25 * speed[1]*3 - 100;
            },
            y: function (t) {
                return Math.sin(t / 720) * r2 + h;
            }
        },
        scale: 2
    };
};

//加速曲线
allfish.type2 = function () {
    var speed = [.2, .4, 1];
    var height = [1200, 800, 400];
    var h = height[2] + 600 * Math.random();
 		var r1 = 50 + 50 * Math.random();
    var r2 =  50 + 50 * Math.random();
    return {
        type: 2,
        score: 1,
        path: {
            x: function (t) {
                return Math.sin(t / 720) * r1 + t * t / 3075 * speed[0];
            },
            y: function (t) {
                return Math.cos(t / 720) * r2 + h;
            }
        },
        scale: 3
    }
};

allfish.type3 = function () {
    var speed = [.2, .4, 1];
    var height = [1200, 800, 400];
	var r1 = 50 + 50 * Math.random();
    var r2 =  50 + 50 * Math.random();
    var h = height[1] + 600 * Math.random();
    return {
        type: 3,
        score: 2,
        path: {
            x: function (t) {
                return (t / 15);
            },
            y: function (t) {
                return h;
            }
        },
        scale: 2.5
    }
};

allfish.type4 = function () {
    var speed = [.2, .4, 1];
    var height = [1200, 800, 400];
	var r1 = 50 + 50 * Math.random();
    var r2 =  50 + 50 * Math.random();
    var h = height[2] + 600 * Math.random();

    return {
        type: 4,
        score: 20,
        path: {
            x: function (t) {
                return 1500-(t * t / 3075) * speed[0];
            },
            y: function (t) {
                return h;
            }
        },
        scale: 1
    }
}

//3）正弦线				 x = Math.sin(t) + t*t ; y =  + 
allfish.type5 = function () {
    var speed = [.2, .4, 1];
    var height = [1200, 800, 400];
	var r1 = 50 + 50 * Math.random();
    var r2 =  50 + 50 * Math.random();
    var h = height[0] + 600 * Math.random();
    return {
        type: 5,
        score: 5,
        path: {
            x: function (t) {
                return t / 5;
            },
            y: function (t) {
                return Math.sin(t / 720) * r1 + h;
            }
        },
        scale: 2
    }
};

allfish.type6 = function () {
    var speed = [.2, .4, 1];
    var height = [1200, 800, 400];
	var r1 = 50 + 50 * Math.random();
    var r2 =  50 + 50 * Math.random();
    var h = height[1] + 600 * Math.random();
    return {
        type: 7,
        score: 10,
        path: {
            x: function (t) {
                return 1500 - t * t / 9000 ;
            },
            y: function (t) {
                return Math.sin(t / 180) * r1 + h;
            }
        },
        scale: 1
    }
};
//4）右上到坐下				x = - t y =t
//5）左上到右下				x = t y = -t

//6 右下到右上				x = t y = t
//左下到右上				x = -t y = -t


allfish.type7 = function () {
    var speed = [.2, .4, 1];
    var height = [1200, 800, 400];
    var r1 = 200 + 100 * Math.random();
    var r2 = 200 * Math.random();
    var h = height[2] + 600 * Math.random();

    return {
        type: 6,
        score: 30,
        path: {
            x: function (t) {
                return 1500 - t / 525 * r1;
            },
            y: function (t) {
                return h;
            }
        },
        scale: .6
    }
};