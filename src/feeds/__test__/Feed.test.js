import React from 'react'
import ReactDom from 'react-dom'
import Feed from './../Feed'
import {isTSAnyKeyword} from  '@babel/types'
import renderer from "react-test-renderer"

it("renders without crashing",()=> {
    const div = document.createElement("div");
    ReactDom.render(<Feed />,div)

})

it("matches snapshot & renders correctly",() => {
    const tree=renderer.create(<Feed/>).toJSON();
    expect(tree).toMatchSnapshot();
})