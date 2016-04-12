
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect'
import { Base } from '../src'
import Radium from 'radium'

const ConfiguredRadium = (component) => (
  Radium({
    plugins: [
      Radium.Plugins.mergeStyleArray,
      Radium.Plugins.checkProps,
      Radium.Plugins.resolveMediaQueries,
      Radium.Plugins.resolveInteractionStyles,
      Radium.Plugins.keyframes,
      Radium.Plugins.visited,
      Radium.Plugins.prefix,
      Radium.Plugins.checkProps
    ]
  })(component)
)

function getElement (output, tagName) {
  return ReactDOM.findDOMNode(
    TestUtils.findRenderedDOMComponentWithTag(output, tagName)
  )
}

// Prepare context for TargetComponent
const Contextify = (context) => (TargetComponent) => {
  const newClass = class extends React.Component {
    getChildContext () { return context.data }
    render () {
      return <TargetComponent {...this.props} />
    }
  }
  newClass.childContextTypes = context.types
  return newClass
}

describe('Radium', () => {
  let TestBase
  let output

  beforeEach(() => {
    const context = {
      types: {
        Radium: React.PropTypes.func,
        rebass: React.PropTypes.object
      },
      data: {
        Radium: ConfiguredRadium,
        rebass: {}
      }
    }
    TestBase = Contextify(context)(Base)
  })

  it('styles changed by :active pseudo class', () => {
    output = TestUtils.renderIntoDocument(
      <TestBase
        style={{
          color: 'blue',
          background: 'red',
          ':active': {
            color: 'green'
          }
        }}
        children='TestBase'
      />
    )
    const div = getElement(output, 'div')

    expect(div.style.color).toEqual('blue')
    expect(div.style.background).toEqual('red')

    TestUtils.Simulate.mouseDown(div)
    expect(div.style.color).toEqual('green')
  })
})
