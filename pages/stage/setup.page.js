import {useEffect, useState} from 'react';
import FaqSite from '../components/faq';
import axios from "axios";
import jwtDecode from "jwt-decode";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import StageHeader from '../layout/stageheader'
 
function Setup () {

    useEffect(() => {
        apiCall();
    }, [])

    const [ligasearch, setLigaSearch] = useState([]);
    const [ligasearchStr, setLigaSearchStr] = useState("");

    const [klubsearch, setKlubSearch] = useState([]);
    const [klubsearchStr, setKlubSearchStr] = useState("");

    const [gruppespilsearch, setGruppespilSearch] = useState([]);
    const [gruppespilsearchStr, setGruppespilSearchStr] = useState("");

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (klubsearchStr === "") {
            setKlubSearch(klubber);
        } else {
            var dupli = klubber;
            var newDupli = [];
            for (var y in dupli) {
                if ((dupli[y].name.toLowerCase()).includes(klubsearchStr.toLowerCase())) {
                    newDupli.push(dupli[y]);
                } else if ((dupli[y].liga.toLowerCase()).includes(klubsearchStr.toLowerCase())) {
                    newDupli.push(dupli[y]);
                }
            }
            setKlubSearch(newDupli);
        }
    }, [klubsearchStr])

    useEffect(() => {
        if (gruppespilsearchStr === "") {
            setGruppespilSearch(gruppespil);
        } else {
            var dupli = gruppespil;
            var newDupli = [];
            for (var y in dupli) {
                if ((dupli[y].name.toLowerCase()).includes(gruppespilsearchStr.toLowerCase())) {
                    newDupli.push(dupli[y]);
                } else if ((dupli[y].admin.toLowerCase()).includes(gruppespilsearchStr.toLowerCase())) {
                    newDupli.push(dupli[y]);
                }
            }
            setGruppespilSearch(newDupli);
        }
    }, [gruppespilsearchStr])

    useEffect(() => {
        if (ligasearchStr === "") {
            setLigaSearch(ligaer);
        } else {
            var dupli = ligaer;
            var newDupli = [];
            for (var y in dupli) {
                if ((dupli[y].name.toLowerCase()).includes(ligasearchStr.toLowerCase())) {
                    newDupli.push(dupli[y]);
                } else if ((dupli[y].liga.toLowerCase()).includes(ligasearchStr.toLowerCase())) {
                    newDupli.push(dupli[y]);
                }
            }
            setLigaSearch(newDupli);
        }
    }, [ligasearchStr])

    const [gruppespil, setGruppespil] = useState([]);

    const [loading, setLoading] = useState("Indlæser...");

    useEffect(() => {
        if (loading !== "Indlæser...") {
            document.getElementById("stage-loader1").classList.remove("display");
        }
    }, [loading])

    function apiCall() {
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppespil";

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log("AWS - Gruppespil:", response)
            setGruppespilSearch(response.data.allGruppespil);
            setGruppespil(response.data.allGruppespil)
            setLoading("");
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    const [klubber, setKlubber] = useState([
        {
            "name": "Manchester United",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
            "id": 14,
            "liga": "England"
        },
        {
            "name": "Chelsea",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/18/18.png",
            "id": 18,
            "liga": "England"
        },
        {
            "name": "Arsenal",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/19/19.png",
            "id": 19,
            "liga": "England"
        },
        {
            "name": "Tottenham Hotspur",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/6/6.png",
            "id": 6,
            "liga": "England"
        },
        {
            "name": "Liverpool",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
            "id": 8,
            "liga": "England"
        },
        {
            "name": "Manchester City",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
            "id": 9,
            "liga": "England"
        },
        {
            "name": "København",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/21/85.png",
            "id": 85,
            "liga": "Danmark"
        },
        {
            "name": "Silkeborg",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/22/86.png",
            "id": 86,
            "liga": "Danmark"
        },
        {
            "name": "Horsens",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/19/211.png",
            "id": 211,
            "liga": "Danmark"
        },
        {
            "name": "Brøndby",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/5/293.png",
            "id": 293,
            "liga": "Danmark"
        },
        {
            "name": "Midtjylland",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/11/939.png",
            "id": 939,
            "liga": "Danmark"
        },
        {
            "name": "AaB",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/28/1020.png",
            "id": 1020,
            "liga": "Danmark"
        },
        {
            "name": "OB",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/29/1789.png",
            "id": 1789,
            "liga": "Danmark"
        },
        {
            "name": "Randers",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/20/2356.png",
            "id": 2356,
            "liga": "Danmark"
        },
        {
            "name": "Nordsjælland",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/26/2394.png",
            "id": 2394,
            "liga": "Danmark"
        },
        {
            "name": "Viborg",
            "image": "https://cdn.sportmonks.com/images/soccer/team_placeholder.png",
            "id": 2447,
            "liga": "Danmark"
        },
        {
            "name": "Lyngby",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/26/2650.png",
            "id": 2650,
            "liga": "Danmark"
        },
        {
            "name": "AGF",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/25/2905.png",
            "id": 2905,
            "liga": "Danmark"
        },
        {
            "name": "SønderjyskE",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/6/390.png",
            "id": 390,
            "liga": "Danmark"
        },
        {
            "name": "Nykøbing",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/0/1664.png",
            "id": 1664,
            "liga": "Danmark"
        },
        {
            "name": "Hobro",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/7/1703.png",
            "id": 1703,
            "liga": "Danmark"
        },
        {
            "name": "Næstved",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/18/1938.png",
            "id": 1938,
            "liga": "Danmark"
        },
        {
            "name": "Vendsyssel",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/18/2706.png",
            "id": 2706,
            "liga": "Danmark"
        },
        {
            "name": "Fredericia",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/21/2933.png",
            "id": 2933,
            "liga": "Danmark"
        },
        {
            "name": "Fremad Amager",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/16/4016.png",
            "id": 4016,
            "liga": "Danmark"
        },
        {
            "name": "HB Køge",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/9/6953.png",
            "id": 6953,
            "liga": "Danmark"
        },
        {
            "name": "Vejle",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/10/7466.png",
            "id": 7466,
            "liga": "Danmark"
        },
        {
            "name": "FC Helsingør",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/27/8635.png",
            "id": 8635,
            "liga": "Danmark"
        },
        {
            "name": "Hvidovre",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/17/8657.png",
            "id": 8657,
            "liga": "Danmark"
        },
        {
            "name": "Hillerød",
            "image": "https://cdn.sportmonks.com/images/soccer/team_placeholder.png",
            "id": 22608,
            "liga": "Danmark"
        },
        {
            "name": "Schalke 04",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/3/67.png",
            "id": 67,
            "liga": "Tyskland"
        },
        {
            "name": "Borussia Dortmund",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/4/68.png",
            "id": 68,
            "liga": "Tyskland"
        },
        {
            "name": "Werder Bremen",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/18/82.png",
            "id": 82,
            "liga": "Tyskland"
        },
        {
            "name": "FC Augsburg",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/26/90.png",
            "id": 90,
            "liga": "Tyskland"
        },
        {
            "name": "RB Leipzig",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/21/277.png",
            "id": 277,
            "liga": "Tyskland"
        },
        {
            "name": "Eintracht Frankfurt",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/14/366.png",
            "id": 366,
            "liga": "Tyskland"
        },
        {
            "name": "FC Bayern München",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/23/503.png",
            "id": 503,
            "liga": "Tyskland"
        },
        {
            "name": "VfL Wolfsburg",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/30/510.png",
            "id": 510,
            "liga": "Tyskland"
        },
        {
            "name": "Borussia Mönchengladbach",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/11/683.png",
            "id": 683,
            "liga": "Tyskland"
        },
        {
            "name": "FSV Mainz 05",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/26/794.png",
            "id": 794,
            "liga": "Tyskland"
        },
        {
            "name": "VfL Bochum 1848",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/7/999.png",
            "id": 999,
            "liga": "Tyskland"
        },
        {
            "name": "FC Union Berlin",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/23/1079.png",
            "id": 1079,
            "liga": "Tyskland"
        },
        {
            "name": "TSG Hoffenheim",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/6/2726.png",
            "id": 2726,
            "liga": "Tyskland"
        },
        {
            "name": "Hertha BSC",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/21/3317.png",
            "id": 3317,
            "liga": "Tyskland"
        },
        {
            "name": "VfB Stuttgart",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/23/3319.png",
            "id": 3319,
            "liga": "Tyskland"
        },
        {
            "name": "FC Köln",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/24/3320.png",
            "id": 3320,
            "liga": "Tyskland"
        },
        {
            "name": "Bayer 04 Leverkusen",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/25/3321.png",
            "id": 3321,
            "liga": "Tyskland"
        },
        {
            "name": "SC Freiburg",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/23/3543.png",
            "id": 3543,
            "liga": "Tyskland"
        },
        {
            "name": "Olympique Marseille",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/12/44.png",
            "id": 44,
            "liga": "Frankrig"
        },
        {
            "name": "Nantes",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/27/59.png",
            "id": 59,
            "liga": "Frankrig"
        },
        {
            "name": "Olympique Lyonnais",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/15/79.png",
            "id": 79,
            "liga": "Frankrig"
        },
        {
            "name": "Brest",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/10/266.png",
            "id": 266,
            "liga": "Frankrig"
        },
        {
            "name": "Lens",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/15/271.png",
            "id": 271,
            "liga": "Frankrig"
        },
        {
            "name": "Toulouse",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/1/289.png",
            "id": 289,
            "liga": "Frankrig"
        },
        {
            "name": "Nice",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/2/450.png",
            "id": 450,
            "liga": "Frankrig"
        },
        {
            "name": "Ajaccio",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/12/524.png",
            "id": 524,
            "liga": "Frankrig"
        },
        {
            "name": "Montpellier",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/5/581.png",
            "id": 581,
            "liga": "Frankrig"
        },
        {
            "name": "Paris Saint Germain",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/15/591.png",
            "id": 591,
            "liga": "Frankrig"
        },
        {
            "name": "Rennes",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/22/598.png",
            "id": 598,
            "liga": "Frankrig"
        },
        {
            "name": "Strasbourg",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/14/686.png",
            "id": 686,
            "liga": "Frankrig"
        },
        {
            "name": "Lille",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/18/690.png",
            "id": 690,
            "liga": "Frankrig"
        },
        {
            "name": "Angers SCO",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/8/776.png",
            "id": 776,
            "liga": "Frankrig"
        },
        {
            "name": "Reims",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/4/1028.png",
            "id": 1028,
            "liga": "Frankrig"
        },
        {
            "name": "Auxerre",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/2/3682.png",
            "id": 3682,
            "liga": "Frankrig"
        },
        {
            "name": "Monaco",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/5/6789.png",
            "id": 6789,
            "liga": "Monaco"
        },
        {
            "name": "Clermont",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/18/6898.png",
            "id": 6898,
            "liga": "Frankrig"
        },
        {
            "name": "Troyes",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/7/7047.png",
            "id": 7047,
            "liga": "Frankrig"
        },
        {
            "name": "Lorient",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/9/9257.png",
            "id": 9257,
            "liga": "Frankrig"
        },
        {
            "name": "Sporting CP",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/26/58.png",
            "id": 58,
            "liga": "Portugal"
        },
        {
            "name": "Gil Vicente",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/12/364.png",
            "id": 364,
            "liga": "Portugal"
        },
        {
            "name": "Belenenses",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/7/423.png",
            "id": 423,
            "liga": "Portugal"
        },
        {
            "name": "Benfica",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/29/605.png",
            "id": 605,
            "liga": "Portugal"
        },
        {
            "name": "Porto",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/12/652.png",
            "id": 652,
            "liga": "Portugal"
        },
        {
            "name": "Vitória SC",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/30/830.png",
            "id": 830,
            "liga": "Portugal"
        },
        {
            "name": "Sporting Braga",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/20/884.png",
            "id": 884,
            "liga": "Portugal"
        },
        {
            "name": "Boavista",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/0/960.png",
            "id": 960,
            "liga": "Portugal"
        },
        {
            "name": "Moreirense",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/29/1085.png",
            "id": 1085,
            "liga": "Portugal"
        },
        {
            "name": "Paços de Ferreira",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/2/1122.png",
            "id": 1122,
            "liga": "Portugal"
        },
        {
            "name": "Estoril",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/14/1198.png",
            "id": 1198,
            "liga": "Portugal"
        },
        {
            "name": "Portimonense",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/26/1658.png",
            "id": 1658,
            "liga": "Portugal"
        },
        {
            "name": "Santa Clara",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/4/2628.png",
            "id": 2628,
            "liga": "Portugal"
        },
        {
            "name": "Famalicão",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/25/3161.png",
            "id": 3161,
            "liga": "Portugal"
        },
        {
            "name": "Tondela",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/9/3497.png",
            "id": 3497,
            "liga": "Portugal"
        },
        {
            "name": "Arouca",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/28/4092.png",
            "id": 4092,
            "liga": "Portugal"
        },
        {
            "name": "Marítimo",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/11/5931.png",
            "id": 5931,
            "liga": "Portugal"
        },
        {
            "name": "Vizela",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/4/8164.png",
            "id": 8164,
            "liga": "Portugal"
        },
        {
            "name": "Celta de Vigo",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/4/36.png",
            "id": 36,
            "liga": "Spanien"
        },
        {
            "name": "FC Barcelona",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/19/83.png",
            "id": 83,
            "liga": "Spanien"
        },
        {
            "name": "Granada",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/7/103.png",
            "id": 103,
            "liga": "Spanien"
        },
        {
            "name": "Getafe",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/10/106.png",
            "id": 106,
            "liga": "Spanien"
        },
        {
            "name": "Valencia",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/22/214.png",
            "id": 214,
            "liga": "Spanien"
        },
        {
            "name": "Rayo Vallecano",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/25/377.png",
            "id": 377,
            "liga": "Spanien"
        },
        {
            "name": "Osasuna",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/11/459.png",
            "id": 459,
            "liga": "Spanien"
        },
        {
            "name": "Real Betis",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/5/485.png",
            "id": 485,
            "liga": "Spanien"
        },
        {
            "name": "Espanyol",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/16/528.png",
            "id": 528,
            "liga": "Spanien"
        },
        {
            "name": "Real Sociedad",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/18/594.png",
            "id": 594,
            "liga": "Spanien"
        },
        {
            "name": "Mallorca",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/5/645.png",
            "id": 645,
            "liga": "Spanien"
        },
        {
            "name": "Sevilla",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/4/676.png",
            "id": 676,
            "liga": "Spanien"
        },
        {
            "name": "Elche",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/11/1099.png",
            "id": 1099,
            "liga": "Spanien"
        },
        {
            "name": "Deportivo Alavés",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/31/2975.png",
            "id": 2975,
            "liga": "Spanien"
        },
        {
            "name": "Levante",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/1/3457.png",
            "id": 3457,
            "liga": "Spanien"
        },
        {
            "name": "Real Madrid",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
            "id": 3468,
            "liga": "Spanien"
        },
        {
            "name": "Villarreal",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/21/3477.png",
            "id": 3477,
            "liga": "Spanien"
        },
        {
            "name": "Cádiz",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/11/6827.png",
            "id": 6827,
            "liga": "Spanien"
        },
        {
            "name": "Atlético Madrid",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/12/7980.png",
            "id": 7980,
            "liga": "Spanien"
        },
        {
            "name": "Athletic Club",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/10/13258.png",
            "id": 13258,
            "liga": "Spanien"
        },
        {
            "name": "AZ",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/29/61.png",
            "id": 61,
            "liga": "Holland"
        },
        {
            "name": "Feyenoord",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/9/73.png",
            "id": 73,
            "liga": "Holland"
        },
        {
            "name": "Vitesse",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/30/94.png",
            "id": 94,
            "liga": "Holland"
        },
        {
            "name": "NEC",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/14/494.png",
            "id": 494,
            "liga": "Holland"
        },
        {
            "name": "FC Twente",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/17/593.png",
            "id": 593,
            "liga": "Holland"
        },
        {
            "name": "Ajax",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/21/629.png",
            "id": 629,
            "liga": "Holland"
        },
        {
            "name": "Go Ahead Eagles",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/24/664.png",
            "id": 664,
            "liga": "Holland"
        },
        {
            "name": "PSV",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/10/682.png",
            "id": 682,
            "liga": "Holland"
        },
        {
            "name": "FC Utrecht",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/14/750.png",
            "id": 750,
            "liga": "Holland"
        },
        {
            "name": "RKC Waalwijk",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/14/814.png",
            "id": 814,
            "liga": "Holland"
        },
        {
            "name": "Sparta Rotterdam",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/23/919.png",
            "id": 919,
            "liga": "Holland"
        },
        {
            "name": "SC Heerenveen",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/29/1053.png",
            "id": 1053,
            "liga": "Holland"
        },
        {
            "name": "SC Cambuur",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/27/1435.png",
            "id": 1435,
            "liga": "Holland"
        },
        {
            "name": "Fortuna Sittard",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/19/1459.png",
            "id": 1459,
            "liga": "Holland"
        },
        {
            "name": "Excelsior",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/20/1652.png",
            "id": 1652,
            "liga": "Holland"
        },
        {
            "name": "FC Groningen",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/9/2345.png",
            "id": 2345,
            "liga": "Holland"
        },
        {
            "name": "FC Volendam",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/28/2396.png",
            "id": 2396,
            "liga": "Holland"
        },
        {
            "name": "FC Emmen",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/11/2475.png",
            "id": 2475,
            "liga": "Holland"
        },
        {
            "name": "Malmö FF",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/2/354.png",
            "id": 354,
            "liga": "Sverige"
        },
        {
            "name": "Mjällby",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/27/411.png",
            "id": 411,
            "liga": "Sverige"
        },
        {
            "name": "Kalmar",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/16/432.png",
            "id": 432,
            "liga": "Sverige"
        },
        {
            "name": "Djurgården",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/27/443.png",
            "id": 443,
            "liga": "Sverige"
        },
        {
            "name": "IFK Göteborg",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/20/532.png",
            "id": 532,
            "liga": "Sverige"
        },
        {
            "name": "Helsingborg",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/22/534.png",
            "id": 534,
            "liga": "Sverige"
        },
        {
            "name": "Elfsborg",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/10/1226.png",
            "id": 1226,
            "liga": "Sverige"
        },
        {
            "name": "Hammarby",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/17/2353.png",
            "id": 2353,
            "liga": "Sverige"
        },
        {
            "name": "Häcken",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/7/2535.png",
            "id": 2535,
            "liga": "Sverige"
        },
        {
            "name": "Sirius",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/22/2678.png",
            "id": 2678,
            "liga": "Sverige"
        },
        {
            "name": "Degerfors",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/1/2753.png",
            "id": 2753,
            "liga": "Sverige"
        },
        {
            "name": "AIK",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/9/2825.png",
            "id": 2825,
            "liga": "Sverige"
        },
        {
            "name": "Norrköping",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/19/3603.png",
            "id": 3603,
            "liga": "Sverige"
        },
        {
            "name": "Värnamo",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/15/6607.png",
            "id": 6607,
            "liga": "Sverige"
        },
        {
            "name": "GIF Sundsvall",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/27/9179.png",
            "id": 9179,
            "liga": "Sverige"
        },
        {
            "name": "Varberg BoIS",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/11/13451.png",
            "id": 13451,
            "liga": "Sverige"
        },
        {
            "name": "Roma",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/5/37.png",
            "id": 37,
            "liga": "Italien"
        },
        {
            "name": "Lazio",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/11/43.png",
            "id": 43,
            "liga": "Italien"
        },
        {
            "name": "Genoa",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/6/102.png",
            "id": 102,
            "liga": "Italien"
        },
        {
            "name": "Fiorentina",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/13/109.png",
            "id": 109,
            "liga": "Italien"
        },
        {
            "name": "Milan",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/17/113.png",
            "id": 113,
            "liga": "Italien"
        },
        {
            "name": "Venezia",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/11/267.png",
            "id": 267,
            "liga": "Italien"
        },
        {
            "name": "Spezia",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/25/345.png",
            "id": 345,
            "liga": "Italien"
        },
        {
            "name": "Udinese",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/26/346.png",
            "id": 346,
            "liga": "Italien"
        },
        {
            "name": "Empoli",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/13/397.png",
            "id": 397,
            "liga": "Italien"
        },
        {
            "name": "Sampdoria",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/10/522.png",
            "id": 522,
            "liga": "Italien"
        },
        {
            "name": "Cagliari",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/9/585.png",
            "id": 585,
            "liga": "Italien"
        },
        {
            "name": "Napoli",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/21/597.png",
            "id": 597,
            "liga": "Italien"
        },
        {
            "name": "Torino",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/5/613.png",
            "id": 613,
            "liga": "Italien"
        },
        {
            "name": "Juventus",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/17/625.png",
            "id": 625,
            "liga": "Italien"
        },
        {
            "name": "Atalanta",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/4/708.png",
            "id": 708,
            "liga": "Italien"
        },
        {
            "name": "Hellas Verona",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/3/1123.png",
            "id": 1123,
            "liga": "Italien"
        },
        {
            "name": "Sassuolo",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/26/2714.png",
            "id": 2714,
            "liga": "Italien"
        },
        {
            "name": "Inter",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/18/2930.png",
            "id": 2930,
            "liga": "Italien"
        },
        {
            "name": "Salernitana",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/31/7743.png",
            "id": 7743,
            "liga": "Italien"
        },
        {
            "name": "Bologna",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/1/8513.png",
            "id": 8513,
            "liga": "Italien"
        },
        {
            "name": "West Ham United",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/1/1.png",
            "id": 1,
            "liga": "England"
        },
        {
            "name": "Fulham",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/11/11.png",
            "id": 11,
            "liga": "England"
        },
        {
            "name": "Everton",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/13/13.png",
            "id": 13,
            "liga": "England"
        },
        {
            "name": "Aston Villa",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/15/15.png",
            "id": 15,
            "liga": "England"
        },
        {
            "name": "Newcastle United",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/20/20.png",
            "id": 20,
            "liga": "England"
        },
        {
            "name": "Wolverhampton Wanderers",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/29/29.png",
            "id": 29,
            "liga": "England"
        },
        {
            "name": "Leicester City",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/10/42.png",
            "id": 42,
            "liga": "England"
        },
        {
            "name": "Crystal Palace",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/19/51.png",
            "id": 51,
            "liga": "England"
        },
        {
            "name": "AFC Bournemouth",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/20/52.png",
            "id": 52,
            "liga": "England"
        },
        {
            "name": "Nottingham Forest",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/31/63.png",
            "id": 63,
            "liga": "England"
        },
        {
            "name": "Southampton",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/1/65.png",
            "id": 65,
            "liga": "England"
        },
        {
            "name": "Leeds United",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/7/71.png",
            "id": 71,
            "liga": "England"
        },
        {
            "name": "Brighton & Hove Albion",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/14/78.png",
            "id": 78,
            "liga": "England"
        },
        {
            "name": "Brentford",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/12/236.png",
            "id": 236,
            "liga": "England"
        },
        {
            "name": "Blackburn Rovers",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/2/2.png",
            "id": 2,
            "liga": "England"
        },
        {
            "name": "Middlesbrough",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/7/7.png",
            "id": 7,
            "liga": "England"
        },
        {
            "name": "West Bromwich Albion",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/10/10.png",
            "id": 10,
            "liga": "England"
        },
        {
            "name": "Birmingham City",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/12/12.png",
            "id": 12,
            "liga": "England"
        },
        {
            "name": "Sheffield United",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/21/21.png",
            "id": 21,
            "liga": "England"
        },
        {
            "name": "Hull City",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/22/22.png",
            "id": 22,
            "liga": "England"
        },
        {
            "name": "Reading",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/23/23.png",
            "id": 23,
            "liga": "England"
        },
        {
            "name": "Derby County",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/24/24.png",
            "id": 24,
            "liga": "England"
        },
        {
            "name": "Stoke City",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/26/26.png",
            "id": 26,
            "liga": "England"
        },
        {
            "name": "Blackpool",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/28/28.png",
            "id": 28,
            "liga": "England"
        },
        {
            "name": "Swansea City",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/30/30.png",
            "id": 30,
            "liga": "Wales"
        },
        {
            "name": "Queens Park Rangers",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/15/47.png",
            "id": 47,
            "liga": "England"
        },
        {
            "name": "Barnsley",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/22/54.png",
            "id": 54,
            "liga": "England"
        },
        {
            "name": "Millwall",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/0/64.png",
            "id": 64,
            "liga": "England"
        },
        {
            "name": "Cardiff City",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/5/69.png",
            "id": 69,
            "liga": "Wales"
        },
        {
            "name": "Preston North End",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/3/99.png",
            "id": 99,
            "liga": "England"
        },
        {
            "name": "Luton Town",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/19/115.png",
            "id": 115,
            "liga": "England"
        },
        {
            "name": "Coventry City",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/21/117.png",
            "id": 117,
            "liga": "England"
        },
        {
            "name": "Bristol City",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/26/122.png",
            "id": 122,
            "liga": "England"
        },
        {
            "name": "Huddersfield Town",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/27/251.png",
            "id": 251,
            "liga": "England"
        },
        {
            "name": "Peterborough United",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/30/254.png",
            "id": 254,
            "liga": "England"
        },
        {
            "name": "Haugesund",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/14/270.png",
            "id": 270,
            "liga": "Norge"
        },
        {
            "name": "Molde",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/2/290.png",
            "id": 290,
            "liga": "Norge"
        },
        {
            "name": "Strømsgodset",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/25/313.png",
            "id": 313,
            "liga": "Norge"
        },
        {
            "name": "Viking",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/1/321.png",
            "id": 321,
            "liga": "Norge"
        },
        {
            "name": "Aalesund",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/9/393.png",
            "id": 393,
            "liga": "Norge"
        },
        {
            "name": "Vålerenga",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/22/502.png",
            "id": 502,
            "liga": "Norge"
        },
        {
            "name": "Sandefjord",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/9/617.png",
            "id": 617,
            "liga": "Norge"
        },
        {
            "name": "Kristiansund",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/5/869.png",
            "id": 869,
            "liga": "Norge"
        },
        {
            "name": "Odd",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/2/930.png",
            "id": 930,
            "liga": "Norge"
        },
        {
            "name": "Rosenborg",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/23/1335.png",
            "id": 1335,
            "liga": "Norge"
        },
        {
            "name": "Bodø / Glimt",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/4/1668.png",
            "id": 1668,
            "liga": "Norge"
        },
        {
            "name": "Jerv",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/5/2469.png",
            "id": 2469,
            "liga": "Norge"
        },
        {
            "name": "Lillestrøm",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/14/2510.png",
            "id": 2510,
            "liga": "Norge"
        },
        {
            "name": "Sarpsborg 08",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/9/2601.png",
            "id": 2601,
            "liga": "Norge"
        },
        {
            "name": "Tromsø",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/10/7242.png",
            "id": 7242,
            "liga": "Norge"
        },
        {
            "name": "HamKam",
            "image": "https://cdn.sportmonks.com/images/soccer/teams/21/8661.png",
            "id": 8661,
            "liga": "Norge"
        }
    ]);

    const [ligaer, setLigaer] = useState([
        {
            "name": "Champions League",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/2.png",
            "id": 19699,
            "liga": "Europa"
        },
        {
            "name": "Europa League",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/5.png",
            "id": 18629,
            "liga": "Europa"
        },
        {
            "name": "Premier League",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/8/8.png",
            "id": 19734,
            "liga": "England"
        },
        {
            "name": "Championship",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/9/9.png",
            "id": 18432,
            "liga": "England"
        },
        {
            "name": "FA Cup",
            "image": "https://cdn.sportmonks.com/images//soccer/leagues/24/24.png",
            "id": 18546,
            "liga": "England"
        },
        {
            "name": "Eredivisie",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/72.png",
            "id": 19726,
            "liga": "Holland"
        },
        {
            "name": "Bundesliga",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/82.png",
            "id": 19744,
            "liga": "Tyskland"
        },
        {
            "name": "Admiral Bundesliga",
            "image": "https://cdn.sportmonks.com/images//soccer/leagues/21/181.png",
            "id": 18421,
            "liga": "Austria"
        },
        {
            "name": "Pro League",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/16/208.png",
            "id": 18348,
            "liga": "Belgium"
        },
        {
            "name": "1. HNL",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/20/244.png",
            "id": 19709,
            "liga": "Croatia"
        },
        {
            "name": "Superliga",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/271.png",
            "id": 19686,
            "liga": "Danmark"
        },
        {
            "name": "First Division",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/18/274.png",
            "id": 19706,
            "liga": "Danmark"
        },
        {
            "name": "Ligue 1",
            "image": "https://cdn.sportmonks.com/images//soccer/leagues/13/301.png",
            "id": 19745,
            "liga": "Frankrig"
        },
        {
            "name": "Serie A",
            "image": "https://cdn.sportmonks.com/images//soccer/leagues/0/384.png",
            "id": 18576,
            "liga": "Italien"
        },
        {
            "name": "Coppa Italia",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/6/390.png",
            "id": 18608,
            "liga": "Italien"
        },
        {
            "name": "Eliteserien",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/28/444.png",
            "id": 19369,
            "liga": "Norge"
        },
        {
            "name": "Ekstraklasa",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/5/453.png",
            "id": 19692,
            "liga": "Poland"
        },
        {
            "name": "Primeira Liga",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/14/462.png",
            "id": 18529,
            "liga": "Portugal"
        },
        {
            "name": "Premier League",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/6/486.png",
            "id": 18375,
            "liga": "Russia"
        },
        {
            "name": "Premiership",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/501.png",
            "id": 19735,
            "liga": "Scotland"
        },
        {
            "name": "La Liga",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/564.png",
            "id": 18462,
            "liga": "Spanien"
        },
        {
            "name": "Copa Del Rey",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/26/570.png",
            "id": 19089,
            "liga": "Spanien"
        },
        {
            "name": "Allsvenskan",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/29/573.png",
            "id": 19376,
            "liga": "Sverige"
        },
        {
            "name": "Super League",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/15/591.png",
            "id": 19748,
            "liga": "Switzerland"
        },
        {
            "name": "Super Lig",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/24/600.png",
            "id": 18568,
            "liga": "Turkey"
        },
        {
            "name": "Premier League",
            "image": "https://cdn.sportmonks.com/images/soccer/leagues/1/609.png",
            "id": 18379,
            "liga": "Ukraine"
        },
        {
            "name": "UEFA Europa League Play-offs",
            "image": "https://cdn.sportmonks.com/images//soccer/leagues/27/1371.png",
            "id": 15998,
            "liga": "Belgium"
        },
        {
            "name": "UEFA Nations League",
            "image": "https://cdn.sportmonks.com/images//soccer/leagues/2/1538.png",
            "id": 19273,
            "liga": "Europa"
        },
        {
            "name": "Europa Conference League",
            "image": "https://cdn.sportmonks.com/images//soccer/leagues/14/2286.png",
            "id": 19724,
            "liga": "Europa"
        }
    ]);

    function addFavorite(id, name, image, liga) {
        if (favorites.findIndex(obj => obj.id === id) >= 0) {
            var duppel = favorites;
            duppel.splice((favorites.findIndex(obj => obj.id === id)), 1);
            setFavorites(duppel);

            document.getElementById("klub-" + id).classList.remove("setup-checkbox-active");
            document.getElementById("icon-" + id).classList.remove("display");
        } else {
            setFavorites([...favorites, {
                "id": id,
                "name": name,
                "image": image,
                "liga": liga
            }]);
            document.getElementById("klub-" + id).classList.add("setup-checkbox-active");
            document.getElementById("icon-" + id).classList.add("display");
        }
    }

    function next(index) {
        if (index === "ligaer") {
            document.getElementById("hold").classList.remove("display");
            document.getElementById("ligaer").classList.add("display");
        } else if (index === "done") {
            document.getElementById("loadingScreen").classList.remove("display-not");
            if (favorites.length > 0) {
                const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/favorit";

                const requestConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
    
                const requestBody = {
                    "data": favorites,
                    "email": localStorage.getItem("email")
                }
                axios.post(signupURL, requestBody, requestConfig).then(response => {
                    console.log("AWS - Favoritter:", response);
                    window.open("/stage", "_SELF");
                }).catch(error => {
                    console.log(error);
                })
            } else {
                window.open("/stage", "_SELF");
            }
        } else if (index === "hold") {
            document.getElementById("gruppespil").classList.remove("display");
            document.getElementById("hold").classList.add("display");
        }
    }

    function pullGruppespil(id) {
        document.getElementById("pull-" + id).classList.toggle("display");
        document.getElementById("gruppespil-" + id).classList.toggle("gruppespil-active");
    }

    function tilmeld(id) {
        var activeIndex = gruppespil.findIndex(obj => obj.id === id);
        var activeGame = gruppespil[activeIndex];
        if (activeIndex >= 0) {
            console.log("INNDEE")
            var yourIndex = activeGame["players"].findIndex(obj => obj.player === localStorage.getItem("email"));

            var varighedDate = new Date(gruppespil[activeIndex].varighed).getTime();
            var nowDate = new Date().getTime();
    
            if ((yourIndex === -1 && varighedDate > nowDate) && localStorage.getItem("auth")) {
                console.log(activeGame)
                const tilmeldUrl = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppesession";
    
                const tilmeldConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
    
                var moneys = parseInt(activeGame["start_amount"]);
                var medlemsskab;
                var userEmail;
                var username;
    
                const authToken = JSON.parse(localStorage.getItem("auth")).auth_token;
            
                var decodedToken = jwtDecode(authToken);
                var todayTime = new Date().getTime();
                var todayMS = todayTime/1000;
                
                if (decodedToken["exp"] > todayMS) {
                    medlemsskab = decodedToken["rolle"];
                    userEmail = decodedToken["email"];
                    username = decodedToken["username"];
                } else {
                    medlemsskab = "none";
                    userEmail = "Ukendt";
                    username = "Ukendt";
                }
    
                const tilmeldBody = {
                    "tilmeldId": activeGame["id"],
                    "updateItValue": {
                        "player": userEmail,
                        "username": username,
                        "info": {
                            "money": moneys,
                            "notifikationer": [],
                            "medlemsskab": medlemsskab
                        }, 
                        "odds": []
                    }
                }
    
                axios.patch(tilmeldUrl, tilmeldBody, tilmeldConfig).then(response => {
                    console.log("AWS - Gruppespil:", response);
                    next("hold")
                    localStorage.setItem("activeGame", activeGame["id"]);
                    localStorage.setItem("playerIndex", response.data.Item.Attributes.players.findIndex(obj => obj.player === localStorage.getItem("email")));
                }).catch(error => {
                    console.log(error);
                })
            } else {
                if (yourIndex !== -1) {
                    setNotiMessage("error", "Deltager allerede", "Det ser ud til, at du allerede deltager i dette gruppespil.");
                } else if (varighedDate < nowDate) {
                    setNotiMessage("error", "Gruppespil slut", "Gruppespil er desværre allerede færdiggjort");
                } else if (!localStorage.getItem("auth")) {
                    window.open("/signup", "_SELF");
                }
            }
        }
    }

    const [messageType, setMessageType] = useState("error-con-error");
    function setNotiMessage(type, heading, message) {
        window.scrollTo(0, 0)
        if (type === "error") {
            setMessageType("error-con-error");
            document.getElementById("errorIcon").classList.add("display");
        } else if (type === "success") {
            document.getElementById("errorIcon").classList.remove("display");
            setMessageType("error-con-success");
        }
        document.getElementById("errorCon").classList.add("display");
        document.getElementById("errorConH").innerHTML = heading;
        document.getElementById("errorConP").innerHTML = message;
    }

    return (
        <>
        <Head>
            <title>Hurtig opsætning - Tipsspillet</title>
            <meta name="robots" content="noindex" />
        </Head>
        <StageHeader />
        <div className="main-loader display-not" id="loadingScreen"><div className="main-site-loader"></div></div>
            <div className="setup-container">
                <div className={messageType} id="errorCon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="triangle" viewBox="0 0 16 16" id="errorIcon">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div className="error-text">
                        <p className="error-container-h1" id="errorConH">Ingen væddemål</p>
                        <p className="error-container-p" id="errorConP">Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.</p>
                    </div>
                </div>
                <div className="setup-text">
                    <div className="setup-top">
                        <div className="setup-divider"></div>
                        <h2 className="setup-h2">Hurtig opsætning</h2>
                    </div>
                </div>
                <div className="setup-wrapper display" id="gruppespil">
                    <h1 className="setup-h1">Vælg dit første gruppespil</h1>
                    <div className="setup-element">
                        <div className="setup-search">
                            <input type="text" placeholder="Søg i gruppespil" className="setup-input" onChange={event => setGruppespilSearchStr(event.target.value)} />
                        </div>
                        <ul className="setup-hits" style={{maxHeight: "600px"}}>
                            <div className="match-loader display" id="stage-loader1"></div>
                            {gruppespilsearch.map((item) => {
                                return (
                                    <li key={item.id} className="setup-hit" id={"gruppespil-" + item.id} style={{flexDirection: "column", alignItems: "flex-start", paddingLeft: "20px"}} onClick={() => {pullGruppespil(item.id)}}>
                                        <div className="setup-hit-wrapper">
                                            <div className="setup-inline" id="setup-1">
                                                <p className="setup-p-fat">{item.name}</p>
                                                {item.synlighed === "privat" && <svg xmlns="http://www.w3.org/2000/svg" className="setup-gruppespil-icon" viewBox="0 0 16 16">
                                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                                </svg>}
                                                {item.synlighed === "dyst" && <svg xmlns="http://www.w3.org/2000/svg" className="setup-gruppespil-icon" style={{fill: "var(--primary)"}} viewBox="0 0 16 16">
                                                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
                                                </svg>}
                                            </div>
                                            <div className="setup-hit-wrapper" style={{justifyContent: "flex-end"}}>
                                                <div className="setup-inline" id="setup-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="setup-gruppespil-icon" viewBox="0 0 16 16">
                                                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                                    </svg>
                                                    <p className="setup-p">{item.players.length}</p>
                                                </div>
                                                <div className="setup-inline" id="setup-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="setup-gruppespil-icon" viewBox="0 0 16 16">
                                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                                    </svg>
                                                    <p className="setup-p">{item.admin}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="setup-hit-pull" id={"pull-" + item.id}>
                                            <div className="pull-stats">
                                                <div className="pull-stat">
                                                    <p className="pull-h1">{item.players.length}</p>
                                                    <div className="pull-stat-bottom">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="pull-icon" viewBox="0 0 16 16">
                                                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                                        </svg>
                                                        <p className="pull-stat-p">Tilmeldte</p>
                                                    </div>
                                                </div>
                                                <div className="pull-stat">
                                                    <p className="pull-h1">{item.admin}</p>
                                                    <div className="pull-stat-bottom">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="pull-icon" viewBox="0 0 16 16">
                                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                                        </svg>
                                                        <p className="pull-stat-p">Administrator</p>
                                                    </div>
                                                </div>
                                                <div className="pull-stat">
                                                    <p className="pull-h1">{item.varighed}</p>
                                                    <div className="pull-stat-bottom">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="pull-icon" viewBox="0 0 16 16">
                                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                                        </svg>
                                                        <p className="pull-stat-p">Slutdato</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="setup-hit-p" style={{paddingBottom: "5px"}}>Tilmeldte</p>
                                            <ul className="pull-tilmeldte">
                                                {item.players.map((player) => {
                                                    return (
                                                        <li key={player.player} className="tilmeldte-element">
                                                            <div className="tilmeldte-pb"></div>
                                                            <div className="tilmeldte-wrapper">
                                                                <p className="setup-p">{player.username}</p>
                                                                <p className="setup-pp">{player.player}</p>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                            <div className="pull-cta">
                                                <button className="setup-btn" onClick={() => {tilmeld(item.id)}}>Tilmeld</button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="setup-cta">
                        <Link href="/stage"><a className="nav-btn-outline">Forlad opsætning</a></Link>
                        <button className="setup-btn" id="tilmeldNext" onClick={() => {next("hold")}}>Spring gruppespil over</button>
                    </div>
                </div>
                <div className="setup-wrapper" id="hold">
                    <h1 className="setup-h1">Vælg dine favorithold</h1>
                    <div className="setup-element">
                        <div className="setup-search">
                            <input type="text" placeholder="Søg" className="setup-input" onChange={event => setKlubSearchStr(event.target.value)} />
                        </div>
                        <ul className="setup-hits">
                            {klubsearch.map((item) => {
                                return (
                                    <li key={item.name + item.image} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.image, item.liga)}}>
                                        <button className="setup-checkbox" id={"klub-" + item.id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" id={"icon-" + item.id} className="setup-icon" viewBox="0 0 16 16">
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                            </svg>
                                        </button>
                                        <div className="setup-hit-wrapper">
                                            <Image width="25px" height="25px" src={item.image} className="setup-img" />
                                            <p className="setup-p">{item.name}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="setup-cta">
                        <Link href="/stage"><a className="nav-btn-outline">Forlad opsætning</a></Link>
                        <button className="setup-btn" onClick={() => {next("ligaer")}}>Fortsæt</button>
                    </div>
                </div>
                <div className="setup-wrapper" id="ligaer">
                    <h1 className="setup-h1">Vælg dine favorit ligaer</h1>
                    <div className="setup-element">
                        <div className="setup-search">
                            <input type="text" placeholder="Søg" className="setup-input" onChange={event => setLigaSearchStr(event.target.value)} />
                        </div>
                        <ul className="setup-hits">
                            {ligasearch.map((item) => {
                                return (
                                    <li key={item.name + item.image} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.image, item.liga)}}>
                                        <button className="setup-checkbox" id={"klub-" + item.id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" id={"icon-" + item.id} className="setup-icon" viewBox="0 0 16 16">
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                            </svg>
                                        </button>
                                        <div className="setup-hit-wrapper">
                                            <Image width="25px" height="25px" src={item.image} className="setup-img" />
                                            <p className="setup-p">{item.name}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="setup-cta">
                        <button className="setup-btn" onClick={() => {next("done")}}>Afslut opsætning</button>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Setup;