/**
 * Gun 枪
 *@pram position:Array 枪所渲染的位置
 * 
 * 
 */

class Gun extends Laya.Sprite {
	constructor(position){
		super();

		var src = "icon/shot.png";
		var res = Laya.loader.getRes(src);
		this.pivotx = res.sourceWidth/2;
		this.pivoty = res.sourceHeight/3*2;
		this.graphics.drawTexture(res, 0, 0);
		position && (position[0] = position[0] - this.pivotx);
		this.pivot(this.pivotx,this.pivoty);
		var deg = 0; 
		this.postion = position;
		if(position){
			this.pos(position[0],position[1]);   
		}
		this.trunTo(0);
	}
	trunTo(deg){
		this.rotation = deg;
		var d = (360-this.rotation)*Math.PI/180;
		var radius = - this.pivotx -20;
		var _x = this.x;
		var _y = this.y;
		var x1 = _x + ( radius * Math.sin(d)) ; 
		var y1 = _y + ( radius * Math.cos(d));
		this.muzzle=[x1,y1];
	}
}
