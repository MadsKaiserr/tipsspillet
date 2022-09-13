import * as React from 'react';
import Link from 'next/link'
 
function SpilMed () {

    return (
        <>
            <div className="wrap-container">
                <p className="wrap-h2">Spil med virtuelle penge</p>
                <p className="wrap-h1 red-gradient">Spil med gratis</p>
                <h2 className="main-component-h3" style={{opacity: "0.8", fontSize: "18px", maxWidth: "500px", paddingTop: "10px"}}>Opret en gratis konto, og tilmeld dig et gruppespil, og begyndt at bette med virtuelle penge, og nå til tops på ranglisten.</h2>
                <Link href="/signup"><a className="faq-btn">Kom igang</a></Link>
            </div>
        </>
    )
}
 
export default SpilMed;