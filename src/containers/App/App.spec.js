import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import toJson from 'enzyme-to-json'
import {App} from './App'

configure({ adapter: new Adapter() })

describe('App tests', () => {
  test('Input user and start request', () => {
      const customDispatch = jest.fn()
      const component = mount(<App dispatch={customDispatch}/>)
      component.instance().onUserSuccess = jest.fn()
      component.instance().changeInputHandler({target: {value: 'boom'}})

      expect(component.instance().state.enteredName).toEqual('boom')
      component.instance().checkUserHandler()

      expect(customDispatch).toHaveBeenCalledWith({type: 'FETCHING_USER'})
  })

    test('Render component with isProcessing prop', () => {
        const component = shallow(<App isProcessing/>)
        expect(toJson(component)).toMatchSnapshot()
    })

    test('Render component with profile', () => {
        const customGitUser = {
            avatar_url: 'avatar_url',
            user: 'user',
            location: 'location',
            email: 'email',
            blog: 'blog'
        }
        const component = mount(<App isProcessing={false} gitUser={customGitUser} />)
        expect(toJson(component)).toMatchSnapshot()
    })
})