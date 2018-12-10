// 排行榜弹窗
class RandList extends Laya.Sprite {
    constructor(opts){
        super();
        this.openDataContext = wx.getOpenDataContext(); 
        this.sharedCanvas = Laya.Browser.window.sharedCanvas;
        this.sharedCanvas.width = 1600;
        this.sharedCanvas.height = 1200;

        //this. 


        this.listTexture = new Laya.Texture(this.sharedCanvas);
        
       
        


/*
 // sharedCanvasTexture = new Laya.Texture(this.canvas);
openDataContext.postMessage({
  text: 'hello',
  year: (new Date()).getFullYear()
})
*/
    }
    draw(){
        console.log("renderrender===>",);
       
        //this.texture.bitmap.alwaysChange = false;
        this.graphics.drawTexture(this.listTexture, 50, 50);
    }
}
