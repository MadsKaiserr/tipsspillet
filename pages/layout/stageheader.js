import { useState, useEffect } from 'react';
import { getUser, resetUserSession } from "../services/authService";
import jwtDecode from "jwt-decode";
import tlogo from './../img/logo-white.png';

import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import logo from '../img/long-logo-primary.png';
import flag from '../img/danmark.png';
import england from '../img/england.png';
 
function StageHeader () {

    useEffect(() => {
        if (localStorage.getItem("aktive-spil-suspend") === "true") {
            document.getElementById("main-error").classList.add("display-flex");
            document.getElementById("main-error-p").innerHTML = "Dit aktive spil er suspenderet.";
        }
        if (localStorage.getItem("notifikationer")) {
            document.getElementById("notital").classList.add("display-flex");
            sestNotifikationer(localStorage.getItem("notifikationer"));
        } else {
            document.getElementById("notital").classList.remove("display-flex");
            sestNotifikationer("0");
        }

        window.addEventListener("scroll", function(){
            if (document.getElementById("nav-bar")) {
                var header = document.getElementById("nav-bar");
                header.classList.toggle("normalHeader", window.scrollY >0);
            }
            if (document.getElementById("nav-small-bar")) {
                var header2 = document.getElementById("nav-small-bar");
                header2.classList.toggle("sticky-small", window.scrollY > 250);
            }
        })
    }, [])

    // eslint-disable-next-line
    const [items, setItems] = useState([
        {
            "klub": "København",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/21/85.png",
            "url": "/stage/team?team=85",
            "land": "Danmark"
        },
        {
            "klub": "Silkeborg",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/22/86.png",
            "url": "/stage/team?team=86",
            "land": "Danmark"
        },
        {
            "klub": "Horsens",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/19/211.png",
            "url": "/stage/team?team=211",
            "land": "Danmark"
        },
        {
            "klub": "Brøndby",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/5/293.png",
            "url": "/stage/team?team=293",
            "land": "Danmark"
        },
        {
            "klub": "Midtjylland",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/11/939.png",
            "url": "/stage/team?team=939",
            "land": "Danmark"
        },
        {
            "klub": "AaB",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/28/1020.png",
            "url": "/stage/team?team=1020",
            "land": "Danmark"
        },
        {
            "klub": "OB",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/29/1789.png",
            "url": "/stage/team?team=1789",
            "land": "Danmark"
        },
        {
            "klub": "Randers",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/20/2356.png",
            "url": "/stage/team?team=2356",
            "land": "Danmark"
        },
        {
            "klub": "Nordsjælland",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/26/2394.png",
            "url": "/stage/team?team=2394",
            "land": "Danmark"
        },
        {
            "klub": "Viborg",
            "img": "https://cdn.sportmonks.com/images/soccer/team_placeholder.png",
            "url": "/stage/team?team=2447",
            "land": "Danmark"
        },
        {
            "klub": "Lyngby",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/26/2650.png",
            "url": "/stage/team?team=2650",
            "land": "Danmark"
        },
        {
            "klub": "AGF",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/25/2905.png",
            "url": "/stage/team?team=2905",
            "land": "Danmark"
        },
        {
            "klub": "SønderjyskE",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/6/390.png",
            "url": "/stage/team?team=390",
            "land": "Danmark"
        },
        {
            "klub": "Nykøbing",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/0/1664.png",
            "url": "/stage/team?team=1664",
            "land": "Danmark"
        },
        {
            "klub": "Hobro",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/7/1703.png",
            "url": "/stage/team?team=1703",
            "land": "Danmark"
        },
        {
            "klub": "Næstved",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/18/1938.png",
            "url": "/stage/team?team=1938",
            "land": "Danmark"
        },
        {
            "klub": "Vendsyssel",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/18/2706.png",
            "url": "/stage/team?team=2706",
            "land": "Danmark"
        },
        {
            "klub": "Fredericia",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/21/2933.png",
            "url": "/stage/team?team=2933",
            "land": "Danmark"
        },
        {
            "klub": "Fremad Amager",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/16/4016.png",
            "url": "/stage/team?team=4016",
            "land": "Danmark"
        },
        {
            "klub": "HB Køge",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/9/6953.png",
            "url": "/stage/team?team=6953",
            "land": "Danmark"
        },
        {
            "klub": "Vejle",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/10/7466.png",
            "url": "/stage/team?team=7466",
            "land": "Danmark"
        },
        {
            "klub": "FC Helsingør",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/27/8635.png",
            "url": "/stage/team?team=8635",
            "land": "Danmark"
        },
        {
            "klub": "Hvidovre",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/17/8657.png",
            "url": "/stage/team?team=8657",
            "land": "Danmark"
        },
        {
            "klub": "Hillerød",
            "img": "https://cdn.sportmonks.com/images/soccer/team_placeholder.png",
            "url": "/stage/team?team=22608",
            "land": "Danmark"
        },
        {
            "klub": "Schalke 04",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/3/67.png",
            "url": "/stage/team?team=67",
            "land": "Tyskland"
        },
        {
            "klub": "Borussia Dortmund",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/4/68.png",
            "url": "/stage/team?team=68",
            "land": "Tyskland"
        },
        {
            "klub": "Werder Bremen",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/18/82.png",
            "url": "/stage/team?team=82",
            "land": "Tyskland"
        },
        {
            "klub": "FC Augsburg",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/26/90.png",
            "url": "/stage/team?team=90",
            "land": "Tyskland"
        },
        {
            "klub": "RB Leipzig",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/21/277.png",
            "url": "/stage/team?team=277",
            "land": "Tyskland"
        },
        {
            "klub": "Eintracht Frankfurt",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/14/366.png",
            "url": "/stage/team?team=366",
            "land": "Tyskland"
        },
        {
            "klub": "FC Bayern München",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/23/503.png",
            "url": "/stage/team?team=503",
            "land": "Tyskland"
        },
        {
            "klub": "VfL Wolfsburg",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/30/510.png",
            "url": "/stage/team?team=510",
            "land": "Tyskland"
        },
        {
            "klub": "Borussia Mönchengladbach",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/11/683.png",
            "url": "/stage/team?team=683",
            "land": "Tyskland"
        },
        {
            "klub": "FSV Mainz 05",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/26/794.png",
            "url": "/stage/team?team=794",
            "land": "Tyskland"
        },
        {
            "klub": "VfL Bochum 1848",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/7/999.png",
            "url": "/stage/team?team=999",
            "land": "Tyskland"
        },
        {
            "klub": "FC Union Berlin",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/23/1079.png",
            "url": "/stage/team?team=1079",
            "land": "Tyskland"
        },
        {
            "klub": "TSG Hoffenheim",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/6/2726.png",
            "url": "/stage/team?team=2726",
            "land": "Tyskland"
        },
        {
            "klub": "Hertha BSC",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/21/3317.png",
            "url": "/stage/team?team=3317",
            "land": "Tyskland"
        },
        {
            "klub": "VfB Stuttgart",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/23/3319.png",
            "url": "/stage/team?team=3319",
            "land": "Tyskland"
        },
        {
            "klub": "FC Köln",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/24/3320.png",
            "url": "/stage/team?team=3320",
            "land": "Tyskland"
        },
        {
            "klub": "Bayer 04 Leverkusen",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/25/3321.png",
            "url": "/stage/team?team=3321",
            "land": "Tyskland"
        },
        {
            "klub": "SC Freiburg",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/23/3543.png",
            "url": "/stage/team?team=3543",
            "land": "Tyskland"
        },
        {
            "klub": "Olympique Marseille",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/12/44.png",
            "url": "/stage/team?team=44",
            "land": "Frankrig"
        },
        {
            "klub": "Nantes",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/27/59.png",
            "url": "/stage/team?team=59",
            "land": "Frankrig"
        },
        {
            "klub": "Olympique Lyonnais",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/15/79.png",
            "url": "/stage/team?team=79",
            "land": "Frankrig"
        },
        {
            "klub": "Brest",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/10/266.png",
            "url": "/stage/team?team=266",
            "land": "Frankrig"
        },
        {
            "klub": "Lens",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/15/271.png",
            "url": "/stage/team?team=271",
            "land": "Frankrig"
        },
        {
            "klub": "Toulouse",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/1/289.png",
            "url": "/stage/team?team=289",
            "land": "Frankrig"
        },
        {
            "klub": "Nice",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/2/450.png",
            "url": "/stage/team?team=450",
            "land": "Frankrig"
        },
        {
            "klub": "Ajaccio",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/12/524.png",
            "url": "/stage/team?team=524",
            "land": "Frankrig"
        },
        {
            "klub": "Montpellier",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/5/581.png",
            "url": "/stage/team?team=581",
            "land": "Frankrig"
        },
        {
            "klub": "Paris Saint Germain",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/15/591.png",
            "url": "/stage/team?team=591",
            "land": "Frankrig"
        },
        {
            "klub": "Rennes",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/22/598.png",
            "url": "/stage/team?team=598",
            "land": "Frankrig"
        },
        {
            "klub": "Strasbourg",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/14/686.png",
            "url": "/stage/team?team=686",
            "land": "Frankrig"
        },
        {
            "klub": "Lille",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/18/690.png",
            "url": "/stage/team?team=690",
            "land": "Frankrig"
        },
        {
            "klub": "Angers SCO",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/8/776.png",
            "url": "/stage/team?team=776",
            "land": "Frankrig"
        },
        {
            "klub": "Reims",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/4/1028.png",
            "url": "/stage/team?team=1028",
            "land": "Frankrig"
        },
        {
            "klub": "Auxerre",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/2/3682.png",
            "url": "/stage/team?team=3682",
            "land": "Frankrig"
        },
        {
            "klub": "Monaco",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/5/6789.png",
            "url": "/stage/team?team=6789",
            "land": "Monaco"
        },
        {
            "klub": "Clermont",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/18/6898.png",
            "url": "/stage/team?team=6898",
            "land": "Frankrig"
        },
        {
            "klub": "Troyes",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/7/7047.png",
            "url": "/stage/team?team=7047",
            "land": "Frankrig"
        },
        {
            "klub": "Lorient",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/9/9257.png",
            "url": "/stage/team?team=9257",
            "land": "Frankrig"
        },
        {
            "klub": "Sporting CP",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/26/58.png",
            "url": "/stage/team?team=58",
            "land": "Portugal"
        },
        {
            "klub": "Gil Vicente",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/12/364.png",
            "url": "/stage/team?team=364",
            "land": "Portugal"
        },
        {
            "klub": "Belenenses",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/7/423.png",
            "url": "/stage/team?team=423",
            "land": "Portugal"
        },
        {
            "klub": "Benfica",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/29/605.png",
            "url": "/stage/team?team=605",
            "land": "Portugal"
        },
        {
            "klub": "Porto",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/12/652.png",
            "url": "/stage/team?team=652",
            "land": "Portugal"
        },
        {
            "klub": "Vitória SC",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/30/830.png",
            "url": "/stage/team?team=830",
            "land": "Portugal"
        },
        {
            "klub": "Sporting Braga",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/20/884.png",
            "url": "/stage/team?team=884",
            "land": "Portugal"
        },
        {
            "klub": "Boavista",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/0/960.png",
            "url": "/stage/team?team=960",
            "land": "Portugal"
        },
        {
            "klub": "Moreirense",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/29/1085.png",
            "url": "/stage/team?team=1085",
            "land": "Portugal"
        },
        {
            "klub": "Paços de Ferreira",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/2/1122.png",
            "url": "/stage/team?team=1122",
            "land": "Portugal"
        },
        {
            "klub": "Estoril",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/14/1198.png",
            "url": "/stage/team?team=1198",
            "land": "Portugal"
        },
        {
            "klub": "Portimonense",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/26/1658.png",
            "url": "/stage/team?team=1658",
            "land": "Portugal"
        },
        {
            "klub": "Santa Clara",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/4/2628.png",
            "url": "/stage/team?team=2628",
            "land": "Portugal"
        },
        {
            "klub": "Famalicão",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/25/3161.png",
            "url": "/stage/team?team=3161",
            "land": "Portugal"
        },
        {
            "klub": "Tondela",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/9/3497.png",
            "url": "/stage/team?team=3497",
            "land": "Portugal"
        },
        {
            "klub": "Arouca",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/28/4092.png",
            "url": "/stage/team?team=4092",
            "land": "Portugal"
        },
        {
            "klub": "Marítimo",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/11/5931.png",
            "url": "/stage/team?team=5931",
            "land": "Portugal"
        },
        {
            "klub": "Vizela",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/4/8164.png",
            "url": "/stage/team?team=8164",
            "land": "Portugal"
        },
        {
            "klub": "Celta de Vigo",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/4/36.png",
            "url": "/stage/team?team=36",
            "land": "Spanien"
        },
        {
            "klub": "FC Barcelona",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
            "url": "/stage/team?team=83",
            "land": "Spanien"
        },
        {
            "klub": "Granada",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/7/103.png",
            "url": "/stage/team?team=103",
            "land": "Spanien"
        },
        {
            "klub": "Getafe",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/10/106.png",
            "url": "/stage/team?team=106",
            "land": "Spanien"
        },
        {
            "klub": "Valencia",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/22/214.png",
            "url": "/stage/team?team=214",
            "land": "Spanien"
        },
        {
            "klub": "Rayo Vallecano",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/25/377.png",
            "url": "/stage/team?team=377",
            "land": "Spanien"
        },
        {
            "klub": "Osasuna",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/11/459.png",
            "url": "/stage/team?team=459",
            "land": "Spanien"
        },
        {
            "klub": "Real Betis",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/5/485.png",
            "url": "/stage/team?team=485",
            "land": "Spanien"
        },
        {
            "klub": "Espanyol",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/16/528.png",
            "url": "/stage/team?team=528",
            "land": "Spanien"
        },
        {
            "klub": "Real Sociedad",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/18/594.png",
            "url": "/stage/team?team=594",
            "land": "Spanien"
        },
        {
            "klub": "Mallorca",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/5/645.png",
            "url": "/stage/team?team=645",
            "land": "Spanien"
        },
        {
            "klub": "Sevilla",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/4/676.png",
            "url": "/stage/team?team=676",
            "land": "Spanien"
        },
        {
            "klub": "Elche",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/11/1099.png",
            "url": "/stage/team?team=1099",
            "land": "Spanien"
        },
        {
            "klub": "Deportivo Alavés",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/31/2975.png",
            "url": "/stage/team?team=2975",
            "land": "Spanien"
        },
        {
            "klub": "Levante",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/1/3457.png",
            "url": "/stage/team?team=3457",
            "land": "Spanien"
        },
        {
            "klub": "Real Madrid",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
            "url": "/stage/team?team=3468",
            "land": "Spanien"
        },
        {
            "klub": "Villarreal",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/21/3477.png",
            "url": "/stage/team?team=3477",
            "land": "Spanien"
        },
        {
            "klub": "Cádiz",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/11/6827.png",
            "url": "/stage/team?team=6827",
            "land": "Spanien"
        },
        {
            "klub": "Atlético Madrid",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/12/7980.png",
            "url": "/stage/team?team=7980",
            "land": "Spanien"
        },
        {
            "klub": "Athletic Club",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/10/13258.png",
            "url": "/stage/team?team=13258",
            "land": "Spanien"
        },
        {
            "klub": "AZ",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/29/61.png",
            "url": "/stage/team?team=61",
            "land": "Holland"
        },
        {
            "klub": "Feyenoord",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/9/73.png",
            "url": "/stage/team?team=73",
            "land": "Holland"
        },
        {
            "klub": "Vitesse",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/30/94.png",
            "url": "/stage/team?team=94",
            "land": "Holland"
        },
        {
            "klub": "NEC",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/14/494.png",
            "url": "/stage/team?team=494",
            "land": "Holland"
        },
        {
            "klub": "FC Twente",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/17/593.png",
            "url": "/stage/team?team=593",
            "land": "Holland"
        },
        {
            "klub": "Ajax",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/21/629.png",
            "url": "/stage/team?team=629",
            "land": "Holland"
        },
        {
            "klub": "Go Ahead Eagles",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/24/664.png",
            "url": "/stage/team?team=664",
            "land": "Holland"
        },
        {
            "klub": "PSV",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/10/682.png",
            "url": "/stage/team?team=682",
            "land": "Holland"
        },
        {
            "klub": "FC Utrecht",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/14/750.png",
            "url": "/stage/team?team=750",
            "land": "Holland"
        },
        {
            "klub": "RKC Waalwijk",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/14/814.png",
            "url": "/stage/team?team=814",
            "land": "Holland"
        },
        {
            "klub": "Sparta Rotterdam",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/23/919.png",
            "url": "/stage/team?team=919",
            "land": "Holland"
        },
        {
            "klub": "SC Heerenveen",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/29/1053.png",
            "url": "/stage/team?team=1053",
            "land": "Holland"
        },
        {
            "klub": "SC Cambuur",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/27/1435.png",
            "url": "/stage/team?team=1435",
            "land": "Holland"
        },
        {
            "klub": "Fortuna Sittard",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/19/1459.png",
            "url": "/stage/team?team=1459",
            "land": "Holland"
        },
        {
            "klub": "Excelsior",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/20/1652.png",
            "url": "/stage/team?team=1652",
            "land": "Holland"
        },
        {
            "klub": "FC Groningen",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/9/2345.png",
            "url": "/stage/team?team=2345",
            "land": "Holland"
        },
        {
            "klub": "FC Volendam",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/28/2396.png",
            "url": "/stage/team?team=2396",
            "land": "Holland"
        },
        {
            "klub": "FC Emmen",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/11/2475.png",
            "url": "/stage/team?team=2475",
            "land": "Holland"
        },
        {
            "klub": "Malmö FF",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/2/354.png",
            "url": "/stage/team?team=354",
            "land": "Sverige"
        },
        {
            "klub": "Mjällby",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/27/411.png",
            "url": "/stage/team?team=411",
            "land": "Sverige"
        },
        {
            "klub": "Kalmar",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/16/432.png",
            "url": "/stage/team?team=432",
            "land": "Sverige"
        },
        {
            "klub": "Djurgården",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/27/443.png",
            "url": "/stage/team?team=443",
            "land": "Sverige"
        },
        {
            "klub": "IFK Göteborg",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/20/532.png",
            "url": "/stage/team?team=532",
            "land": "Sverige"
        },
        {
            "klub": "Helsingborg",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/22/534.png",
            "url": "/stage/team?team=534",
            "land": "Sverige"
        },
        {
            "klub": "Elfsborg",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/10/1226.png",
            "url": "/stage/team?team=1226",
            "land": "Sverige"
        },
        {
            "klub": "Hammarby",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/17/2353.png",
            "url": "/stage/team?team=2353",
            "land": "Sverige"
        },
        {
            "klub": "Häcken",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/7/2535.png",
            "url": "/stage/team?team=2535",
            "land": "Sverige"
        },
        {
            "klub": "Sirius",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/22/2678.png",
            "url": "/stage/team?team=2678",
            "land": "Sverige"
        },
        {
            "klub": "Degerfors",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/1/2753.png",
            "url": "/stage/team?team=2753",
            "land": "Sverige"
        },
        {
            "klub": "AIK",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/9/2825.png",
            "url": "/stage/team?team=2825",
            "land": "Sverige"
        },
        {
            "klub": "Norrköping",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/19/3603.png",
            "url": "/stage/team?team=3603",
            "land": "Sverige"
        },
        {
            "klub": "Värnamo",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/15/6607.png",
            "url": "/stage/team?team=6607",
            "land": "Sverige"
        },
        {
            "klub": "GIF Sundsvall",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/27/9179.png",
            "url": "/stage/team?team=9179",
            "land": "Sverige"
        },
        {
            "klub": "Varberg BoIS",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/11/13451.png",
            "url": "/stage/team?team=13451",
            "land": "Sverige"
        },
        {
            "klub": "Roma",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/5/37.png",
            "url": "/stage/team?team=37",
            "land": "Italien"
        },
        {
            "klub": "Lazio",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/11/43.png",
            "url": "/stage/team?team=43",
            "land": "Italien"
        },
        {
            "klub": "Genoa",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/6/102.png",
            "url": "/stage/team?team=102",
            "land": "Italien"
        },
        {
            "klub": "Fiorentina",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/13/109.png",
            "url": "/stage/team?team=109",
            "land": "Italien"
        },
        {
            "klub": "Milan",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/17/113.png",
            "url": "/stage/team?team=113",
            "land": "Italien"
        },
        {
            "klub": "Venezia",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/11/267.png",
            "url": "/stage/team?team=267",
            "land": "Italien"
        },
        {
            "klub": "Spezia",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/25/345.png",
            "url": "/stage/team?team=345",
            "land": "Italien"
        },
        {
            "klub": "Udinese",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/26/346.png",
            "url": "/stage/team?team=346",
            "land": "Italien"
        },
        {
            "klub": "Empoli",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/13/397.png",
            "url": "/stage/team?team=397",
            "land": "Italien"
        },
        {
            "klub": "Sampdoria",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/10/522.png",
            "url": "/stage/team?team=522",
            "land": "Italien"
        },
        {
            "klub": "Cagliari",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/9/585.png",
            "url": "/stage/team?team=585",
            "land": "Italien"
        },
        {
            "klub": "Napoli",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/21/597.png",
            "url": "/stage/team?team=597",
            "land": "Italien"
        },
        {
            "klub": "Torino",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/5/613.png",
            "url": "/stage/team?team=613",
            "land": "Italien"
        },
        {
            "klub": "Juventus",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/17/625.png",
            "url": "/stage/team?team=625",
            "land": "Italien"
        },
        {
            "klub": "Atalanta",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/4/708.png",
            "url": "/stage/team?team=708",
            "land": "Italien"
        },
        {
            "klub": "Hellas Verona",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/3/1123.png",
            "url": "/stage/team?team=1123",
            "land": "Italien"
        },
        {
            "klub": "Sassuolo",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/26/2714.png",
            "url": "/stage/team?team=2714",
            "land": "Italien"
        },
        {
            "klub": "Inter",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/18/2930.png",
            "url": "/stage/team?team=2930",
            "land": "Italien"
        },
        {
            "klub": "Salernitana",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/31/7743.png",
            "url": "/stage/team?team=7743",
            "land": "Italien"
        },
        {
            "klub": "Bologna",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/1/8513.png",
            "url": "/stage/team?team=8513",
            "land": "Italien"
        },
        {
            "klub": "West Ham United",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/1/1.png",
            "url": "/stage/team?team=1",
            "land": "England"
        },
        {
            "klub": "Tottenham Hotspur",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/6/6.png",
            "url": "/stage/team?team=6",
            "land": "England"
        },
        {
            "klub": "Liverpool",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
            "url": "/stage/team?team=8",
            "land": "England"
        },
        {
            "klub": "Manchester City",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
            "url": "/stage/team?team=9",
            "land": "England"
        },
        {
            "klub": "Fulham",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/11/11.png",
            "url": "/stage/team?team=11",
            "land": "England"
        },
        {
            "klub": "Everton",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/13/13.png",
            "url": "/stage/team?team=13",
            "land": "England"
        },
        {
            "klub": "Manchester United",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
            "url": "/stage/team?team=14",
            "land": "England"
        },
        {
            "klub": "Aston Villa",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/15/15.png",
            "url": "/stage/team?team=15",
            "land": "England"
        },
        {
            "klub": "Chelsea",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/18/18.png",
            "url": "/stage/team?team=18",
            "land": "England"
        },
        {
            "klub": "Arsenal",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/19/19.png",
            "url": "/stage/team?team=19",
            "land": "England"
        },
        {
            "klub": "Newcastle United",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/20/20.png",
            "url": "/stage/team?team=20",
            "land": "England"
        },
        {
            "klub": "Wolverhampton Wanderers",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/29/29.png",
            "url": "/stage/team?team=29",
            "land": "England"
        },
        {
            "klub": "Leicester City",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/10/42.png",
            "url": "/stage/team?team=42",
            "land": "England"
        },
        {
            "klub": "Crystal Palace",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/19/51.png",
            "url": "/stage/team?team=51",
            "land": "England"
        },
        {
            "klub": "AFC Bournemouth",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/20/52.png",
            "url": "/stage/team?team=52",
            "land": "England"
        },
        {
            "klub": "Nottingham Forest",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/31/63.png",
            "url": "/stage/team?team=63",
            "land": "England"
        },
        {
            "klub": "Southampton",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/1/65.png",
            "url": "/stage/team?team=65",
            "land": "England"
        },
        {
            "klub": "Leeds United",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/7/71.png",
            "url": "/stage/team?team=71",
            "land": "England"
        },
        {
            "klub": "Brighton & Hove Albion",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/14/78.png",
            "url": "/stage/team?team=78",
            "land": "England"
        },
        {
            "klub": "Brentford",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/12/236.png",
            "url": "/stage/team?team=236",
            "land": "England"
        },
        {
            "klub": "Blackburn Rovers",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/2/2.png",
            "url": "/stage/team?team=2",
            "land": "England"
        },
        {
            "klub": "Middlesbrough",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/7/7.png",
            "url": "/stage/team?team=7",
            "land": "England"
        },
        {
            "klub": "West Bromwich Albion",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/10/10.png",
            "url": "/stage/team?team=10",
            "land": "England"
        },
        {
            "klub": "Birmingham City",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/12/12.png",
            "url": "/stage/team?team=12",
            "land": "England"
        },
        {
            "klub": "Sheffield United",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/21/21.png",
            "url": "/stage/team?team=21",
            "land": "England"
        },
        {
            "klub": "Hull City",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/22/22.png",
            "url": "/stage/team?team=22",
            "land": "England"
        },
        {
            "klub": "Reading",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/23/23.png",
            "url": "/stage/team?team=23",
            "land": "England"
        },
        {
            "klub": "Derby County",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/24/24.png",
            "url": "/stage/team?team=24",
            "land": "England"
        },
        {
            "klub": "Stoke City",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/26/26.png",
            "url": "/stage/team?team=26",
            "land": "England"
        },
        {
            "klub": "Blackpool",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/28/28.png",
            "url": "/stage/team?team=28",
            "land": "England"
        },
        {
            "klub": "Swansea City",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/30/30.png",
            "url": "/stage/team?team=30",
            "land": "Wales"
        },
        {
            "klub": "Queens Park Rangers",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/15/47.png",
            "url": "/stage/team?team=47",
            "land": "England"
        },
        {
            "klub": "Barnsley",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/22/54.png",
            "url": "/stage/team?team=54",
            "land": "England"
        },
        {
            "klub": "Millwall",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/0/64.png",
            "url": "/stage/team?team=64",
            "land": "England"
        },
        {
            "klub": "Cardiff City",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/5/69.png",
            "url": "/stage/team?team=69",
            "land": "Wales"
        },
        {
            "klub": "Preston North End",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/3/99.png",
            "url": "/stage/team?team=99",
            "land": "England"
        },
        {
            "klub": "Luton Town",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/19/115.png",
            "url": "/stage/team?team=115",
            "land": "England"
        },
        {
            "klub": "Coventry City",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/21/117.png",
            "url": "/stage/team?team=117",
            "land": "England"
        },
        {
            "klub": "Bristol City",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/26/122.png",
            "url": "/stage/team?team=122",
            "land": "England"
        },
        {
            "klub": "Huddersfield Town",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/27/251.png",
            "url": "/stage/team?team=251",
            "land": "England"
        },
        {
            "klub": "Peterborough United",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/30/254.png",
            "url": "/stage/team?team=254",
            "land": "England"
        },
        {
            "klub": "Haugesund",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/14/270.png",
            "url": "/stage/team?team=270",
            "land": "Norge"
        },
        {
            "klub": "Molde",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/2/290.png",
            "url": "/stage/team?team=290",
            "land": "Norge"
        },
        {
            "klub": "Strømsgodset",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/25/313.png",
            "url": "/stage/team?team=313",
            "land": "Norge"
        },
        {
            "klub": "Viking",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/1/321.png",
            "url": "/stage/team?team=321",
            "land": "Norge"
        },
        {
            "klub": "Aalesund",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/9/393.png",
            "url": "/stage/team?team=393",
            "land": "Norge"
        },
        {
            "klub": "Vålerenga",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/22/502.png",
            "url": "/stage/team?team=502",
            "land": "Norge"
        },
        {
            "klub": "Sandefjord",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/9/617.png",
            "url": "/stage/team?team=617",
            "land": "Norge"
        },
        {
            "klub": "Kristiansund",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/5/869.png",
            "url": "/stage/team?team=869",
            "land": "Norge"
        },
        {
            "klub": "Odd",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/2/930.png",
            "url": "/stage/team?team=930",
            "land": "Norge"
        },
        {
            "klub": "Rosenborg",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/23/1335.png",
            "url": "/stage/team?team=1335",
            "land": "Norge"
        },
        {
            "klub": "Bodø / Glimt",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/4/1668.png",
            "url": "/stage/team?team=1668",
            "land": "Norge"
        },
        {
            "klub": "Jerv",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/5/2469.png",
            "url": "/stage/team?team=2469",
            "land": "Norge"
        },
        {
            "klub": "Lillestrøm",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/14/2510.png",
            "url": "/stage/team?team=2510",
            "land": "Norge"
        },
        {
            "klub": "Sarpsborg 08",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/9/2601.png",
            "url": "/stage/team?team=2601",
            "land": "Norge"
        },
        {
            "klub": "Tromsø",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/10/7242.png",
            "url": "/stage/team?team=7242",
            "land": "Norge"
        },
        {
            "klub": "HamKam",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/21/8661.png",
            "url": "/stage/team?team=8661",
            "land": "Norge"
        },
        {
            "klub": "Champions League",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/2.png",
            "url": "/stage/league?id=19699",
            "land": "Europa"
        },
        {
            "klub": "Europa League",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/5.png",
            "url": "/stage/league?id=18629",
            "land": "Europa"
        },
        {
            "klub": "Premier League",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/8/8.png",
            "url": "/stage/league?id=19734",
            "land": "England"
        },
        {
            "klub": "Championship",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/9/9.png",
            "url": "/stage/league?id=18432",
            "land": "England"
        },
        {
            "klub": "FA Cup",
            "img": "https://cdn.sportmonks.com/images//soccer/leagues/24/24.png",
            "url": "/stage/league?id=18546",
            "land": "England"
        },
        {
            "klub": "Eredivisie",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/72.png",
            "url": "/stage/league?id=19726",
            "land": "Holland"
        },
        {
            "klub": "Bundesliga",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/82.png",
            "url": "/stage/league?id=19744",
            "land": "Tyskland"
        },
        {
            "klub": "Admiral Bundesliga",
            "img": "https://cdn.sportmonks.com/images//soccer/leagues/21/181.png",
            "url": "/stage/league?id=18421",
            "land": "Austria"
        },
        {
            "klub": "Pro League",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/16/208.png",
            "url": "/stage/league?id=18348",
            "land": "Belgium"
        },
        {
            "klub": "1. HNL",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/20/244.png",
            "url": "/stage/league?id=19709",
            "land": "Croatia"
        },
        {
            "klub": "Superliga",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/271.png",
            "url": "/stage/league?id=19686",
            "land": "Danmark"
        },
        {
            "klub": "First Division",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/18/274.png",
            "url": "/stage/league?id=19706",
            "land": "Danmark"
        },
        {
            "klub": "Ligue 1",
            "img": "https://cdn.sportmonks.com/images//soccer/leagues/13/301.png",
            "url": "/stage/league?id=19745",
            "land": "Frankrig"
        },
        {
            "klub": "Serie A",
            "img": "https://cdn.sportmonks.com/images//soccer/leagues/0/384.png",
            "url": "/stage/league?id=18576",
            "land": "Italien"
        },
        {
            "klub": "Coppa Italia",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/6/390.png",
            "url": "/stage/league?id=18608",
            "land": "Italien"
        },
        {
            "klub": "Eliteserien",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/28/444.png",
            "url": "/stage/league?id=19369",
            "land": "Norge"
        },
        {
            "klub": "Ekstraklasa",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/5/453.png",
            "url": "/stage/league?id=19692",
            "land": "Poland"
        },
        {
            "klub": "Primeira Liga",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/14/462.png",
            "url": "/stage/league?id=18529",
            "land": "Portugal"
        },
        {
            "klub": "Premier League",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/6/486.png",
            "url": "/stage/league?id=18375",
            "land": "Russia"
        },
        {
            "klub": "Premiership",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/501.png",
            "url": "/stage/league?id=19735",
            "land": "Scotland"
        },
        {
            "klub": "La Liga",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/564.png",
            "url": "/stage/league?id=18462",
            "land": "Spanien"
        },
        {
            "klub": "Copa Del Rey",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/26/570.png",
            "url": "/stage/league?id=19089",
            "land": "Spanien"
        },
        {
            "klub": "Allsvenskan",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/29/573.png",
            "url": "/stage/league?id=19376",
            "land": "Sverige"
        },
        {
            "klub": "Super League",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/15/591.png",
            "url": "/stage/league?id=19748",
            "land": "Switzerland"
        },
        {
            "klub": "Super Lig",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/24/600.png",
            "url": "/stage/league?id=18568",
            "land": "Turkey"
        },
        {
            "klub": "Premier League",
            "img": "https://cdn.sportmonks.com/images/soccer/leagues/1/609.png",
            "url": "/stage/league?id=18379",
            "land": "Ukraine"
        },
        {
            "klub": "UEFA Europa League Play-offs",
            "img": "https://cdn.sportmonks.com/images//soccer/leagues/27/1371.png",
            "url": "/stage/league?id=15998",
            "land": "Belgium"
        },
        {
            "klub": "UEFA Nations League",
            "img": "https://cdn.sportmonks.com/images//soccer/leagues/2/1538.png",
            "url": "/stage/league?id=19273",
            "land": "Europa"
        },
        {
            "klub": "Europa Conference League",
            "img": "https://cdn.sportmonks.com/images//soccer/leagues/14/2286.png",
            "url": "/stage/league?id=19724",
            "land": "Europa"
        }
    ]);
    const [search, setSearch] = useState([]);
    const [searchStr, setSearchStr] = useState("");
    const [auth, setAuth] = useState("");

    useEffect(() => {
        setAuth(localStorage.getItem("auth"));
    }, [])

    useEffect(() => {
        if (searchStr === "") {
            setSearch(items);
        } else {
            var dupli = items;
            var newDupli = [];
            for (var y in dupli) {
                if (dupli[y].klub.includes(searchStr)) {
                    newDupli.push(dupli[y]);
                } else if (dupli[y].land.includes(searchStr)) {
                    newDupli.push(dupli[y]);
                }
            }
            setSearch(newDupli);
        }
    }, [searchStr])

    const [notifikationer, sestNotifikationer] = useState("");

    function getAdmin() {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem("auth")) {
                const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
            
                var decodedToken = jwtDecode(authToken);
                var todayTime = new Date().getTime();
                var todayMS = todayTime/1000;
                
                if (decodedToken.exp > todayMS && decodedToken.rolle === "administrator") {
                    return (
                        <Link href="/admin/hjem">
                            <div className="user-element">
                                <p className="user-element-p">Admin-Panel</p>
                            </div>
                        </Link>
                    );
                } else {
                    return;
                }
            }
        }
    }

    function logout() {
        resetUserSession();
        window.open("/", "_self");
    }

    function showSearch() {
        document.getElementById("mb-search").classList.remove("display-not")
        document.getElementById("nav-hits").classList.add("display");
        document.getElementById("hits-close").classList.add("display");
    }

    function closeSearch() {
        document.getElementById("mb-search").classList.add("display-not")
        document.getElementById("nav-hits").classList.remove("display");
        document.getElementById("hits-close").classList.remove("display");
    }

    function sideMenu() {
        document.getElementById("sidemenu").classList.add("display-flex");
    }

    function closeMenu() {
        document.getElementById("sidemenu").classList.remove("display-flex");
    }

    return (
        <>
            <div className="nav-bar-stage" id="nav-small-bar">
                <div className="nav-container-top-stage">
                    <div className="nav-flag-container">
                        <div className="nav-flag-section">
                            <Image width="32px" height="32px" src={flag} alt="Danmarks flag" className="nav-flag" onClick={() => {document.getElementById("userDropdownFlag").classList.toggle("display");}} />
                            <div className="user-dropdownFlag" id="userDropdownFlag">
                                <div className="user-elementFlag">
                                    <Image width="22px" height="22px" src={flag} alt="Danmark" className="user-flag-icon" />
                                    <p className="user-element-p">Dansk</p>
                                </div>
                                <div className="user-elementFlag">
                                    <Image width="22px" height="22px" src={england} alt="England" className="user-flag-icon" />
                                    <p className="user-element-p">Engelsk</p>
                                </div>
                            </div>
                        </div>
                        <div className="nav-search">
                            <div className="search-sc" onClick={() => {showSearch()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="nav-short-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                                <p className="search-sc-p">Søg i hold, ligaer og lande</p>
                            </div>
                        </div>
                    </div>
                    <div className="nav-hits" id="nav-hits">
                        <div className="search-el display-not" id="mb-search">
                            <svg xmlns="http://www.w3.org/2000/svg" id="hits-close" onClick={() => {closeSearch()}} className="hits-close" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                            <input type="text" placeholder="Søg" className="search-input"onChange={event => setSearchStr(event.target.value)} />
                        </div>
                        <div className="search-hits">
                        <ul id="alleG" style={{width: "100%"}}>
                            {search.map((item) => {
                                return (
                                    <li key={item.klub + item.url} className="display" style={{width: "100%"}}>
                                        <div className="hit-elem" style={{width: "100%"}} onClick={() => {closeSearch(); window.open(item.url, "_SELF")}}>
                                            <div className="hit-con">
                                                <Image width="27px" height="27px" alt="." src={item.img} className="hit-img" />
                                            </div>
                                            <div className="hit-info">
                                                <p className="hit-h1">{item.klub}</p>
                                                <p className="hit-h2">{item.land}</p>
                                            </div>
                                        </div>
                                    </li>
                                    );
                                }
                            )}
                        </ul>
                        </div>
                    </div>
                    <Link href="/stage">
                        <div className="inline-flex" style={{alignItems: "center"}}>
                            <div className="header-inline">
                                <Image width="35px" height="35px" src={tlogo} alt="Tipsspillet logo" className="footer-i" />
                                <p className="logo-erstat">Tipsspillet</p>
                            </div>
                            <Image width="150px" height="60px" src={logo} alt="Tipsspillet Logo" className="main-logo middle-logo" />
                        </div>
                    </Link>
                    <div className="nav-container-stage-right">
                        <div className="nav-profile">
                            <div className="nav-error" id="main-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="nav-error-img" viewBox="0 0 16 16" id="errorIcon">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                                <p className="nav-error-p" id="main-error-p">Din konto er suspenderet.</p>
                                <Link href="#"><a className="nav-error-a">Find ud af hvorfor</a></Link>
                            </div>
                            <div className="nav-error">
                                <p className="nav-info-p">Alpha - V. 1.1.0</p>
                            </div>
                            <Link href="/stage/indstillinger">
                                <div className="nav-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bell-icon" viewBox="0 0 16 16">
                                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                    </svg>
                                </div>
                            </Link>
                            <Link href="/stage/notifikationer">
                                <div className="nav-link">
                                    <div className="noti-icon" id="notital">{notifikationer}</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bell-icon" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                    </svg>
                                </div>
                            </Link>
                            <div className="nav-profile-btn" onClick={() => {document.getElementById("userDropdown").classList.toggle("display"); document.getElementById("profileArrow").classList.toggle("deg180");}}>
                                <div className="nav-profile-pic"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="profile-icon" id="profileArrow" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                            <div className="user-dropdown" id="userDropdown">
                                <div className="user-info">
                                    <div className="user-logo-tem"></div>
                                    <div className="user-info-desc">
                                        <p className="user-name">{auth !== "" && <>{JSON.parse(auth).username}</>}</p>
                                        <p className="user-email">{auth !== "" && <>{JSON.parse(auth).email}</>}</p>
                                    </div>
                                </div>
                                <div className="user-divider"></div>
                                <Link href="/stage/profil">
                                    <div className="user-element">
                                        <p className="user-element-p">Din profil</p>
                                    </div>
                                </Link>
                                {getAdmin()}
                                <div className="user-element" onClick={() => logout()}>
                                    <p className="user-element-p">Log ud</p>
                                </div>
                            </div>
                            <div className="nav-icons">
                                <svg xmlns="http://www.w3.org/2000/svg" className="nav-ham" onClick={() => showSearch()} viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="nav-ham-ham" onClick={() => {sideMenu()}} viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                            </div>
                            <div className="sidemenu" id="sidemenu">
                                <div className="side-nav-container-top-stage">
                                    <div className="nav-flag-container">
                                        <div className="nav-flag-section">
                                            <Image width="32px" height="32px" src={flag} alt="Danmarks flag" className="nav-flag" onClick={() => {document.getElementById("userDropdownFlag").classList.toggle("display");}} />
                                            <div className="user-dropdownFlag" id="userDropdownFlag">
                                                <div className="user-elementFlag">
                                                    <Image width="22px" height="22px" src={flag} alt="Danmark" className="user-flag-icon" />
                                                    <p className="user-element-p">Dansk</p>
                                                </div>
                                                <div className="user-elementFlag">
                                                    <Image width="22px" height="22px" src={england} alt="England" className="user-flag-icon" />
                                                    <p className="user-element-p">Engelsk</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="nav-search">
                                            <div className="search-sc" onClick={() => {showSearch()}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="nav-short-search" viewBox="0 0 16 16">
                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                                </svg>
                                                <p className="search-sc-p">Søg i hold, ligaer og lande</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/stage">
                                        <div>
                                            <div className="ab-left">
                                                <Image width="150px" height="60px" src={logo} alt="Tipsspillet Logo" className="main-logo middle-logo" />
                                            </div>
                                            <div className="header-inline">
                                                <Image width="35px" height="35px" src={tlogo} alt="Tipsspillet logo" className="footer-i" />
                                                <p className="logo-erstat">Tipsspillet</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="nav-container-stage-right">
                                        <div className="nav-profile">
                                            <div className="nav-error" id="main-error">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="nav-error-img" viewBox="0 0 16 16" id="errorIcon">
                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                </svg>
                                                <p className="nav-error-p" id="main-error-p">Din konto er suspenderet.</p>
                                                <Link href="#"><a className="nav-error-a">Find ud af hvorfor</a></Link>
                                            </div>
                                            <div className="nav-error">
                                                <p className="nav-info-p">Alpha - V. 1.1.0</p>
                                            </div>
                                            <Link href="/stage/indstillinger">
                                                <div className="nav-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="bell-icon" viewBox="0 0 16 16">
                                                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                                    </svg>
                                                </div>
                                            </Link>
                                            <Link href="/stage/notifikationer">
                                                <div className="nav-link">
                                                    <div className="noti-icon" id="notital">{notifikationer}</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="bell-icon" viewBox="0 0 16 16">
                                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                                    </svg>
                                                </div>
                                            </Link>
                                            <div className="nav-profile-btn" onClick={() => {document.getElementById("userDropdown").classList.toggle("display"); document.getElementById("profileArrow").classList.toggle("deg180");}}>
                                                <div className="nav-profile-pic"></div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="profile-icon" id="profileArrow" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </div>
                                            <div className="user-dropdown" id="userDropdown">
                                                <div className="user-info">
                                                    <div className="user-logo-tem"></div>
                                                    <div className="user-info-desc">
                                                        <p className="user-name">{auth !== "" && <>{JSON.parse(auth).username}</>}</p>
                                                        <p className="user-email">{auth !== "" && <>{JSON.parse(auth).email}</>}</p>
                                                    </div>
                                                </div>
                                                <div className="user-divider"></div>
                                                <div className="user-element">
                                                    <p className="user-element-p">Din profil</p>
                                                </div>
                                                {getAdmin()}
                                                <div className="user-element" onClick={() => logout()}>
                                                    <p className="user-element-p">Log ud</p>
                                                </div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="sidemenu-ham" onClick={() => {closeMenu()}} viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidemenu-click" onClick={() => closeMenu()}></div>
                                <div className="sidemenu-fill">
                                    <div className="sidemenu-search" onClick={() => {closeMenu();showSearch();}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="sidemenu-icon" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                        </svg>
                                        <p className="sidemenu-h2">Søg i klubber, lande eller ligaer</p>
                                    </div>
                                    <div className="sidemenu-topmenu">
                                        <Link href="/stage/profil">
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => closeMenu()} className="sidemenu-topmenu-icon" viewBox="0 0 16 16">
                                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                            </svg>
                                        </Link>
                                        <Link href="/stage/notifikationer">
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => closeMenu()} className="sidemenu-topmenu-icon" viewBox="0 0 16 16">
                                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                            </svg>
                                        </Link>
                                        <Link href="/stage/indstillinger">
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => closeMenu()} className="sidemenu-topmenu-icon" viewBox="0 0 16 16">
                                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="sidemenu-div">
                                        <div className="sidemenu-element">
                                            <Link href="/stage"><a className="sidemenu-p" onClick={() => closeMenu()}>Lav kupon</a></Link>
                                            <Link href="/stage/gruppespil"><a className="sidemenu-p" onClick={() => closeMenu()}>Gruppespil</a></Link>
                                            <Link href="/priser"><a className="sidemenu-p" onClick={() => closeMenu()}>Abonnement</a></Link>
                                            <Link href="/stage/faq"><a className="sidemenu-p" onClick={() => closeMenu()}>Spørgsmål og svar</a></Link>
                                            <p onClick={() => logout()} className="sidemenu-p">Log ud</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-container-bottom" id="nav-bar">
                    <div className="nav-link-container">
                        <Link href="/stage/"><a className="nav-p-stage">Lav kupon</a></Link>
                    </div>
                    <div className="nav-link-container">
                        <Link href="/stage/gruppespil"><a className="nav-p-stage">Gruppespil</a></Link>
                    </div>
                    <div className="nav-link-container">
                        <Link href="/stage/faq"><a className="nav-p-stage">FAQ</a></Link>
                    </div>
                    <div className="nav-link-container">
                        <Link href="/priser"><a className="nav-p-stage">Abonnement</a></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default StageHeader;