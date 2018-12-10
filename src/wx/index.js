// src/myOpenDataContext/index.js
/*
  wx.onMessage(data => {
  console.log(data)
  /* {
    text: 'hello',
    year: 2018
  } */
//})

/*
wx.setUserCloudStorage({
  KVDataList:[
   { key:"score1",
    value:"100"
  }
  ],
  success:(res)=>{
    console.log("res",res);
  }
})
*/
// src/myOpenDataContext/index.j//


let sharedCanvas = wx.getSharedCanvas()


function drawRankList (data) {

  console.log("data",data);
  data.forEach((item, index) => {
    let sharedCanvas = wx.getSharedCanvas();
    let context = sharedCanvas.getContext('2d')
    var avatarUrl =   wx.createImage();
    avatarUrl.src = item.avatarUrl;
    context.font="120px Georgia";
    context.fillStyle="#0000ff";
     context.drawImage(avatarUrl,100,200*index);
      context.fillText("100",400,200*index,);
    /*
    avatarUrl.onload=function(){
      context.drawImage(avatarUrl,100,200*index);
      context.fillText("100",400,200*index,);
      context.fillText(item.nickname,600,200*index,);
    }*/
  })
}

wx.getFriendCloudStorage({
  success: res => {
    let data = res.data
    drawRankList(data)
  }
})



