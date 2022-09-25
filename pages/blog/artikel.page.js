import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Header from '../layout/header';
import axios from "axios";
import Spacer from '../components/spacer';

import Setup from '../img/setup.png';
import Follow from '../img/follow.png';
 
function Artikel () {

    useEffect(() => {
        window.addEventListener("scroll", function(){
            if (document.getElementById("artikel-shortcuts")) {
                document.getElementById("artikel-shortcuts").classList.toggle("artikel-sticky", window.scrollY > 340);
            }
        })
    }, [])

    return (
        <>
            <Head>
                <title>Artikel | Tipsspillet Blog Artikel</title>
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
            <div className="artikel-container">
                <h3 className="artikel-h3">INTRODUKTION</h3>
                <h1 className="artikel-h1">Introduktion til Tipsspillet</h1>
                <div className="artikel-byline">
                    <p className="artikel-byline-h">Mads Kaiser</p>
                    <div className="artikel-byline-divider"></div>
                    <p className="artikel-byline-p">Man. 12 sep. 2022</p>
                </div>
            </div>
            <div className="artikel-wrapper">
                <div className="artikel-content">
                    <div className="artikel-shortcuts" id="artikel-shortcuts">
                        <p className="artikel-shortcuts-h1">Indhold</p>
                        <div className="artikel-shorts">
                            <p className="artikel-shortcuts-p">Step 1. Opret din konto</p>
                            <p className="artikel-shortcuts-p">Step 2. Vælg dine favoritter</p>
                            <p className="artikel-shortcuts-p">Step 3. Find gruppespil</p>
                            <p className="artikel-shortcuts-p">Step 4. Placér din første kupon</p>
                            <p className="artikel-shortcuts-p">Step 5. Følg ranglisten</p>
                            <p className="artikel-shortcuts-p">Step 6. Opret ejet gruppespil</p>
                        </div>
                    </div>
                    <div className="blog-intro">
                        <h3 className="a-blog-h3">Tipsspillet underholder fodboldinteresserede landet over</h3>
                        <p className="a-blog-p">Tipsspillet er for dig, som vil starte en underholdende dyst mellem dig og dine venner med virtuelle penge, for at finde ud af, hvem der er den bedste better.</p>
                    </div>
                    <div className="blog-section">
                        <h1 className="a-blog-h1">Tilmeld dig dit første gruppespil</h1>
                        <ul className="blog-list">
                            <li className="blog-list-element">
                                <p className="a-blog-p">1.</p>
                                <p className="a-blog-p">Opret din konto</p>
                            </li>
                            <li className="blog-list-element">
                                <p className="a-blog-p">2.</p>
                                <p className="a-blog-p">Vælg dine favoritter</p>
                            </li>
                            <li className="blog-list-element">
                                <p className="a-blog-p">3.</p>
                                <p className="a-blog-p">Find gruppespil</p>
                            </li>
                            <li className="blog-list-element">
                                <p className="a-blog-p">4.</p>
                                <p className="a-blog-p">Placér din første kupon</p>
                            </li>
                            <li className="blog-list-element">
                                <p className="a-blog-p">5.</p>
                                <p className="a-blog-p">Følg ranglisten</p>
                            </li>
                            <li className="blog-list-element">
                                <p className="a-blog-p">6.</p>
                                <p className="a-blog-p">Opret ejet gruppespil</p>
                            </li>
                        </ul>
                        <h2 className="a-blog-h2">Step 1. Opret din konto</h2>
                        <p className="a-blog-p">For hurtigt at komme igang, skal du oprette dig en konto, som du kan tilmelde dig gruppespil med. <Link href="/signup"><a className="a-blog-p-a">Opret en konto hos Tipsspillet.</a></Link></p>
                        <p className="a-blog-p">Her skal du blot vælge abonnement-type eller gratis profil, og herefter følge formularen, for at oprette din konto.</p>
                        <h2 className="a-blog-h2">Step 2. Vælg dine favoritter</h2>
                        <p className="a-blog-p">Når du har oprettet en konto for første gang, bliver du mødt med siden &quot;Hurtig Opsætning&quot;.</p>
                        <p className="a-blog-p">Her kan du hurtigt og nemt finde dig et gruppespil, hvis du allerede ved hvilket et du skal være med i. Dette trin kan dog også springes over.</p>
                        <p className="a-blog-p">Herefter kommer siden, hvor du kan vælge dine favorithold. Favoritholdene bliver vist som de første under kampene hver dag, og du vil nemt have adgang til dine favorithold under sektionen &quot;Hold du følger&quot;.</p>
                        <div className="a-blog-img">
                            <Image src={Setup} width="2200" height="1156" alt="Hurtig opsætning side" />
                        </div>
                        <p className="a-blog-p">Ligeså vil favoritligaer komme før andre ligaer, for at gøre det nemmere at finde dine yndlingsligaer.</p>
                        <div className="a-blog-img">
                            <Image src={Follow} width="1976" height="904" alt="Hold du følger side" />
                        </div>
                        <p className="a-blog-p">Du kan altid fjerne et hold eller liga fra dine favoritter, enten på siden for holdet eller ligaen, eller under <Link href="/stage/indstillinger"><a className="a-blog-p-a">din profil.</a></Link></p>
                        <h2 className="a-blog-h2">Step 3. Find gruppespil</h2>
                        <p className="a-blog-p">Så langt så godt.</p>
                        <p className="a-blog-p">For at komme igang med at bette, skal du have et gruppespil du kan bette i, og modstandere du kan bette imod.</p>
                        <p className="a-blog-p">Du kan enten tilmelde dig offentlige eller private gruppespil. De private gruppespil kræver en adgangskode sat af administratoren.</p>
                        <p className="a-blog-p">Derimod kan du tilmelde dig alle offentlige gruppespil, og spille med folk landet over.</p>
                        <p className="a-blog-p">Præmiedyster er også en mulighed - Her kræver det, at du enten har en præmiedyst-billet, eller har købt abonnement. En billet koster 9 kr., og kan købes under <Link href="/priser"><a className="a-blog-p-a">priser.</a></Link></p>
                        <p className="a-blog-p">Abonnement kan købes under <Link href="/priser"><a className="a-blog-p-a">priser</a></Link>, og inkluderer tons vis af andre goder som oprettelse af ejet gruppespil, udvidet statistikker, odds nyheder, adgang til præmiedyster og meget mere.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Artikel;