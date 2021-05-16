import {useEffect} from 'react' ;

function Greet(props) {
    const message = 'Hello, ' + props.name ;

    useEffect (() => {
        console.log(message) ;
    })

    return <h1>{message}</h1> ;
}

export default Greet ;