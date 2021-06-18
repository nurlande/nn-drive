import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { useSelector, useDispatch } from 'react-redux';
import {getAllAsync} from "../_actions/files.actions"
import { history } from "../_helpers";
import "./Core.css"

function Navigation(props) {

    let files = useSelector(state => state.files.data)
    const dispatch = useDispatch();
    console.log(files)

    const openFolder = (nav) => {
        dispatch(getAllAsync(nav.id));
        history.push("/folder/" + nav.id);
    }
    return (
        <div>
            <Breadcrumb>
                {files && files.navigation.map((nav, i) => <Breadcrumb.Item key={i} onClick={() => openFolder(nav)}>{nav.name}</Breadcrumb.Item>)}
            </Breadcrumb>
        </div>
    )
}

export default Navigation;