import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import "./Core.css"

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            naviHistory: []
        }
    }
    componentDidMount () {
        
        this.setState({
            naviHistory: this.props.naviHistory 
        })
    }

    render() {
        return (
            <div>
                <Breadcrumb>
                    {this.state.naviHistory.map((nav, i) => <Breadcrumb.Item key={i} href={nav.link}>{nav.label}</Breadcrumb.Item>)}
                </Breadcrumb>
            </div>
        )
    }
}

export default Navigation;