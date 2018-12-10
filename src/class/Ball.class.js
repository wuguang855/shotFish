// 飞行物
class Ball extends Laya.Sprite {
    constructor(opts){
    	opts = opts || {};
        super();
        var src = "icon/ball.png";
        var res = Laya.loader.getRes(src);
        this.pivotx = res.sourceWidth/2;
		this.pivoty = res.sourceHeight/2;
		this.graphics.drawTexture(res, 0, 0);
		this.pivot(this.pivotx,this.pivoty);
        var glowFilter = new Laya.GlowFilter("#ff0000",10,0,10);
        this.scale(1,1);
		this.filters = [glowFilter];
        this.setStatus(opts);
    }
    setStatus(opts){
		this.speed = opts.speed || 40;
        this.postion = opts.postion || this.postion || [ 0, 0 ];
        this.pos(this.postion[0],this.postion[1]);
        this.deg = opts.deg || this.deg || 0;
        this.rotation =  this.deg;
        this.contactArea = [this.postion[0]-this.pivotx,this.postion[1]-this.pivoty,this.postion[0]+this.pivotx,this.postion[1]+this.pivoty];
    }
}
