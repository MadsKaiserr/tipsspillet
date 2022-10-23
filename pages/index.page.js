import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Header from './layout/header';
import PriserComp from './components/priser';
import { Gradient } from './services/Gradient.js'

import RightArrow from './img/right-arrow.png';
import Mockup from './img/TipsspilletIphone14Mockup.png';
import MatchMock from './img/KampIphoneMacbookMockup.jpg';
import MatchMockMB from './img/KampIphoneMockup.jpg';
import GrMatchMock from './img/GruppespilMockup.jpg';
import GrMatchMockMB from './img/IphoneGruppespilMockup.jpg';
import Money from './img/money.png';
import Chart from './img/bar-chart.png';
import FaqComponent from './components/faq';
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    const gradient = new Gradient()
    gradient.initGradient('#gradient-canvas')
  }, [])

  return (
    <>
        <Head>
            <title>Tipsspillet - Gratis Betting Konkurrence</title>
            <link rel="canonical" href="https://www.tipsspillet.dk/" />
            <meta name="description" content="Dyst mod dine venner i et verdensomspændende betting-spil, helt uden at bruge en krone. Bet mod familie og venner, eller deltag i præmiedyster." />
            <meta name="author" content="Mads Kaiser" />
            <meta name="keywords" content="tipsspillet, betting, gratis betting, betting spil, gratis betting spil, betting konkurrence, betting turnering, fodbold betting, gratis fodbold betting, betting-spil, betting tips, odds, gratis oddsning, fodbold odds, gratis tipsspil, betting gruppespil" />
            <meta itemProp="name" content="Tipsspillet" />
            <meta itemProp="description" content="Dyst mod dine venner i et verdensomspændende betting-spil, helt uden at bruge en krone. Bet mod familie og venner, eller deltag i præmiedyster." />
            <meta property="og:title" content="Tipsspillet - Gratis Betting Konkurrence" />
            <meta property="og:description" content="Dyst mod dine venner i et verdensomspændende betting-spil, helt uden at bruge en krone. Bet mod familie og venner, eller deltag i præmiedyster." />
        </Head>
        <Header />
        <div className="canvas-overlay"></div>
        <div className="hero-container">
            <div className="hero-container-2">
            <div className="hero-text">
                <h1 className="main-component-h1">
                    <div className="main-component-h">
                        <span>F</span>
                        <span>o</span>
                        <span>d</span>
                        <span>b</span>
                        <span>o</span>
                        <span>l</span>
                        <span>d</span>
                        &nbsp;
                        <span>b</span>
                        <span>e</span>
                        <span>t</span>
                        <span>t</span>
                        <span>i</span>
                        <span>n</span>
                        <span>g</span>
                    </div>
                    <div className="main-component-h-fix">
                        <span id="dash" style={{marginTop: "-12px"}}>-</span>
                        &nbsp;
                        <span className="main-switch">
                            <span className="main-switch-element main-gradient" style={{top: "0px", left: "0px", animation: "cycleTop 7s infinite"}}>Helt gratis</span>
                            <span className="main-switch-element main-gradient" style={{top: "90px", left: "0px", animation: "cycleBottom 7s infinite"}}>Virtuelle penge</span>
                        </span>
                    </div>
                </h1>
            </div>
            <h2 className="main-component-h1-h2">Dyst mod familie og venner i fodbold betting uden risiko. Spil med virtuelle penge, og find den bedste better iblandt jer. &#128640;</h2>
            <Link href="/gruppespil">
                <button className="main-btn-default hero-btn">Find gruppespil</button>
            </Link><br />
            </div>
        </div>
        <div className="forside-blob">
            <canvas id="gradient-canvas" style={{opacity: "0.5"}} className="mesh-canvas" data-transition-in />
            <div className="forside-blob-img">
                <Image src={Mockup} />
            </div>
        </div>
        <div className="wrap-wrapper">
            <div className="forside-stats-container">
                <div className="forside-stats-element animation-fadetop" style={{animationDelay: "0.6s"}}>
                    <p className="forside-stats-h1">27+</p>
                    <p className="forside-stats-h2">Ligaer der kan oddses på</p>
                </div>
                <div className="forside-stats-element animation-fadetop" style={{animationDelay: "0.7s"}}>
                    <p className="forside-stats-h1">97%</p>
                    <p className="forside-stats-h2">Tilfredshed fra vores kunder og brugere.</p>
                </div>
                <div className="forside-stats-element animation-fadetop" style={{animationDelay: "0.8s"}}>
                    <p className="forside-stats-h1">4.5</p>
                    <p className="forside-stats-h2">Stjerner på Trustpilot</p>
                </div>
            </div>
        </div>
        <div className="db-container">
            <div className="forside-db" style={{marginTop: "50px"}}>
                <div className="db-fill" id="fill-1">
                    <Image src={MatchMock} />
                </div>
                <div className="db-section">
                    <div className="db-info">
                        <h2 className="db-h1">Spil helt gratis.<br/><span className="db-h1 main-gradient">Virtuelle penge.</span></h2>
                        <h3 className="db-h2">Hos Tipsspillet spiller du med virtuelle penge, og eliminerer derved risikioen for tab af penge på betting.</h3>
                        <h3 className="db-h2">Løbet tør for penge? Intet problem! I de fleste gruppespil får du et beløb hver uge, som du kan bruge på at bette dig til større fortjeneste &#128640;</h3>
                    </div>
                </div>
                <div className="db-fill" id="fill-2">
                    <Image src={MatchMockMB} />
                </div>
            </div>
            <div className="forside-db">
                <div className="db-section">
                    <div className="db-info">
                        <h2 className="db-h1">Opret dit eget<br/><span className="db-h1 main-gradient">gruppespil.</span></h2>
                        <h3 className="db-h2">Opret dit eget gruppespil i din klasse, på din arbejde, med din familie eller lav et offentligt gruppespil.</h3>
                        <h3 className="db-h2">Med Plus- og Premium abonnement kan du oprette gruppespil, og styre ligaer, startbeløb, beløb hver uge, deltagere og meget mere!</h3>
                    </div>
                </div>
                <div className="db-fill-inverted" id="fill-3"><Image src={GrMatchMock} /></div>
                <div className="db-fill-inverted" id="fill-4"><Image src={GrMatchMockMB} /></div>
            </div>
        </div>
        <div className="main-container" style={{paddingTop: "100px"}}>
            <div className="hero-text">
                <h1 className="priser-h1 animation-fadeleft animation-delay-200">Priser og Abonnement</h1>
                <h2 className="priser-h2 animation-fadetop animation-delay-300">Find det <span style={{color: "var(--primary)", fontWeight: "500"}}>abonnement</span> der bedst passer dig.</h2>
            </div>
        </div>
        <PriserComp />
        <FaqComponent />
    </>
  )
}
