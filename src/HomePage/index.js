import React from "react";
import Navigation from "../Core/Navigation";

// import Header from "../Header/Header"
import FileList from "./FileList";

function Home(props) {

    const folderName = props.match.params.folderName;
    const searchKey = props.match.params.key;
    const naviHistory = 
    [       
        {label: "Home", link: null}, 
        {label: folderName ? folderName : searchKey, link: folderName ? folderName : searchKey}
    ]

    return (
        <div>
            {/* <Header/> */}
            <Navigation naviHistory={naviHistory}/>
            <FileList folderName={folderName} searchKey={searchKey}/>
        </div>
    );
}

export default Home;