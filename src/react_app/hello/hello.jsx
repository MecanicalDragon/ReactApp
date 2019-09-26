import React, {Fragment} from 'react';

//  parentheses mean no code within, automatically return specified fragment
//  braces mean component include some code, need return statement
const HelloWorld = ({name, children}) => (
    // return (
    <Fragment>
        <h3>Ave, {name || 'World'}</h3>
        {children[0]}
    </Fragment>
    // )
);

export default HelloWorld;