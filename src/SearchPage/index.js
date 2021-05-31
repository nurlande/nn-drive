import React from "react";
import FileList from "./../HomePage/FileList";
import Navigation from "./../Core/Navigation";

function SearchPage(props) {

    const searchKey = props.match.params.searchKey;

    const naviHistory = 
    [       
        {label: searchKey, link: searchKey}
    ]

    return (
        <div>
            <Navigation naviHistory={naviHistory}/>
            <FileList searchKey={searchKey}/>
        </div>
    );
}

export default SearchPage;