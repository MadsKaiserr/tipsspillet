import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Header from './layout/header';
import PriserComp from './components/priser';
import { Gradient } from './services/Gradient.js'

import RightArrow from './img/right-arrow.png';
import FaqComponent from './components/faq';
import SpilMed from './components/spilmed'

export default function Home() {

  const gradient = new Gradient()
  gradient.initGradient('#gradient-canvas')

  return (
    <div>
        <Header />
        <Head>
            <title>Tipsspillet - Gratis Betting Konkurrence</title>
            <link rel="canonical" href="https://www.tipsspillet.dk/" />
            <meta name="description" content="Dyst mod dine venner i et verdensomspændende betting-spil, helt uden at bruge en krone. Bet mod venner og familie, eller deltag i præmiedyster." />
            <meta name="author" content="Mads Kaiser" />
            <meta name="keywords" content="tipsspillet, betting, gratis betting, betting spil, gratis betting spil, betting konkurrence, betting turnering, fodbold betting, gratis fodbold betting, betting-spil, betting tips, odds, gratis oddsning, fodbold odds, gratis tipsspil, betting gruppespil" />
            <meta itemProp="name" content="Tipsspillet" />
            <meta itemProp="description" content="Dyst mod dine venner i et verdensomspændende betting-spil, helt uden at bruge en krone. Bet mod venner og familie, eller deltag i præmiedyster." />
            <meta property="og:title" content="Forside - Tipsspillet - Gratis Betting Konkurrence" />
            <meta property="og:description" content="Dyst mod dine venner i et verdensomspændende betting-spil, helt uden at bruge en krone. Bet mod venner og familie, eller deltag i præmiedyster." />
            <link rel="canonical" href="https://www.tipsspillet.dk" />
        </Head>
        <canvas id="gradient-canvas" className="mesh-canvas" data-transition-in />
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
                        <span id="dash" style={{marginTop: "-15px"}}>-</span>
                        &nbsp;
                        <span className="main-switch">
                            <span className="main-switch-element main-gradient" style={{top: "0px", left: "0px", animation: "cycleTop 7s infinite"}}>Helt gratis</span>
                            <span className="main-switch-element main-gradient" style={{top: "90px", left: "0px", animation: "cycleBottom 7s infinite"}}>Virtuelle penge</span>
                        </span>
                    </div>
                </h1>
                <h2 className="main-component-h1-h2">Dyst venner og familie i betting uden risiko.&#128640;</h2>
                <div className="hero-divider"></div>
            </div>
            <Link href="/gruppespil">
                <button className="main-btn-default hero-btn">Find gruppespil</button>
            </Link><br />
            <Image width="30px" height="40px" src={RightArrow} alt="" style={{paddingTop: "10px"}} className="cursive-arrow" />
            <p className="cursive-cta">Start med at finde dig et gruppespil!</p>
            {/* <div className="hero-system">
                <div className="hero-system-element" id="system1">
                    <div className="system-epillipse"></div>
                    <div className="system-string"></div>
                    <div className="system-epillipse-small-right"></div>
                    <div className="system-string-right"></div>
                    <div className="system-epillipse-small"></div>
                    <div className="system-string-left"></div>
                </div>
                <div className="hero-system-element" id="system2">
                    <div className="system-epillipse"></div>
                    <div className="system-string"></div>
                    <div className="system-epillipse-small-right"></div>
                    <div className="system-string-right"></div>
                    <div className="system-epillipse-small"></div>
                    <div className="system-string-left"></div>
                </div>
            </div> */}
            <div className="hero-info">
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
            </div>
            {/* <div className="hero-help">
                <div className="help-container">
                    <div className="help-top">
                        <Image width="23px" height="23px" src={Trustpilot} alt="Trustpilot stjerne" className="tp-img" onClick={() => {window.open("https://dk.trustpilot.com/review/tipsspillet.dk", "_BLANK")}} />
                        <p className="tp-p" onClick={() => {window.open("https://dk.trustpilot.com/review/tipsspillet.dk", "_BLANK")}}>Trustpilot</p>
                    </div>
                    <h3 className="tp-h1">Vi underholder fodbold-interesserede landet over</h3>
                    <p className="tp-h2" onClick={() => {window.open("https://dk.trustpilot.com/review/tipsspillet.dk", "_BLANK")}}>Se alle anmeldelser</p>
                    <Image width="200px" height="50px" src={Stars} alt="Trustpilot" className="tp-stars" />
                </div>
            </div> */}
            </div>
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
        <div className="forside-section">
            <div className="forside-divider"></div>
            <p className="inf-h1 red-gradient">Hvordan spiller man?</p>
            <div className="inf-container">
                <div className="inf-con-1">
                    <div className="inf-element-active">
                        <div className="inf-top">
                            <div className="inf-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"/>
                                </svg>
                            </div>
                            <div className="inf-inline">
                                <p className="inf-h2">Deltag i gruppespil</p>
                                <p className="inf-p">Opret eller deltag i gruppespil eller præmiespil, og placér forskellige kuponer i ønskede gruppespil.</p>
                            </div>
                        </div>
                    </div>
                    <div className="inf-element">
                        <div className="inf-top">
                            <div className="inf-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                </svg>
                            </div>
                            <div className="inf-inline">
                                <p className="inf-h2">Placér kuponer</p>
                                <p className="inf-p">Find dine favoritkampe, analyser med vores deltaljerede statistikker, og placér din kupon med din ønskede indsats.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inf-con-1">
                    <div className="inf-element">
                        <div className="inf-top">
                            <div className="inf-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"/>
                                </svg>
                            </div>
                            <div className="inf-inline">
                                <p className="inf-h2">Få viden om betting</p>
                                <p className="inf-p">Opnå viden om betting, for at forbedre dine betting-evner uden at betale én eneste krone.</p>
                            </div>
                        </div>
                    </div>
                    <div className="inf-element">
                        <div className="inf-top">
                            <div className="inf-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
                                </svg>
                            </div>
                            <div className="inf-inline">
                                <p className="inf-h2">Find en vinder</p>
                                <p className="inf-p">Se ranglisterne i dine gruppespil, og kår en vinder som den bedste better ved slutdatoen i gruppespillet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <PriserComp />
        <FaqComponent />
        <SpilMed />
    </div>
  )
}
