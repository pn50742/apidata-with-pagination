import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
function App() {
  const [data,setData] = useState([]);
  const [todoperPage, setTodoperPage] = useState(20);
  const [currentPage, setcurrentPage] =useState(1);
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res)=>res.json())
    .then((result)=>setData(result));
  },[])

  const data1 = "<h1 class='h1 text-danger ps-3'>Todo Items with pagination</h1>";
  const numerofpages = Math.ceil(data.length/todoperPage);
  const pages = [...Array(numerofpages+1).keys()].slice(1);
  console.log('pages', pages);
  const indexOfLastTodos = currentPage*todoperPage;
  const indexOfFirstTodos = indexOfLastTodos-todoperPage;
  const visibletodos = data.slice(indexOfFirstTodos, indexOfLastTodos);
  const prevpageHandler=()=>{
    if(currentPage!=1){
      setcurrentPage(currentPage-1)
    }
  }
  const nextPagehandler=()=>{
    if(currentPage!=numerofpages){
      setcurrentPage(currentPage+1)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="card m-5">
          <div dangerouslySetInnerHTML={{__html:data1}} />
          <select class="form-select w-25 mb-3 ms-3" onChange={(e)=>setTodoperPage(e.target.value)} aria-label="Default select example">>
  <option value="10">10</option>
  <option value="20">20</option>
  <option value="30">30</option>
  <option value="40">40</option>
  <option value="50">50</option>
</select>
        <ul className="list-group">
        {visibletodos&&visibletodos.map((ele)=>{
          return (<li className='list-group-item'>{ele.title}</li>)
        })}
        </ul>
        <nav aria-label="Page navigation example ms-3 me-3 mt-3">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" onClick={prevpageHandler} >Previous</a></li>
              {pages.map((elm)=>{
          return (<li className="page-item" key={elm}><a className={currentPage===elm?"page-link active":"page-link"} onClick={()=>setcurrentPage(elm)}>{elm}</a></li>)
        })}
              <li className="page-item"><a className="page-link" onClick={nextPagehandler} >Next</a></li>
            </ul>
          </nav>
        {/* <p className="text-dark ps-3">{pages.map((elm)=>{
          return (<span key={elm} className='ms-1 me-1'>{elm}</span>)
        })}</p> */}
        </div>
      </header>
    </div>
  );
}

export default App;
