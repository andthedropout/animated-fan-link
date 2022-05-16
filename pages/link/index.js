import Head from "next/head"
import {useRouter } from "next/router";
import React from "react";
import BackgroundBubble from "../../components/backgroundbubble"
import BackgroundColor from "../../components/backgroundcolor"
import BackgroundGradient from "../../components/backgroundgradient"
import BackgroundSunshine from "../../components/backgroundsunshine"
import LinkTreeLink from "../../components/linktreeLink"
import LinkTreeHero from "../../components/linktreeHero"


export default function Home() {

    const { query } = useRouter();
    
    if(useRouter().isReady) {
        import("react-facebook-pixel")
        .then((module) => module.default)
        .then((ReactPixel) => {
          ReactPixel.init(query.fb);
          ReactPixel.pageView();
        });
    };
  return (
    <>
    {useRouter().isReady && query.background == "sunshine" && <BackgroundSunshine></BackgroundSunshine>}    
    {useRouter().isReady && query.background == "bubble" &&  <BackgroundBubble color1={query.color1} color2={query.color2} color3={query.color3}></BackgroundBubble>}
    {useRouter().isReady && query.background == "solid" && <BackgroundColor color={query.color1}></BackgroundColor>}
    {useRouter().isReady && query.background == "gradient" && <BackgroundGradient color1={query.color1} color2={query.color2}></BackgroundGradient>}

    <div className="absolute top-0 mt-8 w-full flex-auto flex-row flex justify-center drop-shadow-md hover:drop-shadow-xl">
        <div className="max-w-md w-full">
        <LinkTreeHero link={query.youtube}></LinkTreeHero>
            {query.spotify && <LinkTreeLink link={query.spotify} logo="spotify" height="30" width="100"></LinkTreeLink>}
            {query.apple && <LinkTreeLink link={query.apple} logo="apple-music" height="30" width="100"></LinkTreeLink>}
            {query.soundcloud && <LinkTreeLink link={query.soundcloud} logo="soundcloud" height="20" width="110"></LinkTreeLink>}
            {query.bandcamp && <LinkTreeLink link={query.bandcamp} logo="bandcamp" height="30" width="100"></LinkTreeLink>}
            {query.youtube && <LinkTreeLink link={"https://youtu.be/" + query.youtube} logo="youtube" height="20" width="100"></LinkTreeLink>}
        </div>
    </div>
  </>
  )
}
