import React from "react";

const BackgroundColor = (props) => {
        return(
            <div style={{backgroundColor: "#" + props.color, width: "100vw", height: "100vh", position: "absolute"}}>
            </div>
        )}
export default BackgroundColor