import Cesium from '../cesium/Cesium'
import loadView from '../core/loadView'
import ResetViewNavigationControl from './ResetViewNavigationControl'
import ZoomNavigationControl from './ZoomNavigationControl'
import svgCompassOuterRing from '../svgPaths/svgCompassOuterRing'
import svgCompassGyro from '../svgPaths/svgCompassGyro'
import svgCompassRotationMarker from '../svgPaths/svgCompassRotationMarker'
import Utils from '../core/Utils'
var defined = Cesium.defined
var CesiumMath = Cesium.Math
var getTimestamp = Cesium.getTimestamp
var EventHelper = Cesium.EventHelper
var Transforms = Cesium.Transforms
var SceneMode = Cesium.SceneMode
var Cartesian2 = Cesium.Cartesian2
var Cartesian3 = Cesium.Cartesian3
var Matrix4 = Cesium.Matrix4
var BoundingSphere = Cesium.BoundingSphere
var HeadingPitchRange = Cesium.HeadingPitchRange
var Knockout = Cesium.knockout

var NavigationViewModel = function (options) {
  this.terria = options.terria
  this.eventHelper = new EventHelper()
  this.enableZoomControls = (defined(options.enableZoomControls)) ? options.enableZoomControls : true
  this.enableCompass = (defined(options.enableCompass)) ? options.enableCompass : true
  this.navigationLocked = false;
  this.compassPosition = (defined( this.terria.options.compassPosition)) ? this.terria.options.compassPosition : {
    bottom:"12rem",
    right:"0rem"
  };
  this.zoomPosition = (defined(this.terria.options.zoomPosition)) ?  this.terria.options.zoomPosition : {
      bottom:"4rem",
      right:"1.5rem"
  };

  this.controls = options.controls
  if (!defined(this.controls)) {
    this.controls = [
      new ZoomNavigationControl(this.terria, true),
      new ResetViewNavigationControl(this.terria),      
      new ZoomNavigationControl(this.terria, false)
    ]
  }

  this.svgCompassOuterRing = svgCompassOuterRing
  this.svgCompassGyro = svgCompassGyro
  this.svgCompassRotationMarker = svgCompassRotationMarker

  this.showCompass = defined(this.terria) && this.enableCompass
  this.heading = this.showCompass ? this.terria.scene.camera.heading : 0.0

  this.isOrbiting = false
  this.orbitCursorAngle = 0
  this.orbitCursorOpacity = 0.0
  this.orbitLastTimestamp = 0
  this.orbitFrame = undefined
  this.orbitIsLook = false
  this.orbitMouseMoveFunction = undefined
  this.orbitMouseUpFunction = undefined

  this.isRotating = false
  this.rotateInitialCursorAngle = undefined
  this.rotateFrame = undefined
  this.rotateIsLook = false
  this.rotateMouseMoveFunction = undefined
  this.rotateMouseUpFunction = undefined

  this._unsubcribeFromPostRender = undefined

  Knockout.track(this, ['controls', 'showCompass', 'heading', 'isOrbiting', 'orbitCursorAngle', 'isRotating'])

  var that = this

  NavigationViewModel.prototype.setNavigationLocked = function (locked) {
    this.navigationLocked = locked
    if (this.controls && this.controls.length > 1) {
      this.controls[1].setNavigationLocked(this.navigationLocked)
    }
  }

  function widgetChange () {
    if (defined(that.terria)) {
      if (that._unsubcribeFromPostRender) {
        that._unsubcribeFromPostRender()
        that._unsubcribeFromPostRender = undefined
      }

      that.showCompass = true && that.enableCompass

      that._unsubcribeFromPostRender = that.terria.scene.postRender.addEventListener(function () {
        that.heading = that.terria.scene.camera.heading
      })
    } else {
      if (that._unsubcribeFromPostRender) {
        that._unsubcribeFromPostRender()
        that._unsubcribeFromPostRender = undefined
      }
      that.showCompass = false
    }
  }

  this.eventHelper.add(this.terria.afterWidgetChanged, widgetChange, this)

  widgetChange()
}

NavigationViewModel.prototype.destroy = function () {
  this.eventHelper.removeAll()
}

