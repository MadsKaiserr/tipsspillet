import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Header from './layout/header';
import Image from 'next/image'
import axios from "axios";
import FaqComponent from './components/faq';
import PriserComp from './components/priser';
import Spacer from './components/spacer';

import Banner from './img/logo-white.png';
 
function Blog () {

    const [currentType, setCurrentType] = useState("alle");

    function setType(type) {
        if (type === "nyheder") {
            document.getElementById("nyheder").className = "price-input-element-active";
            document.getElementById("introduktion").className = "price-input-element";
            document.getElementById("anbefalinger").className = "price-input-element";
            document.getElementById("alle").className = "price-input-element";
            setCurrentType("nyheder");
        } else if (type === "introduktion") {
            document.getElementById("introduktion").className = "price-input-element-active";
            document.getElementById("nyheder").className = "price-input-element";
            document.getElementById("anbefalinger").className = "price-input-element";
            document.getElementById("alle").className = "price-input-element";
            setCurrentType("introduktion");
        } else if (type === "alle") {
            document.getElementById("alle").className = "price-input-element-active";
            document.getElementById("nyheder").className = "price-input-element";
            document.getElementById("introduktion").className = "price-input-element";
            document.getElementById("anbefalinger").className = "price-input-element";
            setCurrentType("alle");
        } else if (type === "anbefalinger") {
            document.getElementById("alle").className = "price-input-element";
            document.getElementById("anbefalinger").className = "price-input-element-active";
            document.getElementById("nyheder").className = "price-input-element";
            document.getElementById("introduktion").className = "price-input-element";
            setCurrentType("anbefalinger");
        }
    }

    const [articles, setArticles] = useState([
        {
            id: 1,
            h1: "Introduktion til Tipsspillet",
            h2: "Bliv introduceret platformen, og find ud af hvordan du kommer igang",
            dato: "Tir. 13 sep.",
            author: "Mads Kaiser",
            type: "introduktion"
        }
    ])

    return (
        <>
            <Head>
                <title>Blog - Introduktion - Hjælp til at komme igang - Odds anbefalinger | Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/blog" />
                <meta name="description" content="Få hjælp til at komme igang på platformen, eller se de nyeste anbefalinger til odds fra profesionelle." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="tipsspillet introduktion, blog, tipsspillet blog, tipsspillet tips, tipsspillet kom igang, odds anbefalinger, odds tips og tricks, tipsspillet anbefalinger, bedste tipsspillet odds" />
                <meta itemProp="name" content="Tipsspillet Blog og Introduktion" />
                <meta itemProp="description" content="Få hjælp til at komme igang på platformen, eller se de nyeste anbefalinger til odds fra profesionelle." />
                <meta property="og:title" content="Blog - Introduktion - Hjælp til at komme igang - Odds anbefalinger | Tipsspillet" />
                <meta property="og:description" content="Få hjælp til at komme igang på platformen, eller se de nyeste anbefalinger til odds fra profesionelle." />
            </Head>
            <Header />
            <Spacer />
            <div className="main-container" style={{paddingBottom: "20px"}}>
                <div className="hero-text">
                    <p className="main-component-p animation-fadeleft">Tips og tricks - Hjælp til at komme igang</p>
                    <h1 className="main-component-h1 main-gradient animation-fadeleft animation-delay-200">Tipsspillets Blog</h1>
                    <h2 className="main-component-h3 animation-fadetop animation-delay-300">Få hjælp til at komme igang med Tipsspillet, eller få nyheder, anbefalinger fra <span className="color-primary font-weight-500">profesionelle</span> og meget mere.</h2>
                </div>
            </div>
            <div className="priser-container">
                <div className="section-price">
                    <div className="set-center">
                        <div className="price-input animation-fadeleft animation-delay-400">
                            <div className="price-input-element-active" id="alle" onClick={() => setType("alle")}>Alle</div>
                            <div className="price-input-element" id="introduktion" onClick={() => setType("introduktion")}>Introduktion</div>
                            <div className="price-input-element" id="nyheder" onClick={() => setType("nyheder")}>Nyheder</div>
                            <div className="price-input-element" id="anbefalinger" onClick={() => setType("anbefalinger")}>Anbefalinger</div>
                        </div>
                    </div>
                    <ul className="blog-container">
                        {articles.map((item) => {
                            if (currentType === "alle") {
                                return (
                                    <li key={item.h1} className="blog-element animation-fadetop" style={{animationDelay: "0.5s"}}>
                                        <Link href={"/blog/artikel?id=" + item.id}>
                                            <div>
                                                <div className="blog-img">
                                                    <Image width="80" height="80" src={Banner} />
                                                </div>
                                                <div className="blog-info">
                                                    <h2 className="blog-h2">{item.h1}</h2>
                                                    <h2 className="blog-h3">{item.h2}</h2>
                                                </div>
                                                <div className="blog-byline">
                                                    <div className="blog-byline-img"></div>
                                                    <div className="blog-byline-inline">
                                                        <p className="blog-byline-h1">{item.author}</p>
                                                        <p className="blog-byline-h2">{item.dato}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            } else {
                                if (item.type === currentType) {
                                    return (
                                        <li key={item.h1} className="blog-element animation-fadetop">
                                            <Link href={"/blog/artikel?id=" + item.id}>
                                                <div>
                                                    <div className="blog-img">
                                                        <Image width="80" height="80" src={Banner} />
                                                    </div>
                                                    <div className="blog-info">
                                                        <h2 className="blog-h2">{item.h1}</h2>
                                                        <h2 className="blog-h3">{item.h2}</h2>
                                                    </div>
                                                    <div className="blog-byline">
                                                        <div className="blog-byline-img"></div>
                                                        <div className="blog-byline-inline">
                                                            <p className="blog-byline-h1">{item.author}</p>
                                                            <p className="blog-byline-h2">{item.dato}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                }
                            }
                        })}
                    </ul>
                </div>
            </div>
            <FaqComponent />
        </>
    )
}
 
export default Blog;