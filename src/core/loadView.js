/* eslint-disable no-unused-vars */
import Cesium from '../cesium/Cesium'
import createFragmentFromTemplate from './createFragmentFromTemplate'
var getElement = Cesium.getElement
var Knockout = Cesium.knockout

var loadView = function (htmlString, container, viewModel) {
  container = getElement(container)

  var fragment = createFragmentFromTemplate(htmlString)

  var nodes = []

  var i
  for (i = 0; i < fragment.childNodes.length; ++i) {
    nodes.push(fragment.childNodes[i])
  }

  container.appendChild(fragment)

  for (i = 0; i < nodes.length; ++i) {
    var node = nodes[i]
    if (node.nodeType === 1 || node.nodeType === 8) {
      Knockout.applyBindings(viewModel, node)
    }
  }

  return nodes
}

export default loadView
