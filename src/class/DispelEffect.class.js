/*
* 
**/

class DispelEffect extends Laya.Sprite {
	constructor(point,score) {
		super();
		if(score){
			this.num = new DYNumber(score,1);
			var colorMatrix = [
				100, 0, 0, 0, 0, //R
				0, 255, 0, 0, 0, //G
				0, 0, 100, 0, 0, //B
				0, 0, 0, .2, 0, //A
			];
			//创建红色颜色滤镜
			var colorFilter = new Laya.ColorFilter(colorMatrix);

			//this.num.filters = [colorFilter];

			this.pos(-100,-100);
		}
		this.effect = new Laya.Animation();
		this.sound = SOUNDS.sound;
		var effectsrc = [
			"yw/yuwang1.png",
			"yw/yuwang2.png",
			"yw/yuwang3.png",
			"yw/yuwang4.png",
			"yw/yuwang5.png"
		];
		this.effect.interval = 1000/60*10;
		Laya.Animation.createFrames(effectsrc,"DispelEffect");
		var res = Laya.loader.getRes(this.sound);
		laya.media.SoundManager.playSound(this.sound, 1,null, null, 5);	
		this.effect.on(Laya.Event.COMPLETE,this,this.onPlayComplete);
		var  effectRes = Laya.loader.getRes(effectsrc[0]);
		this.pivotx = effectRes.sourceWidth/2;
		this.pivoty = effectRes.sourceHeight/2;
		this.effect.pos(0,0);
		this.addChild(this.effect);
		this.pivot(this.pivotx,this.pivoty);
		this.pos(point[0],point[1]);
		this.scale(1,1);
		this.postion =point;
		this.contactArea = [this.postion[0]-this.pivotx,this.postion[1]-this.pivoty,this.postion[1]+this.pivotx,this.postion[1]+this.pivoty];
	}
	onPlayComplete(){
		this.removeSelf();
	}
	emit(){
		this.addChild(this.num,1);
		this.effect.play(0,false,"DispelEffect",false);
	}
}
