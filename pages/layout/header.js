import React, { useState, useEffect } from 'react';
import { showLogin } from "../services/login";
import Link from 'next/link'
import Image from 'next/image'

import DownArrow from './../img/down-arrow.png';
import logo from './../img/logo-primary.png';
 
function Header () {

    const [auth, setAuth] = useState({});

    useEffect(() => {
        window.addEventListener("scroll", function(){
            if (document.getElementById("nav-bar-main")) {
                var header = document.getElementById("nav-bar-main");
                header.classList.toggle("nav-scrolled", window.scrollY >250);
            }
        })
        setAuth(JSON.parse(localStorage.getItem("auth")));
    }, [])

    function sideMenu() {
        document.getElementById("sidemenu").classList.add("display-flex");
        document.getElementById("nav-bar-main").classList.add("nav-scrolled");
    }

    function closeMenu() {
        document.getElementById("sidemenu").classList.remove("display-flex");
    }

    return (
        <>
            <div className="nav-bar" id="nav-bar-main">
                <div className="nav-container-fix">
                    <div className="nav-container-mid">
                        <svg xmlns="http://www.w3.org/2000/svg" className="nav-ham1" onClick={() => {sideMenu()}} viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        <div className="display-flex" style={{alignItems: "center", gap: "5px"}}>
                            <Link href="/"><div><Image width="50px" height="50px" src={logo} alt="Tipsspillet Logo" className="main-logo" /></div></Link>
                            <Link href="/"><a className="logo-h1">Tipsspillet</a></Link>
                        </div>
                        <div className="nav-link-container">
                            <div className="dropmenu" id="nav-drop"><Link href="/gruppespil"><a className="nav-p">Gruppespil</a></Link>
                                <Image width="11px" height="11px" src={DownArrow} alt="Pil ned" className="nav-icon" />
                                <div className="nav-drop-fix">
                                    <div className="nav-dropdown">
                                        <div className="ndp-section">
                                            <div className="ndp-content">
                                                <div className="ndp-element">
                                                    <Link href="/gruppespil">
                                                        <a className="ndp-a">
                                                        Alle gruppespil
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                                        </svg>
                                                        </a>
                                                    </Link>
                                                </div>
                                                <div className="ndp-element">
                                                    <Link href="/gruppespil">
                                                        <a className="ndp-a">Private gruppespil
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                                        </svg></a>
                                                    </Link>
                                                </div>
                                                <div className="ndp-element">
                                                    <Link href="/gruppespil">
                                                        <a className="ndp-a">
                                                        Offentlige gruppespil
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                                        </svg>
                                                        </a>
                                                    </Link>
                                                </div>
                                                <div className="ndp-element">
                                                    <Link href="/gruppespil">
                                                        <a className="ndp-a">
                                                        Præmiespil
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                                        </svg>
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="nav-link-container">
                            <Link href="/priser"><a className="nav-p">Priser</a></Link>
                        </div>
                        <div className="nav-link-container">
                            <Link href="/blog"><a className="nav-p">Blog</a></Link>
                        </div>
                        <div className="nav-link-container">
                            <Link href="/faq"><a className="nav-p">Spørgsmål og svar</a></Link>
                        </div>
                    </div>
                </div>
                <div className="nav-container-right">
                    <div className="header-buttons">
                        {auth && <Link href="/stage">
                            <a className="nav-btn-outline">Tilbage til betting</a>
                        </Link>}
                        {!auth && <div className="header-buttons">
                            <p className="nav-btn-outline" onClick={() => showLogin()}>Log ind</p>
                            <Link href="/signup"><button className="nav-btn-default">Opret Profil<div className="nav-in-before"></div><span className="nav-in">Det gratis</span></button></Link>
                        </div>}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="nav-ham-ham" style={{fill: "var(--black)"}} onClick={() => {sideMenu()}} viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    <div className="sidemenu" id="sidemenu">
                        <div className="side-nav-bar">
                            <div className="nav-container-fix">
                                <div className="nav-container-mid">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="nav-ham1" onClick={() => {sideMenu()}} viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                    <div className="display-flex" style={{alignItems: "center", gap: "5px"}}>
                                        <Link href="/"><div><Image width="50px" height="50px" src={logo} alt="Tipsspillet Logo" className="main-logo" /></div></Link>
                                        <Link href="/"><a className="logo-h1">Tipsspillet</a></Link>
                                    </div>
                                    <div className="nav-link-container">
                                        <div className="dropmenu" id="nav-drop"><Link href="/gruppespil"><a className="nav-p">Gruppespil</a></Link>
                                            <Image width="11px" height="11px" src={DownArrow} alt="Pil ned" style={{marginTop: "-7px"}} className="nav-icon" />
                                            <div className="nav-drop-fix">
                                                <div className="nav-dropdown">
                                                    <div className="ndp-section">
                                                        <div className="ndp-content">
                                                            <div className="ndp-element">
                                                                <Link href="/gruppespil">
                                                                    <a className="ndp-a">Alle gruppespil
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                                                    </svg></a>
                                                                </Link>
                                                            </div>
                                                            <div className="ndp-element">
                                                                <Link href="/gruppespil">
                                                                    <a className="ndp-a">
                                                                    Private gruppespil
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                                                    </svg>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                            <div className="ndp-element">
                                                                <Link href="/gruppespil">
                                                                    <a className="ndp-a">
                                                                    Offentlige gruppespil
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                                                    </svg>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                            <div className="ndp-element">
                                                                <Link href="/gruppespil">
                                                                    <a className="ndp-a">
                                                                    Præmiespil
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="ndp-icon" viewBox="0 0 16 16">
                                                                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                                                    </svg>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nav-link-container">
                                        <Link href="/priser"><a className="nav-p">Priser</a></Link>
                                    </div>
                                    <div className="nav-link-container">
                                        <Link href="/blog"><a className="nav-p">Blog</a></Link>
                                    </div>
                                    <div className="nav-link-container">
                                        <Link href="/faq"><a className="nav-p">Spørgsmål og svar</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="nav-container-right">
                                <div className="header-buttons">
                                    {auth && <Link href="/stage">
                                        <a className="nav-btn-outline">Tilbage til betting</a>
                                    </Link>}
                                    {!auth && <div className="header-buttons">
                                        <p className="nav-btn-outline" onClick={() => showLogin()}>Log ind</p>
                                        <Link href="/signup"><button className="nav-btn-default">Opret Profil<div className="nav-in-before"></div><span className="nav-in">Det gratis</span></button></Link>
                                    </div>}
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="nav-ham-ham" style={{fill: "var(--black)"}} onClick={() => {closeMenu()}} viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="sidemenu-click" onClick={() => closeMenu()}></div>
                        <div className="sidemenu-fill">
                            <div className="sidemenu-div">
                                <div className="sidemenu-element">
                                    {!auth && <p onClick={() => {showLogin();closeMenu()}} className="sidemenu-p">Log ind</p>}
                                    {!auth && <Link href="/signup"><a onClick={() => closeMenu()} className="sidemenu-p">Opret profil</a></Link>}
                                    {auth && <Link href="/stage"><a onClick={() => closeMenu()} className="sidemenu-p">Gå til betting</a></Link>}
                                    <Link href="/gruppespil"><a onClick={() => closeMenu()} className="sidemenu-p">Find gruppespil</a></Link>
                                    <Link href="/priser"><a onClick={() => closeMenu()} className="sidemenu-p">Priser - abonnement</a></Link>
                                    <Link href="/faq"><a onClick={() => closeMenu()} className="sidemenu-p">FAQ - Spørgsmål og svar</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Header;