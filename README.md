# cesium-navigation-umd

## 使用说明

- 如果你的Cesium没有挂载在window下，那么修改`src/cesium/Cesium.js`，改为你对应的引用，然后运行`npm run build`

- 在html文件中引用Cesium和Cesium必要样式表

- 在html文件中引用`CesiumNavigation.umd.js`和`cesium-navigation.css`
- 初始化viewer 调用` CesiumNavigation.umd(viewer, options)`

```javascript

var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: false,
    baseLayerPicker: false,
    timeline: false,
    infoBox: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    animation: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false
});

var options = {};

// 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
options.defaultResetView = Cesium.Rectangle.fromDegrees(80, 22, 130, 50);
// 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
options.enableCompass = true;
// 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
options.enableZoomControls = true;
// 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
options.enableDistanceLegend = true;
// 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
options.enableCompassOuterRing = true;


CesiumNavigation.umd(viewer, options);

```

## 编译说明

```bash
npm run build 
```

## 感谢作者的源码

[原作者的主页](https://github.com/worlddai/cesium-navigation-umd)