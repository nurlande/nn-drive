import React from 'react'
import Navigation from '../Core/Navigation'
import UploadForm from './UploadForm'

export default function Admin () {
    const naviHistory = 
        [
            {label: "Home", link: null}, 
            {label: "Admin", link: "/admin"}, 
        ];
    return (
        <div>
            <Navigation naviHistory={naviHistory}/>
            <UploadForm />
        </div>
    )
}