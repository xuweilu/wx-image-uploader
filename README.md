# Transform image to base64 data in weixin mini program.

> Use weixin mini program native [wx.canvasGetImageData](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/get-image-data.htmland) and upng API to transform image to base64.

## Contents

* [Main](#main)
* [Getting started](#getting-started)

## Main

```text
src/
├── index.js        (Main output)
├── checkOriention.js    (check if the output image's orientation is right)
├── getBase64Image.js    (get base64 data from an image)
└── upng-js (dependency)
```

## Getting Started

### Usage

#### Syntax

Because weixin mini program cannot use npm package, you should copy src directory to your program root directory.

```js
var helper = require('../../src/index.js');

helper.checkOrientation(checkCanvasId);

helper.getBase64Image(workCanvasId, imgUrl, callback, imgWidth, imgHeight);
```

**checkCanvasId**

* Type: `String`

* Required

A hidden canvas just for checking if the orientation is right, should be like

```html
<canvas style="width:2px;height:2px;visibility:hidden;" canvas-id="checkCanvas"></canvas>
```

Then the `checkCanvasId` is `'checkCanvas'`

**workCanvasId**

* Type: `String`
* Required

This is the main canvas to handle all logics to transform the image, we should put our image into this canvas and then pass its id to the function.

``` html
 <canvas style="width: 300px; height: 200px;" canvas-id="workCanvas"></canvas>
```

Then the `workCanvasId` is `'workCanvas'`

#### Example
```html
<canvas style="width: 300px; height: 200px;" canvas-id="workCanvas"></canvas>
<canvas style="width:2px;height:2px;visibility:hidden;" canvas-id="checkCanvas"></canvas>
```

When first time load the app, run this command:

```js
var helper = require('../../src/index.js');
Page({
...
  onReady: function() {
    // 首次进入，利用隐藏的judgeCanvas判断当前导出图像是否颠倒
    helper.checkOrientation('checkCanvas');
  },
     
  // Then use helper.getBase64Image to transfrom image anywhere you want.
  transformImage: function () {
    var _this = this;
    helper.getBase64Image('workCanvas', imgUrl, function(base64data){
        // work with the base64 data
        ...
    });
  }
...
})
```