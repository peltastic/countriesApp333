import React from "react";


import Filters from "../Filters/Filters"
import "./Layout.css"


const layout = (props) => {
    return(
        <React.Fragment>
            <Filters clicked={props.clicked} change={props.change}/>
            <main>{props.children}</main>
        </React.Fragment>
    )
}

export default layout