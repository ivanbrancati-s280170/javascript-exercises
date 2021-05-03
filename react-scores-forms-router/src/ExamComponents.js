import { Col, Table } from 'react-bootstrap' ;
import { iconDelete, iconEdit } from './icons' ;
import { useState } from 'react' ;
import dayjs from 'dayjs' ;
import {Switch, Route, Link, Redirect} from 'react-router-dom'


function Title(props){
    return (<Col>
            <h1>Your Exams</h1>
            </Col>)
} ;

function ExamTable(props){

    const [exams, setExams] = useState(props.exams) ;
    
    //examCodes è la lista degli esami già superati
    //(utile per il filtro del form)
    const examCodes = exams.map( exam=> exam.coursecode ) ;

    //questa funzione deve essere definita dove definisco lo state
    //e poi la propago come prop dove mi serve(in questo caso ExamControls)
    const deleteExam = (code) => {
        setExams( oldExams => oldExams.filter( exam => exam.coursecode !== code )) ;
    } ;

    const addExam = (newExam) => {
        //non possiamo usare la push perché non ritorna un array ma il umerodi elementi
        //ed anche perché exams è const
        //(inoltre dobbiamo ritornare un nuovo array)
        setExams( oldExams => [...oldExams, newExam]) ;
    } ;

    return (<Switch>
            <Route path='/' exact>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>Exam</th>
                        <th>Score</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exams.map((exam) => <ExamRow key={exam.coursecode} exam={exam} 
                    examName={props.courses.filter((c)=>c.coursecode === exam.coursecode)[0].name}
                    deleteExam={deleteExam}/>)} 
                    </tbody>
                </Table>
                <Link to='/add'><button>Add</button></Link>
                </Route>
                <Route path='/add'>
                <ExamForm courses={props.courses.filter(course => !examCodes.includes(course.coursecode))} addExam={addExam}/>
                </Route>
                <Route path='/update'></Route>
            </Switch>)
} ;

function ExamRow(props){
    return (<tr>
                <ExamInfo {...props} />
                <ExamControls exam={props.exam} deleteExam={props.deleteExam}/>    
            </tr>)
} ;

function ExamInfo(props){
    return (<>
            <td>{props.examName}</td>
            <td>{props.exam.score}</td>
            <td>{props.exam.date.format('DD MMM YYYY')}</td>
            </>) ;
} ;

function ExamControls(props){
    return <td>{iconEdit} <span onClick={()=>props.deleteExam(props.exam.coursecode)}>{iconDelete}</span></td> ;
} ;

function ExamForm(props){
    const [course, setCourse] = useState('') ; // props.courses[0].coursecode 
    const [score, setScore] = useState('') ;
    const [date, setDate] = useState('') ;
    const [errorMessage, setErrorMessage] = useState() ;

    //stato usato come flag per reindirizzare alla home
    const [submitted, setSubmitted] = useState(false) ;

    const handleAdd = (event) => {
        event.preventDefault() ;

        //VALIDATION
        let valid = true ;
        if (course==='' || score==='' || date ==='')
            valid = false ;
        const scorenumber =  +score ;
        if(scorenumber <18 || scorenumber>30) 
            valid = false ;

        if(valid){
            setErrorMessage('') ;
            const exam = { coursecode: course, score: score, date: dayjs(date) } ;
            props.addExam(exam) ;
            //(reindirizzamento)
            //torniamo alla home page
            setSubmitted(true) ;
            //resettiamo i valori di default
            setCourse('') ;
            setScore('') ;
            setDate('') ; 
            
        } else {
            setErrorMessage('Error in the form...') ;
        }
    }

    return (
            <>
            {submitted && <Redirect to='/'></Redirect>
            /*(reindirizzamento alla home page)*/}
            <form>
                Exam: 
                <select value={course} onChange={event => setCourse(event.target.value)}>
                    <option value="" hidden disabled>Select one...</option>
                    {props.courses.map(course => <option value={course.coursecode} key={course.coursecode}>{course.name}</option>)}
                </select><br/>
                Score: <input type="text" value={score} onChange={(event)=>{setScore(event.target.value)}}/><br/>
                Date: <input type="date" value={date} onChange={event => setDate(event.target.value)}/><br/>
                <button onClick={handleAdd}>Add</button><br/>
                <Link to='/'><button>Cancel</button></Link><br/>
                <span style={{color: 'red'}}>{errorMessage}</span>
            </form>
            </>
            ) ;
}
    export { Title, ExamTable, ExamRow } ;