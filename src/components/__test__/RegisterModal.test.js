import React from 'react'
import ReactDom from 'react-dom'
import RegisterModal from './../RegisterModal'
import {isTSAnyKeyword} from  '@babel/types'
import { Provider } from 'react-redux'
import { store } from './../../store'
import renderer from "react-test-renderer"

it("renders without crashing",()=> {
    const div = document.createElement("div");
    ReactDom.render( <Provider store={store}>
        <RegisterModal />
      </Provider>,div);

})

it("matches snapshot & renders correctly",() => {
    const tree=renderer.create(<Provider store={store}>
        <RegisterModal />
      </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
})