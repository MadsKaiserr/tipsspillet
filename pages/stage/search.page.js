import { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { getKupon, getString } from "../services/algo.js";
import StageHeader from '../layout/stageheader';
import Height from '../components/height';
import { useRouter } from 'next/router';
import { getSearch } from '../services/search';

function Search () {
    const router = useRouter()

    // eslint-disable-next-line
    const [items, setItems] = useState(getSearch());
    const [search, setSearch] = useState([]);
    const [searchStr, setSearchStr] = useState("");

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

    useEffect(() => {
        if (document.getElementById("search-input")) {
            document.getElementById("search-input").focus();
        }
    }, [])

    useEffect(() => {
        var array = items;
        //Arsenal
        array.splice(items.findIndex(obj => obj.id === 19), 1);
        array.unshift({
            "name": "Arsenal",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/19/19.png",
            "type": "liga",
            "url": "/stage/league?id=19734",
            "land": "England",
            "season_id": 19734,
            "id": 19
        })

        //Chelsea
        array.splice(items.findIndex(obj => obj.id === 18), 1);
        array.unshift({
            "name": "Chelsea",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/18/18.png",
            "type": "liga",
            "url": "/stage/league?id=19734",
            "land": "England",
            "season_id": 19734,
            "id": 18
        })

        //Liverpool
        array.splice(items.findIndex(obj => obj.id === 8), 1);
        array.unshift({
            "name": "Liverpool",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
            "type": "liga",
            "url": "/stage/league?id=19734",
            "land": "England",
            "season_id": 19734,
            "id": 8
        })

        //Brøndby
        array.splice(items.findIndex(obj => obj.id === 293), 1);
        array.unshift({
            "name": "Brøndby",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/5/293.png",
            "type": "liga",
            "url": "/stage/league?id=19686",
            "land": "Denmark",
            "season_id": 19686,
            "id": 293
        })

        //FCK
        array.splice(items.findIndex(obj => obj.id === 85), 1);
        array.unshift({
            "name": "København",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/21/85.png",
            "type": "liga",
            "url": "/stage/league?id=19686",
            "land": "Denmark",
            "season_id": 19686,
            "id": 85
        })

        //United
        array.splice(items.findIndex(obj => obj.id === 14), 1);
        array.unshift({
            "name": "Manchester United",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
            "type": "liga",
            "url": "/stage/league?id=19734",
            "land": "England",
            "season_id": 19734,
            "id": 14
        })

        //Danmark
        array.splice(items.findIndex(obj => obj.id === 18583), 1);
        array.unshift({
            "name": "Denmark",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/23/18583.png",
            "type": "landshold",
            "url": "/stage/team?team=19273",
            "land": "Denmark",
            "season_id": 19273,
            "id": 18583
        })
    }, [])

    return (
        <>
            <Head>
                <title>Søg i hold og ligaer - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <Height />
            <div className="nav-hits">
                <div className="search-el">
                    <input type="text" placeholder="Søg i klubber og ligaer" id="search-input" className="search-input" onChange={event => setSearchStr(event.target.value)} />
                </div>
                <div className="search-hits">
                    <ul id="alleG" style={{width: "100%"}}>
                        {search.map((item) => {
                            return (
                                <li key={item.name + item.url} className="display" style={{width: "100%"}}>
                                    <div className="hit-elem" style={{width: "100%"}} onClick={() => router.push(item.url)}>
                                        <div className="hit-con">
                                            <Image width="27px" height="27px" alt="." src={item.logo_path} className="hit-img" />
                                        </div>
                                        <div className="hit-info">
                                            <p className="hit-h1">{item.name}</p>
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
        </>
    )
}

export async function getServerSideProps({ res, req }) {
    const sendRedirectLocation = (location) => {
        res.writeHead(302, {
            Location: location,
        });
        res.end();
        return { props: {} };
    };
    if (!req.cookies.auth) {
        sendRedirectLocation('/signup')
    }
    return {
        props: { },
    }
}
 
export default Search;