import * as React from 'react';
import { useEffect } from 'react';
import Header from './layout/header';
import StageIphone from './img/Stage-Iphone.png';

import FaqSite from './components/faq';
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'

import SpilMed from './components/spilmed';
 
function Faq () {
    
    useEffect(() => {
        window.addEventListener("scroll", function(){
            if (document.getElementById("designer-hero")) {
                document.getElementById("designer-hero").classList.toggle("designer-relative", window.scrollY > 340);
            }
        })
    }, [])

    return (
        <>
            <Head>
                <title>FAQ - Spørgsmål og svar - Få svar på dine spørgsmål - Ofte stillede spørgsmål | Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/faq" />
                <meta name="description" content="FAQ - Få svar på dine spørgsmål - Hvordan opretter man gruppespil? Hvordan tilmelder jeg mig præmiedyser? Hvordan inviterer jeg folk til mit gruppespil?" />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="faq,tipsspillet faq,spørgsmål og svar,tipsspillet spørgsmål og svar,hvordan opretter man gruppespil,hvordan tilmelder jeg mig præmiedyster" />
                <meta itemProp="name" content="Tipsspillet FAQ" />
                <meta itemProp="description" content="FAQ - Få svar på dine spørgsmål - Hvordan opretter man gruppespil? Hvordan tilmelder jeg mig præmiedyser? Hvordan inviterer jeg folk til mit gruppespil?" />
                <meta property="og:title" content="FAQ - Spørgsmål og svar - Tipsspillet" />
                <meta property="og:description" content="FAQ - Få svar på dine spørgsmål - Hvordan opretter man gruppespil? Hvordan tilmelder jeg mig præmiedyser? Hvordan inviterer jeg folk til mit gruppespil?" />
            </Head>
            <Header />
            {/* <div className="route-top">
                <h1 className="route-h1">Ofte stillede spørgsmål<div className="route-pynt"><div className="route-pynt1"></div><div className="route-pynt2"></div><div className="route-pynt3"></div></div></h1>
                <h2 className="route-h2">Få svar på de spørgsmål du skulle sidde med vedrørende Tipsspillet. Kan du ikke finde svar på dit spørgsmål?<span className="route-h2-a">Kontakt vores team</span>.</h2>
                <br /><Link href="/kontakt"><a className="faq-btn">Skriv til os</a></Link>
                <div className="route-img">
                    <Image width="216px" height="400px" src={StageIphone} />
                </div>
            </div> */}
            <div className="designer-container">
                <div className="designer-element-fixed" style={{backgroundColor: "var(--stageSurface)"}}>
                    <div className="designer-fixed" id="designer-hero">
                        <div className="designer-left">
                            <h1 className="main-component-h1 main-gradient font-size-50">Spørgsmål og svar</h1>
                            <h2 className="main-component-h3 text-align-left margin-0 font-size-17 padding-10-0">Få svar på de spørgsmål du skulle sidde med vedrørende Tipsspillet. Kan du ikke finde svar på dit spørgsmål? <span className="color-primary font-weight-500">Kontakt vores team</span>.</h2>
                            <br /><Link href="/kontakt"><a className="faq-btn">Skriv til os</a></Link>
                        </div>
                    </div>
                    {/* <div className="route-img">
                        <Image width="216px" height="400px" src={StageIphone} />
                    </div> */}
                </div>
                <div className="designer-element">
                    <FaqSite />
                </div>
            </div>
            {/* <div className="stage-main-container" style={{marginTop: "-100px", backgroundColor: "#fff"}}>
                <h3 className="faq-h1">FAQ - Spørgsmål og svar</h3>
                <h4 className="faq-h2">Har du spørgsmål? Vi er her for at hjælpe</h4>
                <FaqSite />
            </div> */}
            <SpilMed />
        </>
    )
}
 
export default Faq;