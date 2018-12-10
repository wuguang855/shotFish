var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;
var WebGL = laya.webgl.WebGL;



//初始化微信小游戏
Laya.MiniAdpter.init();

var clientHeight = Laya.Browser.clientHeight;
var clientWidth = Laya.Browser.clientWidth;

var width = 1500;
var height = 1500*clientHeight/clientWidth;

Laya.init(width, height, WebGL);

//Laya.Stat.show(200,0);

var Stage = Laya.stage;
Stage.alignV = Stage.ALIGN_MIDDLE;
Stage.alignH = Stage.ALIGN_CENTER;
Stage.scaleMode = "showall";
Stage.bgColor = "#00A0AA";

//加载资源
var resourse = new Array();

var IMGS = {
    mainBg:"res/imgs/login_bg.jpg",
    listBg:"res/imgs/show_bg.jpg"
};      
//type:Laya.Loader.ATLAS
var ATLASES = {
    fish:"res/atlas/fish.atlas",
	icon:"res/atlas/icon.atlas",
    num:"res/atlas/num.atlas",
    yw:"res/atlas/yw.atlas"
};
//type:Laya.Loader.SOUND
var SOUNDS = {
	sound:"res/sounds/sound.wav",
    music:"res/sounds/sound.wav",
};
for (var name in IMGS){
    resourse.push({url:IMGS[name],type:Laya.Loader.IMAGE});
}
for (var name in ATLASES){
    resourse.push({url:ATLASES[name],type:Laya.Loader.ATLAS});
}
for (var name in SOUNDS){
    resourse.push({url:SOUNDS[name],type:Laya.Loader.SOUND});
}

var enterPage = new EnterPage();
Laya.stage.addChild(enterPage);

//添加进度条到舞台上
Laya.loader.load(resourse,null,Laya.Handler.create(this,progressHandler,null,false));
function progressHandler(process){
    if(process<1){
        enterPage.progressBar.value = process;
    }else{
        enterPage.progressBar.value = process;
        enterPage.processed(startGame,this)
    }
}

function startGame(){
    Laya.stage.removeChild(enterPage);
    var ops = {
        background:IMGS.mainBg,

    }
    var gate = new Gate(ops);
    Laya.stage.addChild(gate);

    gate.onmiss=function(){
        Laya.stage.addChild(enterPage);
        Laya.stage.removeChild(gate);
    }
}


var randList =  new RandList();
Laya.stage.addChild(randList);

setTimeout(()=>{
    console.log("renderrender2223===>",);
    randList.draw();
},1000);

