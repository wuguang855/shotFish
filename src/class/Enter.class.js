class EnterPage extends Laya.Sprite {
    constructor(){
        super();
        var clientHeight = Laya.Browser.clientHeight;
        var clientWidth = Laya.Browser.clientWidth;
        this.width = 1500;
        this.height = 1500*clientHeight/clientWidth;

        var loginBg = new Laya.Sprite();
        const loginBgSrc = "res/imgs/login_bg.jpg";
        loginBg.loadImage(loginBgSrc,0,0, this.width, this.height);
        this.addChild(loginBg);
        const progressBarBg = "res/imgs/progress_bar.png";
        this.progressBar = new Laya.ProgressBar(progressBarBg);
        this.progressBar.width = 1000;
        this.progressBar.pos(250,2000);
        this.progressBar.sizeGrid = "40,40,40,40";
        this.addChild(this.progressBar);

    }
    processed(cb,scope){

        //开始按钮
        this.openBtn = new Laya.Sprite();
        var openBtnSrc = "icon/btn_open.png";
        var openBtnRes = Laya.loader.getRes(openBtnSrc);
        const openBtnWidth =  openBtnRes.width*2;
        const openBtnHeight = openBtnRes.height*2;
        const openBtnX = (this.width- openBtnWidth)/2;
        const openBtnY = this.height * .6;
        this.openBtn.width = openBtnWidth ;
        this.openBtn.height = openBtnHeight;
        this.openBtn.graphics.drawTexture(openBtnRes, 0, 0,openBtnWidth,openBtnHeight);
        this.openBtn.pos(openBtnX,openBtnY);

        //音乐开关
        this.soundBtn =  new Laya.Sprite();
        var soundBtnSrc = "icon/ico_set.png";
        var soundBtnRes = Laya.loader.getRes(soundBtnSrc);
        const soundBtnWidth =  soundBtnRes.width*2;
        const soundBtnHeight = soundBtnRes.height*2;
        const soundBtnX = (this.width- soundBtnWidth)/2;
        const soundBtnY = this.height * .68;
        this.soundBtn.width = soundBtnWidth;
        this.soundBtn.height = soundBtnHeight;
        this.soundBtn.graphics.drawTexture(soundBtnRes, 0, 0,soundBtnWidth,soundBtnHeight);
        this.soundBtn.pos(soundBtnX,soundBtnY);
   
        //添加背景音乐
        laya.media.SoundManager.playMusic(SOUNDS.music, 0,null, null, 5);	
	
     
        //排行
        this.topListBtn =  new Laya.Sprite();
        var topListBtnSrc = "icon/btn_top10.png";
        var topListBtnRes = Laya.loader.getRes(topListBtnSrc);
        const topListBtnWidth =  topListBtnRes.width*2;
        const topListBtnHeight = topListBtnRes.height*2;
        const topListBtnX = (this.width- topListBtnWidth)/2;
        const topListBtnY = this.height * .76;
        this.topListBtn.width = topListBtnWidth;
        this.topListBtn.height = topListBtnHeight;
        this.topListBtn.graphics.drawTexture(topListBtnRes, 0, 0,topListBtnWidth,topListBtnHeight);
        this.topListBtn.pos(topListBtnX,topListBtnY);

        this.addChild(this.openBtn);
        this.addChild(this.soundBtn);
        this.addChild(this.topListBtn);

/*
        let openDataContext = wx.getOpenDataContext()
        openDataContext.postMessage({
          text: 'hello',
          year: (new Date()).getFullYear()
        })

*/




        this.removeChild(this.progressBar);
        this.openBtn.on(Laya.Event.CLICK,this,function(){
            this.removeSelf();
            cb.call(scope)
        });
    }
}