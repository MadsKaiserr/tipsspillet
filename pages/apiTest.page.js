import * as React from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head'
import { getSearch } from './services/search';
 
function API () {

    const [preArray, setPreArray] = useState(getSearch())
    const [test, setTest] = useState(false);

    useEffect(() => {
      var array = preArray;
      for (var q in array) {
        if (array.findIndex(obj => obj.name === array[q].name) !== array.map(el => el.name).lastIndexOf(array[q].name)) {
          array.splice(array.findIndex(obj => obj.name === array[q].name), 1)
        }
      }
      setPreArray(array);
    }, [])

    return (
        <>
            <Head>
                <title>API Test | Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <button onClick={() => setTest(true)}>A</button>
            <pre style={{height: "100%", width: "100%", minHeight: "500px"}}>{JSON.stringify(preArray, null, 2)}</pre>
        </>
    )
}
 
export default API;