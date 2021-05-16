import { useEffect, useState } from 'react';
import './App.css';
import Greet from './Greet' ;
import Count from './Count' ;
import QuickGate from './QuickGate' ;

function App() {
  const [num, setNum] = useState(3) ;
  return (
    <div className="App">
      <Greet name = 'World!'></Greet>

      <Count num={num}/>
      <button onClick={()=>setNum(n => n+1)}>+</button>
      <hr/>
      <QuickGate/>
    </div>
  );
}

export default App;
