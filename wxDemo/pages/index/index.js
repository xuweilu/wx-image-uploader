var helper = require('../../src/index.js');
Page({
  data: {
    x: 0,
    y: 0,
    areaWith: 750,
    areaHeight: 750,
    imgUrl: '',
    imagewidth: '',
    imageheight: '',
    base64: ''
  },
  onReady: function() {
    // 首次进入，利用隐藏的judgeCanvas判断当前导出图像是否颠倒
    helper.checkOrientation('judgeCanvas');
  },
  uploadImage: function (e) {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log('res');
        console.log(res);

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        _this.setData({
          imgUrl: tempFilePaths[0]
        })
      }
    })
  },
  imageReponseToBox: function (e) {
    var imageSize = {};
    var originalWidth = e.detail.width;//图片原始宽 
    var originalHeight = e.detail.height;//图片原始高 
    var originalScale = originalHeight / originalWidth;//图片高宽比 
    console.log('originalWidth: ' + originalWidth)
    console.log('originalHeight: ' + originalHeight)
    //获取屏幕宽高 
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        var windowscale = windowHeight / windowWidth;//屏幕高宽比 
        console.log('windowWidth: ' + windowWidth)
        console.log('windowHeight: ' + windowHeight)
        if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比 
          //图片缩放后的宽为屏幕宽 
          imageSize.imageWidth = windowWidth;
          imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
        } else {//图片高宽比大于屏幕高宽比 
          //图片缩放后的高为屏幕高 
          imageSize.imageHeight = windowHeight;
          imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
        }
      }
    })
    console.log('缩放后的宽: ' + imageSize.imageWidth)
    console.log('缩放后的高: ' + imageSize.imageHeight)
    return imageSize;
  },
  imageLoad: function (e) {
    var imageSize = this.imageReponseToBox(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  processImage: function () {
    var _this = this;
    helper.getBase64Image('myCanvas', this.data.imgUrl, function(data){
      _this.setData({
        base64: data
      });
    });
  }
})