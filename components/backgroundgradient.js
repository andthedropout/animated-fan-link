import React from "react";

const BackgroundGradient = (props) => {
        return(
            <div style={{background: "linear-gradient(0deg, #" + props.color1 + " 25%, #" + props.color2 + " 70%)", width: "100vw", height: "100vh", position: "absolute"}}>
            </div>
        )}
export default BackgroundGradient