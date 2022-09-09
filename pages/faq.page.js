import * as React from 'react';
import { useEffect } from 'react';
import Header from './layout/header';
import StageIphone from './img/Stage-Iphone.png';

import FaqSite from './components/faq';
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
 
function Faq () {
    
    useEffect(() => {
        window.addEventListener("scroll", function(){
            if (document.getElementById("designer-hero")) {
                document.getElementById("designer-hero").classList.toggle("designer-relative", window.scrollY > 420);
            }
        })
    }, [])

    return (
        <>
            <Head>
                <title>FAQ - Spørgsmål og svar - Tipsspillet</title>
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
                            <h1 className="route-h1">
                                <div className="main-component-h">
                                    <span>O</span>
                                    <span>f</span>
                                    <span>t</span>
                                    <span>e</span>
                                    &nbsp;
                                    <span>s</span>
                                    <span>t</span>
                                    <span>i</span>
                                    <span>l</span>
                                    <span>l</span>
                                    <span>e</span>
                                    <span>d</span>
                                    <span>e</span>
                                    &nbsp;
                                    <span>s</span>
                                    <span>p</span>
                                    <span>ø</span>
                                    <span>r</span>
                                    <span>g</span>
                                    <span>s</span>
                                    <span>m</span>
                                    <span>å</span>
                                    <span>l</span>
                                </div>
                                <div className="route-pynt"><div className="route-pynt1"></div><div className="route-pynt2"></div><div className="route-pynt3"></div></div></h1>
                            <h2 className="route-h2">Få svar på de spørgsmål du skulle sidde med vedrørende Tipsspillet. Kan du ikke finde svar på dit spørgsmål?<span className="route-h2-a">Kontakt vores team</span>.</h2>
                            <br /><Link href="/kontakt"><a className="faq-btn">Skriv til os</a></Link>
                        </div>
                    </div>
                    {/* <div className="route-img">
                        <Image width="216px" height="400px" src={StageIphone} />
                    </div> */}
                </div>
                <div className="designer-element">
                    <h3 className="faq-h1">FAQ - Spørgsmål og svar</h3>
                    <h4 className="faq-h2">Har du spørgsmål? Vi er her for at hjælpe</h4>
                    <FaqSite />
                </div>
            </div>
            <div className="designer-container">
                <div className="designer-hero">
                    <p className="designer-hero-h2">Formålet</p>
                    <h2 className="designer-hero-h1">Tipsspillets vision</h2>
                    <p className="designer-hero-p">Dyst mod dine venner i et verdensomspændende betting-spil, helt uden at bruge en krone. Bet mod venner og familie, eller deltag i præmiedyster.</p>
                    <br />
                    <p className="designer-hero-p" style={{marginBottom: "10px"}}>Dyst mod dine venner i et verdensomspændende betting-spil, helt uden at bruge en krone. Bet mod venner og familie, eller deltag i præmiedyster.</p>
                    <br /><Link href="/signup"><a className="faq-btn-outline">Kom igang</a></Link>
                </div>
            </div>
            {/* <div className="stage-main-container" style={{marginTop: "-100px", backgroundColor: "#fff"}}>
                <h3 className="faq-h1">FAQ - Spørgsmål og svar</h3>
                <h4 className="faq-h2">Har du spørgsmål? Vi er her for at hjælpe</h4>
                <FaqSite />
            </div> */}
        </>
    )
}
 
export default Faq;