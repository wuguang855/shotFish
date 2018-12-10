//射击目标
/**
	opts = {
			type:1,//类型 1~7
			color:[255,255,255],//滤镜颜色 rgb
			path:{		//飞行路径，x，y 关于 t的函数
					x:(t)=>{return 100;}, 
					y:(t)=>{return 100;},
			},
			scale:1,//大小
			halo:[255,255,255] //光晕颜色 rgb
	}
	//新增属性
		lifeTime:0,// 目标时间， 用于计算位置 单位毫秒
		contactArea:[20,20,100,100],//碰撞区域

	//新增方法
		updata(time) //更新当前时间
**/

class Target extends Laya.Animation {
	constructor(opts) {
		opts = opts || {};
		super();    
		this.score = opts.score || 0;
		var AllSourse= {
			"fly_1":[
				"fish/fish1_0.png",
				"fish/fish1_1.png",
				"fish/fish1_2.png",
				"fish/fish1_3.png"
			],
			"fly_2":[
			"fish/fish2_0.png",
			"fish/fish2_1.png",
			"fish/fish2_2.png",
			"fish/fish2_3.png"
			],
			"fly_3" : [
				"fish/fish3_0.png",
				"fish/fish3_1.png",
				"fish/fish3_2.png",
				"fish/fish3_3.png"
			],
			"fly_4":[
				"fish/fish4_0.png",
				"fish/fish4_1.png",
				"fish/fish4_2.png",
				"fish/fish4_3.png",
				"fish/fish4_4.png",
				"fish/fish4_5.png",
				"fish/fish4_6.png"
			],
			"fly_5":[
				"fish/fish5_0.png",
				"fish/fish5_1.png",
				"fish/fish5_2.png",
				"fish/fish5_3.png"
			],
			"fly_6":[
				"fish/fish6_0.png",
				"fish/fish6_1.png"
			],
			"fly_7":[
				"fish/fish7_0.png",
				"fish/fish7_1.png",
				"fish/fish7_2.png",
				"fish/fish7_3.png",
			]
		}

		for(var key in AllSourse ){
			Laya.Animation.createFrames(AllSourse[key],key);
		}

		this.type = opts.type || 1;

		this.scaleNum = opts.scale || 1;


		this.scale(this.scaleNum,this.scaleNum);

		//飞行路径，x，y 关于 t的函数
		var default_path = {		
			x:(t)=>{return 100;}, 
			y:(t)=>{return 100;},
		}
		this.path = opts.path || default_path;

		this.interval = 1000/60*10;
		//颜色滤镜
		if(opts.color){
			var red = opts.color[0];
			var green = opts.color[1];
			var blue = opts.color[2];
			var alpha = opts.color[3] || 1	
			var colorMatrix = [
				red/255, 0, 0, 0, 0, //R
				0, green/255, 0, 0, 0, //G
				0, 0, blue/255, 0, 0, //B
				0, 0, 0, alpha, 0, //A
			];
			//创建红色颜色滤镜
			var colorFilter = new Laya.ColorFilter(colorMatrix);
		}

		//光晕滤镜
		if(opts.halo){
			var rgbToHex = function (r, g, b) { 
				return "#"+((r << 16) | (g << 8) | b).toString(16); 
			}
			var glowFilter = new Laya.GlowFilter(rgbToHex(...opts.halo),10,0,0);
		}
		
		this.filters=[];
		glowFilter && this.filters.push(glowFilter);
		colorFilter && this.filters.push(colorFilter);
		this.name =  "fly_"+this.type;
		var  res = Laya.loader.getRes(AllSourse[this.name][0]);
		this.pivotx = res.sourceWidth/2;
		this.pivoty = res.sourceHeight/2;
		this.pivot(this.pivotx,this.pivoty);
		this.play(0,true,this.name,false);	
		this.brithDate = opts.time ||0;
		this.updata(this.brithDate);

	}
	updata(timeStamp){
		//更新时间
		this.time = timeStamp - this.brithDate;

		//是否转向 true 表示需要转，false 表示不需要
		this.direction = (this.path.x(this.time) - this.path.x(this.time+1))<0;
		if(this.direction){
			this.transform =new Laya.Matrix(-this.scaleNum,0,0,this.scaleNum,0,0);
		}else{
			this.transform =new Laya.Matrix(this.scaleNum,0,0,this.scaleNum,0,0);
		}		
		//更新位置
		!this.postion &&  (this.postion = [0,0]);
		this.postion[0] = this.path.x(this.time);
		this.postion[1] = this.path.y(this.time);
		this.pos(this.postion[0],this.postion[1]);
		//更新碰撞区
		this.contactArea = [this.postion[0]-this.pivotx*this.scaleNum,this.postion[1]-this.pivoty*this.scaleNum,this.postion[0]+this.pivotx*this.scaleNum,this.postion[1]+this.pivoty*this.scaleNum];
	}
};
