import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Header from './layout/header';
import PriserComp from './components/priser';
import { Gradient } from './services/Gradient.js'

import RightArrow from './img/right-arrow.png';
import Mockup from './img/TipsspilletIphone14Mockup.jpg';
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
            {/* <Image width="30px" height="40px" src={RightArrow} alt="" style={{paddingTop: "10px"}} className="cursive-arrow" />
            <p className="cursive-cta">Start med at finde dig et gruppespil!</p> */}
            {/* <div className="hero-info">
                <div className="hero-info-block">
                    <div className="hero-info-block-h1">
                        <div className="main-component-h">
                        <span style={{animationDelay: "0.05s"}}>2</span>
                        <span style={{animationDelay: "0.1s"}}>9</span>
                        <span style={{animationDelay: "0.15s"}}>+</span>
                    </div>
                    </div>
                    <div className="hero-info-block-h2"><div className="main-component-h">
                        <span style={{animationDelay: "0.05s"}}>L</span>
                        <span style={{animationDelay: "0.1s"}}>i</span>
                        <span style={{animationDelay: "0.15s"}}>g</span>
                        <span style={{animationDelay: "0.2s"}}>a</span>
                        <span style={{animationDelay: "0.25s"}}>e</span>
                        <span style={{animationDelay: "0.3s"}}>r</span>
                    </div></div>
                </div>
                <div className="hero-info-block">
                    <div className="hero-info-block-h1">
                        <div className="main-component-h">
                        <span style={{animationDelay: "0.05s"}}>1</span>
                        <span style={{animationDelay: "0.1s"}}>5</span>
                        <span style={{animationDelay: "0.2s"}}>+</span>
                    </div></div>
                    <div className="hero-info-block-h2"><div className="main-component-h">
                        <span style={{animationDelay: "0.05s"}}>B</span>
                        <span style={{animationDelay: "0.1s"}}>r</span>
                        <span style={{animationDelay: "0.15s"}}>u</span>
                        <span style={{animationDelay: "0.2s"}}>g</span>
                        <span style={{animationDelay: "0.25s"}}>e</span>
                        <span style={{animationDelay: "0.3s"}}>r</span>
                        <span style={{animationDelay: "0.35s"}}>e</span>
                    </div></div>
                </div>
                <div className="hero-info-block">
                    <div className="hero-info-block-h1">
                        <div className="main-component-h">
                        <span style={{animationDelay: "0.05s"}}>4</span>
                        <span style={{animationDelay: "0.2s"}}>+</span>
                    </div></div>
                    <div className="hero-info-block-h2"><div className="main-component-h">
                        <span style={{animationDelay: "0.05s"}}>A</span>
                        <span style={{animationDelay: "0.1s"}}>k</span>
                        <span style={{animationDelay: "0.15s"}}>t</span>
                        <span style={{animationDelay: "0.2s"}}>i</span>
                        <span style={{animationDelay: "0.25s"}}>v</span>
                        <span style={{animationDelay: "0.3s"}}>e</span>
                        &nbsp;
                        <span style={{animationDelay: "0.35s"}}>s</span>
                        <span style={{animationDelay: "0.4s"}}>p</span>
                        <span style={{animationDelay: "0.45s"}}>i</span>
                        <span style={{animationDelay: "0.5s"}}>l</span>
                    </div></div>
                </div>
            </div> */}
            </div>
        </div>
        <div className="forside-blob">
            <canvas id="gradient-canvas" style={{opacity: "0.5"}} className="mesh-canvas" data-transition-in />
        </div>
        <div className="wrap-wrapper">
            <div className="forside-stats-container">
                <div className="forside-stats-element animation-fadetop" style={{animationDelay: "0.6s"}}>
                    <p className="forside-stats-h1">10K+</p>
                    <p className="forside-stats-h2">Brugere benytter vores side hver måned.</p>
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
        <div className="forside-black">
            <h2 className="fs-wrapper-h1">Liveodds fra<br/>verdens førende<br/>betting sider</h2>
            <h3 className="fs-wrapper-h2">Tag betting til nye højde med vores Livebetting. Placér væddemål i realtid, og forstør chancen for udbytte!</h3>
            <div className="fs-container">
                <div className="fs-element">
                    <div className="fs-element-img" style={{marginTop: "3px"}}>
                        <Image src={Money} alt="Penge" />
                    </div>
                    <p className="fs-element-p">50% Flere penge</p>
                </div>
                <div className="fs-element">
                    <div className="fs-element-img">
                        <Image src={Chart} alt="Graf" />
                    </div>
                    <p className="fs-element-p">100% Flere væddemål</p>
                </div>
            </div>
            <div className="forside-black-blob">
                <Image src={Mockup} />
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
        <div className="main-container">
            <div className="hero-text">
                <p className="cp-h3 animation-fadeleft">Gennemsigtig prissætning</p>
                <h2 className="cp-h1 animation-fadeleft animation-delay-200">Priser og Abonnement</h2>
                <h3 className="cp-h2 animation-fadetop animation-delay-300">Betal hvert valgte termin - Lav dine egne gruppespil, få udvidet statistikker, deltag i <span className="color-primary font-weight-500">præmiedyster</span> og meget mere.</h3>
            </div>
        </div>
        <PriserComp />
        <FaqComponent />
    </>
  )
}
