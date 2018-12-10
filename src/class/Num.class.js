/**
 * num 数字
 *@pram position:Array 枪所渲染的位置
 * 
 * 
 */

class DYNumber extends Laya.Sprite {
	constructor(n,type) {
		super();
		this.draw(n,type);
	}
	draw(n,type) {
		this.removeChildren();

		var num = type==1?("p" + n + ""):( n + "");
		var posx = 0;
		var num_width = 10;
		for (var i in num) {
			var value = num[i];
			var sp = new Laya.Sprite();
			var res = Laya.loader.getRes("num/n_" + value + ".png");
			sp.graphics.drawTexture(res, 0, 0);
			sp.pos(posx, 0);
			this.addChild(sp);
			posx += res.sourceWidth + num_width;
		}
	}
}