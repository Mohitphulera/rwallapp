import React from 'react'
import ReactDom from 'react-dom'
import PostModal from './../PostModal'
import {isTSAnyKeyword} from  '@babel/types'
import { Provider } from 'react-redux'
import { store } from './../../store'
import renderer from "react-test-renderer"

it("renders without crashing",()=> {
    const div = document.createElement("div");
    ReactDom.render( <Provider store={store}>
        <PostModal />
      </Provider>,div);

})

it("matches snapshot & renders correctly",() => {
    const tree=renderer.create(<Provider store={store}>
        <PostModal />
      </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
})