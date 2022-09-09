import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Gruppesession from '../components/gruppesession';
 
function StageGruppesession () {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
        <Head>
            <title>Gruppespil - Tipsspillet</title>
            <meta name="robots" content="noindex" />
        </Head>
            <Gruppesession />
        </>
    )
}
 
export default StageGruppesession;