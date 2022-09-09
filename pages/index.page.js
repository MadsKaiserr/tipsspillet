import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import {useEffect, useState} from 'react';
import axios from "axios";
import Header from './layout/header';

import red from './img/red.png';
import blue from './img/blue.png';
import dollar from './img/dollar.png';

import Trustpilot from './img/trustpilot.png';
import RightArrow from './img/right-arrow.png';
import Stars from './img/stars.png';

export default function Home() {

  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {

      const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppespil";

      const requestConfig = {
          headers: {
              "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
          }
      }

      axios.get(URL, requestConfig).then(response => {
          console.log("AWS - Gruppespil:", response)
          setGames(response.data.allGruppespil);
      }).catch(error => {
          console.log("Fejl ved indhentning af data" + error)
      })

      const URLP = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/users";

      const requestConfigP = {
          headers: {
              "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
          }
      }

      axios.get(URLP, requestConfigP).then(response => {
          console.log("AWS - Users:", response)
          setPlayers(response.data.allUsers);
      }).catch(error => {
          console.log("Fejl ved indhentning af data" + error)
      })
  }, [])

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
        <div className="hero-container">
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
                        <span style={{marginTop: "-25px"}}>-</span>
                        &nbsp;
                        <span className="main-switch">
                            <span className="main-switch-element main-gradient" style={{top: "0px", left: "0px", animation: "cycleTop 7s infinite"}}>Helt gratis</span>
                            <span className="main-switch-element main-gradient" style={{top: "90px", left: "0px", animation: "cycleBottom 7s infinite"}}>Virtuelle penge</span>
                        </span>
                    </div>
                </h1>
                <h2 className="main-component-h1-h2">Dyst venner og familie i betting uden risiko.&#128640;</h2>
                <div className="hero-divider"></div>
                <Link href="/gruppespil">
                    <button className="main-btn-default hero-btn">Find gruppespil</button>
                </Link><br />
                <Image width="30px" height="40px" src={RightArrow} alt="" style={{paddingTop: "10px"}} className="cursive-arrow" />
                <p className="cursive-cta">Start med at finde dig et gruppespil!</p>
            </div>
            <div className="hero-system">
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
            </div>
            {games.length > 0 && <>
                {players.length > 0 && <div className="hero-info">
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
                        <span style={{animationDelay: "0.05s"}}>{players.length < 10 && <>{players.length}</>}{players.length >= 10 && <>{(players.length + "").slice(0,1)}</>}</span>
                        <span style={{animationDelay: "0.1s"}}>{players.length >= 10 && <>{(players.length + "").slice(1,2)}</>}</span>
                        <span style={{animationDelay: "0.15s"}}>{players.length >= 100 && <>{(players.length + "").slice(2,3)}</>}</span>
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
                        <span style={{animationDelay: "0.05s"}}>{games.length < 10 && <>{games.length}</>}{games.length >= 10 && <>{(games.length + "").slice(0,1)}</>}</span>
                        <span style={{animationDelay: "0.1s"}}>{games.length >= 10 && <>{(games.length + "").slice(1,2)}</>}</span>
                        <span style={{animationDelay: "0.15s"}}>{games.length >= 100 && <>{(games.length + "").slice(2,3)}</>}</span>
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
            </div>}
                {players.length <= 0 && <div className="hero-info">
                    <div className="hero-info-block">
                        <div className="hero-info-block-h1">
                            <div className="main-component-h">
                            <span style={{animationDelay: "1s"}}>2</span>
                            <span style={{animationDelay: "1.05s"}}>9</span>
                            <span style={{animationDelay: "1.1s"}}>+</span>
                        </div></div>
                        <div className="hero-info-block-h2"><div className="main-component-h">
                            <span style={{animationDelay: "0.95s"}}>L</span>
                            <span style={{animationDelay: "1s"}}>i</span>
                            <span style={{animationDelay: "1.05s"}}>g</span>
                            <span style={{animationDelay: "1.1s"}}>a</span>
                            <span style={{animationDelay: "1.15s"}}>e</span>
                            <span style={{animationDelay: "1.2s"}}>r</span>
                        </div></div>
                    </div>
                </div>}
            </>}
            {players.length <= 0 && <div className="hero-info">
                <div className="hero-info-block">
                    <div className="hero-info-block-h1">
                        <div className="main-component-h">
                        <span style={{animationDelay: "1s"}}>2</span>
                        <span style={{animationDelay: "1.05s"}}>9</span>
                        <span style={{animationDelay: "1.1s"}}>+</span>
                    </div></div>
                    <div className="hero-info-block-h2"><div className="main-component-h">
                        <span style={{animationDelay: "0.95s"}}>L</span>
                        <span style={{animationDelay: "1s"}}>i</span>
                        <span style={{animationDelay: "1.05s"}}>g</span>
                        <span style={{animationDelay: "1.1s"}}>a</span>
                        <span style={{animationDelay: "1.15s"}}>e</span>
                        <span style={{animationDelay: "1.2s"}}>r</span>
                    </div></div>
                </div>
            </div>}
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
            <div className="hero-news">
                <p className="hero-news-h1">Vind billetter til parken</p>
                <p className="hero-news-h2">Værdi af over 5.000 kr</p>
            </div>
        </div>
        <div className="forside-section">
            <h2 className="fsection-h1">Liveodds fra Bet365 - Med virtuelle penge</h2>
            <h3 className="fsection-h3">Placer væddemål på alverdens kampe med Liveodds direkte fra Bet365. <br />Odds så meget du vil i dine gruppespil - med virtuelle penge.</h3>
            <div className="fsection-elements" id="anim1">
                <div className="fsection-element">
                    <Image width="35px" height="35px" src={dollar} alt="Finans" className="fsection-img" />
                    <p className="fsection-h4">Virtuelle penge</p>
                    <p className="fsection-h5">SPIL HELT GRATIS</p>
                    <p className="fsection-p">Du modtager et startbeløb i hvert gruppespil. Placer væddemål, og få dit kapital til at stige. Højeste kapital i slutningen af gruppespillet vinder.</p>
                    <Link href="/gruppespil" className="fsection-a">Find gruppespil</Link>
                </div>
                <div className="fsection-element">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fsection-img" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
                    </svg>
                    <p className="fsection-h4">Liveodds fra Bet365</p>
                    <p className="fsection-h5">LIVEODDS</p>
                    <p className="fsection-p">Liveodds gør det muligt at opdatere oddsene løbende, i takt med kampene sættes igang. Kan du finde de bedste odds i tide?</p>
                    <Link href="/signup" className="fsection-a">Kom igang med en konto</Link>
                </div>
                <div className="fsection-element">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fsection-img" viewBox="0 0 16 16">
                        <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
                    </svg>
                    <p className="fsection-h4">Præmiedyster</p>
                    <p className="fsection-h5">VIND OP IMOD 5.000 KR</p>
                    <p className="fsection-p">Deltag i vores præmiedyster, og vind op imod 5.000 kr, hvis du kan finde de rigtige væddemål. Besøg vores sponsorater, og vind fede præmier.</p>
                    <Link href="/priser" className="fsection-a">Find præmiedyster</Link>
                </div>
            </div>
        </div>
        <div className="forside-black-section">
            <div className="forside-text">
                <div className="forside-black-top">
                    <div className="forside-black-divider"></div>
                    <p className="forside-black-h3">Kun for Premium</p>
                </div>
                <p className="forside-black-h1">LIVEBETTING</p>
                <p className="forside-black-p">Vi sørger for direkte liveodds fra Bet365 opdateret <em>hvert</em> sekund!</p>
                <p className="forside-black-p">Livebet i takt med dine favoritkampe spilles, og konstruer de bedste væddemål.</p>
                <Link href="/priser" className="nav-btn-default"><p className="nav-btn-default" style={{marginLeft: "0px", marginTop: "20px", textAlign: "center", maxWidth: "120px", justifyContent: "center"}}>Se priser</p></Link>
            </div>
            <div className="forside-figure">
                <div className="info-figure1" style={{background: "B5EFFB"}}></div>
                <div className="info-figure2" style={{background: "8AA7F3"}}></div>
            </div>
            <div className="info-figure">
                <div className="info-figure1"></div>
                <div className="info-figure2"></div>
            </div>
        </div>
        <div className="forside-section">
            <div className="forside-divider"></div>
            <p className="inf-h1">Hvordan spiller man?</p>
            <div className="inf-container">
                <div className="inf-con-1">
                    <div className="inf-element">
                        <div className="inf-top">
                            <div className="inf-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                                </svg>
                            </div>
                            <p className="inf-h2">Deltag i gruppespil</p>
                        </div>
                        <p className="inf-p">Opret eller deltag i gruppespil eller præmiespil, og placér forskellige kuponer i ønskede gruppespil.</p>
                    </div>
                    <div className="inf-element">
                        <div className="inf-top">
                            <div className="inf-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                                    <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                            </div>
                            <p className="inf-h2">Placér kuponer</p>
                        </div>
                        <p className="inf-p">Find dine favoritkampe, analyser med vores deltaljerede statistikker, og placér din kupon med din ønskede indsats.</p>
                    </div>
                </div>
                <div className="inf-con-1">
                    <div className="inf-element">
                        <div className="inf-top">
                            <div className="inf-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"/>
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                </svg>
                            </div>
                            <p className="inf-h2">Få viden om betting</p>
                        </div>
                        <p className="inf-p">Opnå viden om betting, for at forbedre dine betting-evner uden at betale én eneste krone.</p>
                    </div>
                    <div className="inf-element">
                        <div className="inf-top">
                            <div className="inf-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                </svg>
                            </div>
                            <p className="inf-h2">Find en vinder</p>
                        </div>
                        <p className="inf-p">Se ranglisterne i dine gruppespil, og kår en vinder som den bedste better ved slutdatoen i gruppespillet.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
