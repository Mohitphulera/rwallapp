import React from 'react'
import ReactDom from 'react-dom'
import Post from './../Post'
import {isTSAnyKeyword} from  '@babel/types'

import renderer from "react-test-renderer"

it("renders without crashing",()=> {
    const div = document.createElement("div");
    const post={author:{username:"mohit"},message:"hello i am there",timestamp:"2020-09-26T17:09:30.715855Z"}
    ReactDom.render(<Post post={post}/>,div)

})


it("matches snapshot & renders correctly",() => {
    const post={author:{username:"mohit"},message:"hello i am there",timestamp:"2020-09-26T17:09:30.715855Z"}
    const tree=renderer.create(<Post post={post}/>).toJSON();
    expect(tree).toMatchSnapshot();
})