/**
 * DashLine 虚线
 * @parm from:Array  起点坐标组成的Array， [x0,y0];
 * @parm to:Array  终点坐标组成的Array， [x1,y1];
 * @parm lineColor:String 颜色，"#ff0000" 
 * @parm lineWidth:Number 宽度，1
 */

class DashLine extends Laya.Sprite {
	constructor(from,to,lineColor,lineWidth){
		super();
		this.cacheAs="bitmap";
		this.points = [];
	}
	drawTexture(from,to,lineColor,lineWidth){
		var color = lineColor || "#ffffff";
		var width = lineWidth || 1;
		var _to = [0,0];
		var _from = [0,0];
		to && (_to[0] = to[0] || 0);
		to && (_to[1] = to[1] || 0);
		from && (_from[0] = from[0] || 0);
		from && (_from[1] = from[1] || 0);
		var d_x = _to[0]-_from[0] ;
		var d_y = _to[1]-_from[1];
		var num = Math.floor(Math.sqrt(d_x*d_x + d_y*d_y)/(3*width));
		this.removeChildren();
		this.points = [];
		for(let i=0;i<num/3;i++){
			var point = new Laya.Sprite();
			var p_x = _from[0] + 3*i/num*d_x;
			var p_y = _from[1] + 3*i/num*d_y;
			//point.graphics.drawCircle(p_x,p_y,width,color);

			var src = "icon/ball.png";
			var res = Laya.loader.getRes(src);
			point.graphics.drawTexture(res, 0, 0);
			point.pivot(20,20);
			point.scale(.5,.5);
			point.pos(p_x,p_y);
			this.points.push(point);
		}
		for(var i in this.points){
			this.addChild(this.points[i]);
		}
	}
}