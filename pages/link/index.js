import Head from "next/head"
import { Router, useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import Background from "../../components/background"


export default function Home() {

    const { query } = useRouter();
    
    if(useRouter().isReady) {
        import("react-facebook-pixel")
        .then((module) => module.default)
        .then((ReactPixel) => {
          ReactPixel.init(query.fb);
          ReactPixel.pageView();
        //   router.events.on("routeChangeComplete", () => {
        //     ReactPixel.pageView();
        //   });
        });
    };


    // http://localhost:3000/page1?soundcloud=kasnsdf&backgroundcolor=333&youtube=3333333&fb=2081861651937507
  return (
    <>
    <Head>
    <title>The Dropout</title>
    <meta property="og:image" content="/static/_.svg" />
    <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>

    {useRouter().isReady && <Background color1={query.color1} color2={query.color2} color3={query.color3}></Background>}

    <div style={{height: "100vh;"}}>
      
      <div class="row center top linksmaster">
                      <div class="col col-lg-3 col-sm-12 col-med-6 link-body">
                          <div class="link-container-wrap">
                              <div class="link-container">
                                  <div class="link-container-body">
                                      <div class="row middle link-cover-wrap">
                                          <div class="col col-lg-12 col-sm-12 link-cover">{query.youtube && <iframe width="100%" height="300" src={"https://www.youtube.com/embed/" + query.youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
                                            <span>
                                                  <div id="link-player" class="link-player">
                                                      <div class="td tdrow player dark feed" data-reactid=".3gj">
                                                          <div id="" class="tdcolumns tdlarge-12 tdsmall-12 tdlarge-centered tdsmall-centered"
                                                              data-reactid=".3gj.0">
                                                              <div id="" class="tdcolumns tdlarge-2 tdsmall-12 header" data-reactid=".3gj.0.0">
                                                                  <div id="" class="tdcolumns tdlarge-12 tdsmall-12 cover"
                                                                      data-reactid=".3gj.0.0.0">
                                                                      <div class="feed-cover" data-reactid=".3gj.0.0.0.0"><img
                                                                          data-reactid=".3gj.0.0.0.0.0"></img></div>
                                                                      <div class="controls" data-reactid=".3gj.0.0.0.1">
                                                                          <div id="" class="tdcolumns tdlarge-12 tdsmall-12 buttons"
                                                                              data-reactid=".3gj.0.0.0.1.0">
                                                                                  </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              <div id="" class="tdcolumns tdlarge-10 tdsmall-12 feed-container"
                                                                  data-reactid=".3gj.0.1">
                                                                  <div class="tdrow tdrow info-feed" id="" data-reactid=".3gj.0.1.0">
                                                                      <div id="" class="tdcolumns tdlarge-12 tdsmall-12 info"
                                                                          data-reactid=".3gj.0.1.0.0">
                                                                          <div id="" class="tdcolumns tdlarge-12 tdsmall-12 song-name"
                                                                              data-reactid=".3gj.0.1.0.0.0"><a target="_blank"
                                                                                  data-reactid=".3gj.0.1.0.0.0.0"></a></div>
                                                                          <div id="" class="tdcolumns tdlarge-12 tdsmall-12 artist-name"
                                                                              data-reactid=".3gj.0.1.0.0.1"><a target="_blank"
                                                                                  data-reactid=".3gj.0.1.0.0.1.0"></a></div>
                                                                      </div>
                                                                  </div>
                                                                  <div class="tdrow social" id="" data-reactid=".3gj.0.1.1">
                                                                      <div id="" class="tdcolumns tdlarge-12 tdsmall-12 current-song-info"
                                                                          data-reactid=".3gj.0.1.1.0">
                                                                          <div id="" class="tdcolumns tdlarge-10 tdsmall-10 track-info-plays"
                                                                              data-reactid=".3gj.0.1.1.0.0"><i
                                                                                  class="tdicon-play-circle-fill current-song-social-icon"
                                                                                  data-reactid=".3gj.0.1.1.0.0.0"></i><span
                                                                                      data-reactid=".3gj.0.1.1.0.0.1">-</span></div>
                                                                          <div id="" class="tdcolumns tdlarge-2 tdsmall-2 feed-buttons"
                                                                              data-reactid=".3gj.0.1.1.0.1">
                                                                              <div id="" class="tdcolumns tdlarge-12 tdsmall-12 follow"
                                                                                  data-reactid=".3gj.0.1.1.0.1.0"><a
                                                                                      class="tdbutton expand follow-link" target="_blank"
                                                                                      data-reactid=".3gj.0.1.1.0.1.0.0"><i
                                                                                          class="tdicon-soundcloud playlist-social-icon"
                                                                                          data-reactid=".3gj.0.1.1.0.1.0.0.0"></i></a></div>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </span>
                                          </div>
                                      </div>
                                      <div id="spotify" class="row middle link-options">
                                      {query.spotify && 
                                          <a href="/static/redirect/spotify.html" class="col col-lg-12 col-sm-12 link-option-row ">
                                              <div class="row middle">
                                                  <div class="col col-lg-7 col-sm-7 col-med-7 link-option-row-title"><span><img
                                                      class="link-option-row-img" src="static/images/spotify.png"></img></span></div>
                                                  <div class="col col-lg-5 col-sm-5 col-med-5 link-option-row-action">Play</div>
                                              </div>
                                          </a>
                                      }
                                          {query.apple && 
                                          <a id="apple" href="/static/redirect/apple.html" class="col col-lg-12 col-sm-12 link-option-row ">
                                              <div class="row middle">
                                                  <div class="col col-lg-7 col-sm-7 col-med-7 link-option-row-title"><span><img
                                                      class="link-option-row-img" src="static/images/apple-music.png"></img></span></div>
                                                  <div class="col col-lg-5 col-sm-5 col-med-5 link-option-row-action">Play</div>
                                              </div>
                                          </a>
                                            }
                                          {query.bandcamp && 
                                          <a href="/static/redirect/bandcamp.html" class="col col-lg-12 col-sm-12 link-option-row ">
                                              <div class="row middle">
                                                  <div class="col col-lg-7 col-sm-7 col-med-7 link-option-row-title"><span><img
                                                      class="link-option-row-img" src="static/images/bandcamp-logotype-light-128.png"></img></span></div>
                                                  <div class="col col-lg-5 col-sm-5 col-med-5 link-option-row-action">Play</div>
                                              </div>
                                          </a>
                                            }
                                          {query.youtube && 
                                          <a id="youtube" href="/static/redirect/youtube.html" class="col col-lg-12 col-sm-12 link-option-row ">
                                              <div class="row middle">
                                                  <div class="col col-lg-7 col-sm-7 col-med-7 link-option-row-title"><span><img
                                                      class="link-option-row-img" src="static/images/youtube.png"></img></span></div>
                                                  <div class="col col-lg-5 col-sm-5 col-med-5 link-option-row-action">Play</div>
                                              </div>
                                          </a>
                                            }
                                          {query.soundcloud && 
                                          <a id="soundcloud" href="/static/redirect/soundcloud.html" class="col col-lg-12 col-sm-12 link-option-row ">
                                              <div class="row middle">
                                                  <div class="col col-lg-7 col-sm-7 col-med-7 link-option-row-title"><span><img
                                                      class="link-option-row-img" src="static/images/soundcloud.png"></img></span></div>
                                                  <div class="col col-lg-5 col-sm-5 col-med-5 link-option-row-action">Play</div>
                                              </div>
                                          </a>
                                          }
                                          
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  
      <div>

        
      </div>




      </div>
  </>
  )
}