NavigationViewModel.prototype.show = function (container) {
  var testing
  if (this.enableZoomControls && this.enableCompass) {
    testing = '<div class="compass" title="" data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick },style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.compassPosition.left + '\', bottom: \'' + this.compassPosition.bottom + '\', right: \'' + this.compassPosition.right + '\' }">' +
      '<div class="compass-outer-ring-background"></div>' +
      ' <div class="compass-rotation-marker" data-bind="visible: isOrbiting, style: { transform: \'rotate(-\' + orbitCursorAngle + \'rad)\', \'-webkit-transform\': \'rotate(-\' + orbitCursorAngle + \'rad)\', opacity: orbitCursorOpacity }, cesiumSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }"></div>' +
      ' <div class="compass-outer-ring" title="" data-bind="style: { transform: \'rotate(-\' + heading + \'rad)\', \'-webkit-transform\': \'rotate(-\' + heading + \'rad)\' }, cesiumSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }"></div>' +
      ' <div class="compass-gyro-background"></div>' +
      ' <div class="compass-gyro" data-bind="cesiumSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { \'compass-gyro-active\': isOrbiting }"></div>' +
      '</div>' +
      '<div class="navigation-controls" data-bind="style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.zoomPosition.left + '\', bottom: \'' + this.zoomPosition.bottom + '\', right: \'' + this.zoomPosition.right + '\' }">' +
      '<!-- ko foreach: controls -->' +
      '<div data-bind="click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? \'navigation-control-last\' : \'navigation-control\' ">' +
      '   <!-- ko if: $data.hasText -->' +
      '   <div data-bind="text: $data.text, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' +
      '   <!-- /ko -->' +
      '  <!-- ko ifnot: $data.hasText -->' +
      '  <div data-bind="cesiumSvgPath: { path: $data.svgIcon, width: $data.svgWidth, height: $data.svgHeight }, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' +
      '  <!-- /ko -->' +
      ' </div>' +
      ' <!-- /ko -->' +
      '</div>'
  } else if (!this.enableZoomControls && this.enableCompass) {
    testing = '<div class="compass" title="" data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick ,style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.compassPosition.left + '\', bottom: \'' + this.compassPosition.bottom + '\', right: \'' + this.compassPosition.right + '\'}">' +
      '<div class="compass-outer-ring-background"></div>' +
      ' <div class="compass-rotation-marker" data-bind="visible: isOrbiting, style: { transform: \'rotate(-\' + orbitCursorAngle + \'rad)\', \'-webkit-transform\': \'rotate(-\' + orbitCursorAngle + \'rad)\', opacity: orbitCursorOpacity }, cesiumSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }"></div>' +
      ' <div class="compass-outer-ring" title="" data-bind="style: { transform: \'rotate(-\' + heading + \'rad)\', \'-webkit-transform\': \'rotate(-\' + heading + \'rad)\' }, cesiumSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }"></div>' +
      ' <div class="compass-gyro-background"></div>' +
      ' <div class="compass-gyro" data-bind="cesiumSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { \'compass-gyro-active\': isOrbiting }"></div>' +
      '</div>' +
      '<div class="navigation-controls"  style="display: none;" data-bind="style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.zoomPosition.left + '\', bottom: \'' + this.zoomPosition.bottom + '\', right: \'' + this.zoomPosition.right + '\' }">' +
      '<!-- ko foreach: controls -->' +
      '<div data-bind="click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? \'navigation-control-last\' : \'navigation-control\' ">' +
      '   <!-- ko if: $data.hasText -->' +
      '   <div data-bind="text: $data.text, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' +
      '   <!-- /ko -->' +
      '  <!-- ko ifnot: $data.hasText -->' +
      '  <div data-bind="cesiumSvgPath: { path: $data.svgIcon, width: $data.svgWidth, height: $data.svgHeight }, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' +
      '  <!-- /ko -->' +
      ' </div>' +
      ' <!-- /ko -->' +
      '</div>'
  } else if (this.enableZoomControls && !this.enableCompass) {
    testing = '<div class="compass"  style="display: none;" title="" data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick,style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.compassPosition.left + '\', bottom: \'' + this.compassPosition.bottom + '\', right: \'' + this.compassPosition.right + '\'}">' +
      '<div class="compass-outer-ring-background"></div>' +
      ' <div class="compass-rotation-marker" data-bind="visible: isOrbiting, style: { transform: \'rotate(-\' + orbitCursorAngle + \'rad)\', \'-webkit-transform\': \'rotate(-\' + orbitCursorAngle + \'rad)\', opacity: orbitCursorOpacity }, cesiumSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }"></div>' +
      ' <div class="compass-outer-ring" title="" data-bind="style: { transform: \'rotate(-\' + heading + \'rad)\', \'-webkit-transform\': \'rotate(-\' + heading + \'rad)\' }, cesiumSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }"></div>' +
      ' <div class="compass-gyro-background"></div>' +
      ' <div class="compass-gyro" data-bind="cesiumSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { \'compass-gyro-active\': isOrbiting }"></div>' +
      '</div>' +
      '<div class="navigation-controls"  data-bind="style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.zoomPosition.left + '\', bottom: \'' + this.zoomPosition.bottom + '\', right: \'' + this.zoomPosition.right + '\' }" >' +
      '<!-- ko foreach: controls -->' +
      '<div data-bind="click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? \'navigation-control-last\' : \'navigation-control\' ">' +
      '   <!-- ko if: $data.hasText -->' +
      '   <div data-bind="text: $data.text, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' +
      '   <!-- /ko -->' +
      '  <!-- ko ifnot: $data.hasText -->' +
      '  <div data-bind="cesiumSvgPath: { path: $data.svgIcon, width: $data.svgWidth, height: $data.svgHeight }, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' +
      '  <!-- /ko -->' +
      ' </div>' +
      ' <!-- /ko -->' +
      '</div>'
  } else if (!this.enableZoomControls && !this.enableCompass) {
    testing = '<div class="compass"  style="display: none;" title="" data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick,style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.compassPosition.left + '\', bottom: \'' + this.compassPosition.bottom + '\', right: \'' + this.compassPosition.right + '\'}">' +
      '<div class="compass-outer-ring-background"></div>' +
      ' <div class="compass-rotation-marker" data-bind="visible: isOrbiting, style: { transform: \'rotate(-\' + orbitCursorAngle + \'rad)\', \'-webkit-transform\': \'rotate(-\' + orbitCursorAngle + \'rad)\', opacity: orbitCursorOpacity }, cesiumSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }"></div>' +
      ' <div class="compass-outer-ring" title="" data-bind="style: { transform: \'rotate(-\' + heading + \'rad)\', \'-webkit-transform\': \'rotate(-\' + heading + \'rad)\' }, cesiumSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }"></div>' +
      ' <div class="compass-gyro-background"></div>' +
      ' <div class="compass-gyro" data-bind="cesiumSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { \'compass-gyro-active\': isOrbiting }"></div>' +
      '</div>' +
      '<div class="navigation-controls"   style="display: none;" data-bind="style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.zoomPosition.left + '\', bottom: \'' + this.zoomPosition.bottom + '\', right: \'' + this.zoomPosition.right + '\' }">' +
      '<!-- ko foreach: controls -->' +
      '<div data-bind="click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? \'navigation-control-last\' : \'navigation-control\' ">' +
      '   <!-- ko if: $data.hasText -->' +
      '   <div data-bind="text: $data.text, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' +
      '   <!-- /ko -->' +
      '  <!-- ko ifnot: $data.hasText -->' +
      '  <div data-bind="cesiumSvgPath: { path: $data.svgIcon, width: $data.svgWidth, height: $data.svgHeight }, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' +
      '  <!-- /ko -->' +
      ' </div>' +
      ' <!-- /ko -->' +
      '</div>'
  }
  loadView(testing, container, this)
}

