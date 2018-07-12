import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import toJson from 'enzyme-to-json'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import {App} from './App'

configure({ adapter: new Adapter() })

describe('App tests', () => {
    const mock = new MockAdapter(axios)
    beforeEach(() => {
        jest.restoreAllMocks()
        mock.onGet('https://api.github.com/users/boom').reply(200, {
            avatar_url: 'avatar_url',
            user: 'user',
            location: 'location',
            email: 'email',
            html_url: 'html_url'
        })
    })

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

    test('request user profile', done => {
        const customDispatch = jest.fn()
        const component = shallow(<App dispatch={customDispatch}/>)

        component.instance().setState({
            enteredName: 'boom'
        })

        component.instance().checkUserHandler()

        setImmediate(() => {
            expect(customDispatch).toHaveBeenCalledWith(
                {
                    'data': {
                        'user': {
                            'avatar_url': 'avatar_url',
                            'email': 'email',
                            'html_url': 'html_url',
                            'location': 'location',
                            'user': 'user'
                        }
                    },
                    'type': 'USER_FETCHED_SUCCESSFUL'
                }
            )
            done()
        })
    })

})