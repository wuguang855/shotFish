/*
 * 游戏关口
 */

class Gate extends Laya.Sprite {
    constructor(ops) {
        super();

        var clientHeight = Laya.Browser.clientHeight;
        var clientWidth = Laya.Browser.clientWidth;
        this.width = 1500;
        this.height = 1500 * clientHeight / clientWidth;

        //加载背景
        var mainBgSrc = ops.background;
        if (mainBgSrc) {
            this.mainBg = new Laya.Sprite();
            var mainBgRes = Laya.loader.getRes(mainBgSrc);
            this.mainBg.width = this.width;
            this.mainBg.height = this.height;
            this.mainBg.graphics.drawTexture(mainBgRes, 0, 0, this.width, this.height);
            this.mainBg.pos(0, 0);
            Laya.stage.addChild(this.mainBg);
        }


        //加载数字
        this.num = new DYNumber(0);
        this.addChild(this.num);
        this.pos(100, 100)


        //加载枪支
        this.gun = new Gun([this.width / 2, this.height - 300]);
        //    this.gun = new Gun([0, this.height-300]);

        this.addChild(this.gun);

        //添加子弹的例子


        //储存靶子和屏幕上的子弹
        this.targets = new Array();
        this.balls = new Array();





        //未发射的球的数量
        this.ballsNum = 1;

        //分数
        this.score = 0;

        //控住属性
        this.pause = false;
        this.time = 0;
        this.lastTimeStamp = new Date().getTime();


        //击中回调事件
        this.onshot = ops.onshot || function () {
            console.log("打中了~");
        }
        //脱靶回调事件
        this.onmiss = ops.onmiss || function () {
            console.log("脱靶了~");
        }

        //成功事件
        this.success = ops.success || function () {
            console.log("成功了~");
        }
        //失败事件
        this.onfail = ops.onfail || function () {
            console.log("失败了~");
        }

        //判断两个区域是否有重叠
        var someAreaOverlay = function (area1, area2) {
            var a1_min_x = area1[0];
            var a1_min_y = area1[1];
            var a2_min_x = area2[0];
            var a2_min_y = area2[1];
            var a1_max_x = area1[2];
            var a1_max_y = area1[3];
            var a2_max_x = area2[2];
            var a2_max_y = area2[3];
            var p1 = [],
                p2 = [];
            p1.x = Math.max(a1_min_x, a2_min_x);
            p1.y = Math.max(a1_min_y, a2_min_y);
            p2.x = Math.min(a1_max_x, a2_max_x);
            p2.y = Math.min(a1_max_y, a2_max_y);
            return (p2.x > p1.x && p2.y > p1.y);
        }

        var index = 400;

        Laya.timer.loop(1000 / 60, this, function () {

            //更新游戏时间
            var timeStamp = new Date().getTime();
            if (!this.pause) {
                this.time += timeStamp - this.lastTimeStamp;
            }
            this.lastTimeStamp = timeStamp;

            //更新靶子的数量


            //更新靶子的状态
            for (let i = 0; i < this.targets.length; i++) {
                this.targets[i].updata(this.time);
                var screenContactArea = [-200, -200, this.width + 200, this.height + 200];
                var bridIsOut = !someAreaOverlay(this.targets[i].contactArea, screenContactArea);
                if (bridIsOut) {
                    // this.removeTarget(i);
                    this.targets[i].brithDate = this.time;
                }
            }
            //更新球的状态
            for (let i = 0; i < this.balls.length; i++) {
                var ball_opts;
                var old = this.balls[i],
                    o_spe = old.speed,
                    o_deg = old.deg / 180 * Math.PI,
                    o_posx = old.postion[0],
                    o_posy = old.postion[1],
                    del_time = 1;
                var speed_x = o_spe * Math.sin(o_deg),
                    speed_y = o_spe * Math.cos(o_deg);
                o_posx += speed_x * del_time;
                o_posy -= speed_y * del_time;
                var postion = [o_posx, o_posy];
                ball_opts = {
                    postion: postion,
                    deg: old.deg
                }
                this.balls[i].setStatus(ball_opts);
                //球的当前碰撞区域与屏幕碰撞区域无重叠移除此球，并且执行XX
                var ballContactArea = this.balls[i].contactArea;
                var screenContactArea = [-200, -200, this.width + 200, this.height + 200];
                var ballIsOut = !someAreaOverlay(ballContactArea, screenContactArea);
                ballIsOut && this.removeBall(i);
                ballIsOut && this.onmiss();

                //ball与targets 的碰撞事件
                for (let j = 0; j < this.targets.length; j++) {
                    if (someAreaOverlay(ballContactArea, this.targets[j].contactArea)) {
                        var dispelEffect = new DispelEffect(postion, this.targets[j].score);
                        this.addChild(dispelEffect);
                        dispelEffect.emit();
                        this.setScore(this.score + this.targets[j].score);
                        this.removeBall(i);
                        this.removeTarget(j);
                        this.onshot();
                        this.ballsNum++;
                    }
                }

            }

            index++

            //console.log(index);
            //添加鸟
            if (this.targets.length < 7 && index >= 100) {
                index = 0
                var i = Math.round(Math.random() * 6) + 1;
                var opts_brid = allfish["type" + i]();
                //   var opts_brid = allfish["type"+7]();
                opts_brid.time = this.time;
                this.addTarget(opts_brid);
            }
        });





        var dashLine = new DashLine();

        function touchStart(e) {
            this.addChild(dashLine);
            touchMove.call(this, e);
        }

        function touchMove(e) {
            var x = e.stageX;
            var y = e.stageY;

            var gun_x = this.gun.postion[0];
            var gun_y = this.gun.postion[1];

            this.gun.trunTo(Math.atan2(x - gun_x, gun_y - y) / Math.PI * 180);
            var postion = this.gun.muzzle;
            var dx = x - postion[0];
            var dy = y - postion[1];
            var deg = Math.atan2(dx, -dy) / Math.PI * 180;
            dashLine.drawTexture([postion[0], postion[1]], [x, y], "#ff00ff", 5);
        }

        function touchEnd(e) {
            var x = e.stageX;
            var y = e.stageY;
            var gun_x = this.gun.postion[0];
            var gun_y = this.gun.postion[1];
            this.gun.trunTo(Math.atan2(x - gun_x, gun_y - y) / Math.PI * 180);
            var postion = this.gun.muzzle;
            var dx = x - postion[0];
            var dy = postion[1] - y;
            var deg = Math.atan2(dx, dy) / Math.PI * 180;
            this.removeChild(dashLine);
            var ball_opts = {
                postion: postion,
                deg: deg
            };
            if (this.ballsNum >= 1) {
                this.addBall(ball_opts);
                this.ballsNum--;
            }

        }
        setTimeout(() => {
            this.on(Laya.Event.MOUSE_DOWN, this, touchStart);
            this.on(Laya.Event.MOUSE_MOVE, this, touchMove);
            this.on(Laya.Event.MOUSE_UP, this, touchEnd);
        }, 100)

    }
    addTarget(opts) {
        var target = new Target(opts);
        this.addChild(target);
        this.targets.push(target);
    }
    removeTarget(index) {
        var target = this.targets[index];
        this.removeChild(target);
        this.targets.splice(index, 1);
    }
    addBall(opts) {
        var ball = new Ball(opts);
        this.addChild(ball);
        this.balls.push(ball);
    }
    setScore(score) {
        this.score = score;
        this.num.draw(this.score);
    }
    removeBall(index) {
        var ball = this.balls[index];
        this.removeChild(ball);
        this.balls.splice(index, 1);
    }

}