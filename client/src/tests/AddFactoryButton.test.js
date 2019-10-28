import AddFactoryButton from '../components/factory/AddFactoryButton'

import React from 'react'
import { create, act } from 'react-test-renderer'

describe('Add Factory Button', () => {
  test('it renders as button', () => {
    let component
    act(() => {
      component = create(
        <AddFactoryButton
          addFactory={factory => {
            console.log(factory)
          }}
        />
      )
    })
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('handles click', () => {
    let component
    act(() => {
      component = create(
        <AddFactoryButton
          addFactory={factory => {
            console.log(factory)
          }}
        />
      )
    })
    let tree = component.toJSON()
    act(() => {
      tree.props.onClick()
    })
    // re-rendering
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
