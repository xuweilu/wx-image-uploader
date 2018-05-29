var areTwoArraysIdentical = function(array1, array2) {
  var totalCount = array1.length, isIdentical = true, i;
  for (i = 0; i < totalCount; i++) {
    if(!isIdentical) {
      return isIdentical;
    }
    isIdentical = array1[i] === array2[i];
  }
  return isIdentical;
};

var checkOrientation = function(canvasId) {
  if(!canvasId) {
    throw Error('must have canvasId');
  }
  const ctx = wx.createCanvasContext(canvasId);
  ctx.setFillStyle("red");
  ctx.fillRect(0,0,1,1);
  ctx.setFillStyle("yellow");
  ctx.fillRect(1,1,1,1);
  ctx.draw(false, () => {
    wx.canvasGetImageData({
      //调用wx.canvasGetImageData获得返回像素点数据，并与已知像素点数据比较是否相同。
      canvasId: canvasId,
      x: 0,
      y: 0,
      width: 2,
      height: 2,
      success(res) {
        var expectedFirstPoint = [255, 0, 0, 255];
        var expectedLastPoint = [255, 255, 0, 255];
        var w = res.width;
        var h = res.height;
        var data = res.data;
        var totalCount = w*h*4;
        var realFirstPoint = data.slice(0,4);
        var realLastPoint = data.slice(totalCount - 4, totalCount);
        var isOrientationRight = areTwoArraysIdentical(expectedFirstPoint, realFirstPoint) && areTwoArraysIdentical(expectedLastPoint, realLastPoint);
        try {
          wx.setStorageSync('isOrientationRight', isOrientationRight);
        } catch(ex) {
          console.error(ex.message);
        };
        console.log('isOrientationRight: ' + isOrientationRight);
      }
    })
  });
};

module.exports = checkOrientation;
