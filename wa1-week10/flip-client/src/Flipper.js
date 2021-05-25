import { useState, useEffect } from 'react' ;
function Flipper(props) {

    const [text, setText] = useState('') ;
    const [flipped, setFlipped] = useState('') ;
    //stato per server 'lento'
    const [loading, setLoading] = useState(false) ;

    //aggiungiamo uno use effect che dipende dallo state text
    useEffect(() =>{
        async function loadFlipped(){
            const response = await fetch('/api/flip?text='+text) ;
            const flippedText = await response.json() ;
            setFlipped(flippedText.text) ;
            //per server lento
            setLoading(false) ;
        } ;
        //per server 'lento'
        setLoading(true) ;
        loadFlipped() ;
    }, [text]) ;
    return <div>
        Text: <input type='text'value={text} onChange={(ev) => setText(ev.target.value)}></input><br/>
        Flipped: {flipped} {loading && '...waiting'}
        </div>
}

export default Flipper ;