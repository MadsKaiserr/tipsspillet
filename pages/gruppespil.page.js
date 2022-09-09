import * as React from 'react';
import { useState, useEffect } from 'react';
import FindComponent from './components/find';
import Head from 'next/head'
import Header from './layout/header';
 
function Gruppespil () {

    return (
        <>
            <Head>
                <title>Find gruppespil og præmiedyster - Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/gruppespil" />
                <meta name="description" content="Opret gruppespil eller tilmeld præmiedyster, og dyst gratis mod venner og familie i fodbold-betting med virtuelle penge." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="gruppespil,betting gruppespil" />
                <meta itemProp="name" content="Tipsspillet Gruppespil" />
                <meta itemProp="description" content="Opret gruppespil eller tilmeld præmiedyster, og dyst gratis mod venner og familie i fodbold-betting med virtuelle penge." />
                <meta property="og:title" content="Find gruppespil og præmiedyster - Tipsspillet" />
                <meta property="og:description" content="Opret gruppespil eller tilmeld præmiedyster, og dyst gratis mod venner og familie i fodbold-betting med virtuelle penge." />
            </Head>
            <Header />
            <div className="pages-top">
                <div className="pages-where">
                    <h2 className="pages-where-h1">Gruppespil</h2>
                    <div className="pages-where-splitter"></div>
                    <h3 className="pages-where-h2">Lav kupon</h3>
                </div>
                <h1 className="pages-h1"><div className="main-component-h">
                            <span>F</span>
                            <span>i</span>
                            <span>n</span>
                            <span>d</span>
                            &nbsp;
                            <span>d</span>
                            <span>e</span>
                            <span>t</span>
                            &nbsp;
                            <span>g</span>
                            <span>r</span>
                            <span>u</span>
                            <span>p</span>
                            <span>p</span>
                            <span>e</span>
                            <span>s</span>
                            <span>p</span>
                            <span>i</span>
                            <span>l</span>
                            <span>,</span>
                        </div>
                        <div className="main-component-h">
                            <span>s</span>
                            <span>o</span>
                            <span>m</span>
                            &nbsp;
                            <span>p</span>
                            <span>a</span>
                            <span>s</span>
                            <span>s</span>
                            <span>e</span>
                            <span>r</span>
                            &nbsp;
                            <span>d</span>
                            <span>i</span>
                            <span>g</span>
                            <span>.</span>
                </div></h1>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="pages-parent"><path className="pages-wave" fillOpacity="1" d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,133.3C672,139,768,149,864,181.3C960,213,1056,267,1152,261.3C1248,256,1344,192,1392,160L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            <div className="findComp">
                <FindComponent />
            </div>
        </>
    )
}
 
export default Gruppespil;