/**
 * Adds a control to this toolbar.
 * @param {NavControl} control The control to add.
 */
NavigationViewModel.prototype.add = function (control) {
  this.controls.push(control)
}

/**
 * Removes a control from this toolbar.
 * @param {NavControl} control The control to remove.
 */
NavigationViewModel.prototype.remove = function (control) {
  this.controls.remove(control)
}

/**
 * Checks if the control given is the last control in the control array.
 * @param {NavControl} control The control to remove.
 */
NavigationViewModel.prototype.isLastControl = function (control) {
  return (control === this.controls[this.controls.length - 1])
}

var vectorScratch = new Cartesian2()

NavigationViewModel.prototype.handleMouseDown = function (viewModel, e) {
  var scene = this.terria.scene
  if (scene.mode === SceneMode.MORPHING) {
    return true
  }
  if (viewModel.navigationLocked) {
    return true
  }

  var compassElement = e.currentTarget
  var compassRectangle = e.currentTarget.getBoundingClientRect()
  var maxDistance = compassRectangle.width / 2.0
  var center = new Cartesian2((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0)
  var clickLocation = new Cartesian2(e.clientX - compassRectangle.left, e.clientY - compassRectangle.top)
  var vector = Cartesian2.subtract(clickLocation, center, vectorScratch)
  var distanceFromCenter = Cartesian2.magnitude(vector)

  var distanceFraction = distanceFromCenter / maxDistance

  var nominalTotalRadius = 145
  var norminalGyroRadius = 50

  if (distanceFraction < norminalGyroRadius / nominalTotalRadius) {
    orbit(this, compassElement, vector)
  } else if (distanceFraction < 1.0) {
    rotate(this, compassElement, vector)
  } else {
    return true
  }
}

var oldTransformScratch = new Matrix4()
var newTransformScratch = new Matrix4()
var centerScratch = new Cartesian3()

NavigationViewModel.prototype.handleDoubleClick = function (viewModel, e) {
  var scene = viewModel.terria.scene
  var camera = scene.camera

  var sscc = scene.screenSpaceCameraController

  if (scene.mode === SceneMode.MORPHING || !sscc.enableInputs) {
    return true
  }
  if (viewModel.navigationLocked) {
    return true
  }
  if (scene.mode === SceneMode.COLUMBUS_VIEW && !sscc.enableTranslate) {
    return
  }
  if (scene.mode === SceneMode.SCENE3D || scene.mode === SceneMode.COLUMBUS_VIEW) {
    if (!sscc.enableLook) {
      return
    }

    if (scene.mode === SceneMode.SCENE3D) {
      if (!sscc.enableRotate) {
        return
      }
    }
  }

  var center = Utils.getCameraFocus(viewModel.terria, true, centerScratch)

  if (!defined(center)) {
    // Globe is barely visible, so reset to home view.
    this.controls[1].resetView()
    return
  }

  var cameraPosition = scene.globe.ellipsoid.cartographicToCartesian(camera.positionCartographic, new Cartesian3())

  var surfaceNormal = scene.globe.ellipsoid.geodeticSurfaceNormal(center)

  var focusBoundingSphere = new BoundingSphere(center, 0)

  camera.flyToBoundingSphere(focusBoundingSphere, {
    offset: new HeadingPitchRange(0,
      // do not use camera.pitch since the pitch at the center/target is required
      CesiumMath.PI_OVER_TWO - Cartesian3.angleBetween(
        surfaceNormal,
        camera.directionWC
      ),
      // camera.distanceToBoundingSphere(focusBoundingSphere)
      // instead calculate distance manually
      Cartesian3.distance(cameraPosition, center)
    ),
    duration: 1.5
  })
}

NavigationViewModel.create = function (options) {
  var result = new NavigationViewModel(options)
  result.show(options.container);
  return result ;
};

function orbit (viewModel, compassElement, cursorVector) {
  var scene = viewModel.terria.scene
  var sscc = scene.screenSpaceCameraController
  // do not orbit if it is disabled
  if (scene.mode === SceneMode.MORPHING || !sscc.enableInputs) {
    return
  }
  if (viewModel.navigationLocked) {
    return true
  };
  switch (scene.mode) {
    case SceneMode.COLUMBUS_VIEW:
      if (sscc.enableLook)   break;
      if (!sscc.enableTranslate || !sscc.enableTilt)  return;
      break
    case SceneMode.SCENE3D:
      if (sscc.enableLook) break;
      if (!sscc.enableTilt || !sscc.enableRotate) return;
      break
    case SceneMode.SCENE2D:
      if (!sscc.enableTranslate) return
      break
  }

  // Remove existing event handlers, if any.
  document.removeEventListener('mousemove', viewModel.orbitMouseMoveFunction, false)
  document.removeEventListener('mouseup', viewModel.orbitMouseUpFunction, false)

  if (defined(viewModel.orbitTickFunction)) {
    viewModel.terria.clock.onTick.removeEventListener(viewModel.orbitTickFunction)
  }

  viewModel.orbitMouseMoveFunction = undefined
  viewModel.orbitMouseUpFunction = undefined
  viewModel.orbitTickFunction = undefined

  viewModel.isOrbiting = true
  viewModel.orbitLastTimestamp = getTimestamp()

  var camera = scene.camera

  if (defined(viewModel.terria.trackedEntity)) {
    // when tracking an entity simply use that reference frame
    viewModel.orbitFrame = undefined
    viewModel.orbitIsLook = false
  } else {
    var center = Utils.getCameraFocus(viewModel.terria, true, centerScratch)

    if (!defined(center)) {
      viewModel.orbitFrame = Transforms.eastNorthUpToFixedFrame(camera.positionWC, scene.globe.ellipsoid, newTransformScratch)
      viewModel.orbitIsLook = true
    } else {
      viewModel.orbitFrame = Transforms.eastNorthUpToFixedFrame(center, scene.globe.ellipsoid, newTransformScratch)
      viewModel.orbitIsLook = false
    }
  }

  viewModel.orbitTickFunction = function (e) {
    var timestamp = getTimestamp()
    var deltaT = timestamp - viewModel.orbitLastTimestamp
    var rate = (viewModel.orbitCursorOpacity - 0.5) * 2.5 / 1000
    var distance = deltaT * rate

    var angle = viewModel.orbitCursorAngle + CesiumMath.PI_OVER_TWO
    var x = Math.cos(angle) * distance
    var y = Math.sin(angle) * distance

    var oldTransform

    if (viewModel.navigationLocked) {
      return true
    }

    if (defined(viewModel.orbitFrame)) {
      oldTransform = Matrix4.clone(camera.transform, oldTransformScratch)

      camera.lookAtTransform(viewModel.orbitFrame)
    }

    // do not look up/down or rotate in 2D mode
    if (scene.mode === SceneMode.SCENE2D) {
      camera.move(new Cartesian3(x, y, 0), Math.max(scene.canvas.clientWidth, scene.canvas.clientHeight) / 100 * camera.positionCartographic.height * distance)
    } else {
      if (viewModel.orbitIsLook) {
        camera.look(Cartesian3.UNIT_Z, -x)
        camera.look(camera.right, -y)
      } else {
        camera.rotateLeft(x)
        camera.rotateUp(y)
      }
    }
    if (defined(viewModel.orbitFrame)) {
      camera.lookAtTransform(oldTransform)
    }
    // viewModel.terria.cesium.notifyRepaintRequired();
    viewModel.orbitLastTimestamp = timestamp
  }

  function updateAngleAndOpacity (vector, compassWidth) {
    var angle = Math.atan2(-vector.y, vector.x)
    viewModel.orbitCursorAngle = CesiumMath.zeroToTwoPi(angle - CesiumMath.PI_OVER_TWO)
    var distance = Cartesian2.magnitude(vector)
    var maxDistance = compassWidth / 2.0
    var distanceFraction = Math.min(distance / maxDistance, 1.0)
    var easedOpacity = 0.5 * distanceFraction * distanceFraction + 0.5
    viewModel.orbitCursorOpacity = easedOpacity
    // viewModel.terria.cesium.notifyRepaintRequired();
  }

  viewModel.orbitMouseMoveFunction = function (e) {
    var compassRectangle = compassElement.getBoundingClientRect()
    var center = new Cartesian2((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0)
    var clickLocation = new Cartesian2(e.clientX - compassRectangle.left, e.clientY - compassRectangle.top)
    var vector = Cartesian2.subtract(clickLocation, center, vectorScratch)
    updateAngleAndOpacity(vector, compassRectangle.width)
  }

  viewModel.orbitMouseUpFunction = function (e) {
    // TODO: if mouse didn't move, reset view to looking down, north is up?
    viewModel.isOrbiting = false
    document.removeEventListener('mousemove', viewModel.orbitMouseMoveFunction, false)
    document.removeEventListener('mouseup', viewModel.orbitMouseUpFunction, false)

    if (defined(viewModel.orbitTickFunction)) {
      viewModel.terria.clock.onTick.removeEventListener(viewModel.orbitTickFunction)
    }

    viewModel.orbitMouseMoveFunction = undefined
    viewModel.orbitMouseUpFunction = undefined
    viewModel.orbitTickFunction = undefined
  }

  document.addEventListener('mousemove', viewModel.orbitMouseMoveFunction, false)
  document.addEventListener('mouseup', viewModel.orbitMouseUpFunction, false)
  viewModel.terria.clock.onTick.addEventListener(viewModel.orbitTickFunction)

  updateAngleAndOpacity(cursorVector, compassElement.getBoundingClientRect().width)
}

function rotate (viewModel, compassElement, cursorVector) {
  var scene = viewModel.terria.scene
  var camera = scene.camera

  var sscc = scene.screenSpaceCameraController
  // do not rotate in 2D mode or if rotating is disabled
  if (scene.mode === SceneMode.MORPHING || scene.mode === SceneMode.SCENE2D || !sscc.enableInputs) {
    return
  }
  if (viewModel.navigationLocked) {
    return true
  }

  if (!sscc.enableLook && (scene.mode === SceneMode.COLUMBUS_VIEW || (scene.mode === SceneMode.SCENE3D && !sscc.enableRotate))) {
    return
  }

  // Remove existing event handlers, if any.
  document.removeEventListener('mousemove', viewModel.rotateMouseMoveFunction, false)
  document.removeEventListener('mouseup', viewModel.rotateMouseUpFunction, false)

  viewModel.rotateMouseMoveFunction = undefined
  viewModel.rotateMouseUpFunction = undefined

  viewModel.isRotating = true
  viewModel.rotateInitialCursorAngle = Math.atan2(-cursorVector.y, cursorVector.x)

  if (defined(viewModel.terria.trackedEntity)) {
    // when tracking an entity simply use that reference frame
    viewModel.rotateFrame = undefined
    viewModel.rotateIsLook = false
  } else {
    var viewCenter = Utils.getCameraFocus(viewModel.terria, true, centerScratch)

    if (!defined(viewCenter) || (scene.mode === SceneMode.COLUMBUS_VIEW && !sscc.enableLook && !sscc.enableTranslate)) {
      viewModel.rotateFrame = Transforms.eastNorthUpToFixedFrame(camera.positionWC, scene.globe.ellipsoid, newTransformScratch)
      viewModel.rotateIsLook = true
    } else {
      viewModel.rotateFrame = Transforms.eastNorthUpToFixedFrame(viewCenter, scene.globe.ellipsoid, newTransformScratch)
      viewModel.rotateIsLook = false
    }
  }

  var oldTransform
  if (defined(viewModel.rotateFrame)) {
    oldTransform = Matrix4.clone(camera.transform, oldTransformScratch)
    camera.lookAtTransform(viewModel.rotateFrame)
  }

  viewModel.rotateInitialCameraAngle = -camera.heading

  if (defined(viewModel.rotateFrame)) {
    camera.lookAtTransform(oldTransform)
  }

  viewModel.rotateMouseMoveFunction = function (e) {
    var compassRectangle = compassElement.getBoundingClientRect()
    var center = new Cartesian2((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0)
    var clickLocation = new Cartesian2(e.clientX - compassRectangle.left, e.clientY - compassRectangle.top)
    var vector = Cartesian2.subtract(clickLocation, center, vectorScratch)
    var angle = Math.atan2(-vector.y, vector.x)

    var angleDifference = angle - viewModel.rotateInitialCursorAngle
    var newCameraAngle = CesiumMath.zeroToTwoPi(viewModel.rotateInitialCameraAngle - angleDifference)

    var camera = viewModel.terria.scene.camera

    var oldTransform
    if (defined(viewModel.rotateFrame)) {
      oldTransform = Matrix4.clone(camera.transform, oldTransformScratch)
      camera.lookAtTransform(viewModel.rotateFrame)
    }

    var currentCameraAngle = -camera.heading
    camera.rotateRight(newCameraAngle - currentCameraAngle)

    if (defined(viewModel.rotateFrame)) {
      camera.lookAtTransform(oldTransform)
    }

    // viewModel.terria.cesium.notifyRepaintRequired();
  }

  viewModel.rotateMouseUpFunction = function (e) {
    viewModel.isRotating = false
    document.removeEventListener('mousemove', viewModel.rotateMouseMoveFunction, false)
    document.removeEventListener('mouseup', viewModel.rotateMouseUpFunction, false)

    viewModel.rotateMouseMoveFunction = undefined
    viewModel.rotateMouseUpFunction = undefined
  }

  document.addEventListener('mousemove', viewModel.rotateMouseMoveFunction, false)
  document.addEventListener('mouseup', viewModel.rotateMouseUpFunction, false)
}

export default NavigationViewModel
