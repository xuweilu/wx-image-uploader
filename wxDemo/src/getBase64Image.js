var upng = require('./upng-js/UPNG.js');

var reversedata = function(res) {
  var w = res.width;
  var h = res.height;
  let con = 0;
  for (var i = 0; i < h / 2; i++) {
    for (var j = 0; j < w * 4; j++) {
      con = res.data[(i * w * 4 + j) + ""];
      res.data[(i * w * 4 + j) + ""] = res.data[((h - i - 1) * w * 4 + j) + ""];
      res.data[((h - i - 1) * w * 4 + j) + ""] = con;
    }
  }
  return res;
};

var getBase64Image = function (canvasId, imgUrl, callback, imgWidth, imgHeight) {
  if (!canvasId) {
    throw Error('must have canvasId');
  }
  const ctx = wx.createCanvasContext(canvasId);
  ctx.drawImage(imgUrl, 0, 0, imgWidth || 300, imgHeight || 200);
  ctx.draw(false, () => {
    // API 1.9.0 获取图像数据
    wx.canvasGetImageData({
      canvasId: canvasId,
      x: 0,
      y: 0,
      width: imgWidth || 300,
      height: imgHeight || 200,
      success(res) {
        var result;
        var isOrientationRight = wx.getStorageSync('isOrientationRight');
        //根据之前获得的当前设备canvas导出图片是否正常来确定是否反转上传图片
        if (isOrientationRight) {
          result = res;
        } else {
          result = reversedata(res);
        }
        try {
          // png编码
          var pngData = upng.encode([result.data.buffer], result.width, result.height);
          // base64编码
          var base64 = wx.arrayBufferToBase64(pngData);
          var base64Data = 'data:image/png;base64,' + base64;
          callback(base64Data);
        }catch(ex) {
          console.error(ex.message);
          callback(false);
        }
      }
    })
  })
};

module.exports = getBase64Image;
