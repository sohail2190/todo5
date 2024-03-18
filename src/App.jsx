import {useState,useEffect} from 'react';
import './App.css';
import Alert from './components/Alert';
import List from './components/List';


// ---------Local Storage

const getLocalStorage= () =>{
  let list = localStorage.getItem("list");
  if(list){
    return(list = JSON.parse(localStorage.getItem("list")))
  }else{
    return [];
  }
}
//--------------------------------------------------------------------------

function App() {

  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show:false, msg:"", type:""});

  //-----------------------------------
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!name){
      showAlert(true, "danger", "Please Enter Value")
    } else if(name && isEditing){
      setList(
        list.map((item) =>{
          if(item.id === editId){
            return {...item, title:name}
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true,"success", "Value Changed")
    } else{
      showAlert(true,"success", "Item has added");
      const newItem = {id:new Date().getTime().toString(), title:name};
      setList([...list,newItem]);
      setName("");
    }
  };
//-------------------------------------
  const showAlert = (show=false, type="", msg="")=>{
    setAlert({show,type,msg})
  }

//-------------------------------------
  const clearList = ()=>{
    showAlert(true,"danger", "Data Cleared");
    setList([]);
  };

//-------------------------------------
  const editItems = (id)=>{
    const specficItem = list.find( (item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specficItem.title);
  };

//-------------------------------------
  const removeItems = (id)=>{
    showAlert(true,"danger", "Deleted");
    setList(list.filter((item) => item.id !== id))
  };

//use effect ---------------------
  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  },[list]);

  return (
    <div>
      <section className='section-center'>
        <form className='grocery-form' onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}

          <h1>Todo List App</h1>

          <div className='form-control'>
            <input type="text" className='grocery' placeholder='Enter your Task' 
            value={name} onChange={(e)=>setName(e.target.value)} />
            <button className='submit-btn'> {isEditing ? "Edit" : "Submit"} </button>

          </div>
        </form>
          <br /><br />
          {
            list.length  > 0 && (
              <div className="grocer-container">
                <List items={list} removeItems={removeItems} editItems={editItems}/>
                <button className='clear-btn' onClick={clearList}>Clear Data</button>
              </div>
            )
          }

      </section>
    </div>
  )
}

export default App;
