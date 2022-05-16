import React from "react";
import Image from 'next/image'

const LinkTreeLink = (props) => {

        return(
            <div className="bg-neutral-900 hover:bg-neutral-700 border-b border-neutral-700 h-24">
                <a href={props.link}>
                    <div className="flex-row flex justify-between p-9 ">
                        <Image className="flex-col flex justify-center" src={"/static/images/" + props.logo + ".png"} width={props.width} height={props.height} />
                        <div className="text-white text-xs tracking-wider flex-col flex justify-center">PLAY</div>
                    </div>
                </a>
            </div>
        )}
    
export default LinkTreeLink;