import React from "react";
import Navigation from "../Core/Navigation";

import FileList from "./FileList";


function Home(props) {

    const folderId = props.match.params.folderId;

    return (
        <div>
            <Navigation/>
            <FileList folderId={folderId}/>
        </div>
    );
}

export default Home;