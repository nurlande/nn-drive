import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { useSelector } from 'react-redux';
import "./Core.css"

function Navigation(props) {

    let files = useSelector(state => state.files.data)
    console.log(files)

    return (
        <div>
            <Breadcrumb>
                {files && files.navigation.map((nav, i) => <Breadcrumb.Item key={i}>{nav.name}</Breadcrumb.Item>)}
            </Breadcrumb>
        </div>
    )
}

export default Navigation;