import {db} from './firebase';
import {uid} from 'uid';
import {set,ref, onValue,remove, update} from 'firebase/database';
import {useState,useEffect} from "react"; 

function App() {
  const [todo,setTodo] = useState("");
  const [todos,setTodos] = useState([]);
  const [isEdit,setisEdit] = useState(false);
  const [tempUuid,setTempUuid] = useState("");
  const handleTodoChange = (e) =>{
    setTodo(e.target.value);
  };
  useEffect(()=>{
    onValue(ref(db),snapshot=>{
      setTodos([]);
      const data = snapshot.val();
      if(data !== null){
        Object.values(data).map((todo) => (
          setTodos(oldArray => [...oldArray,todo])
        ));
      }
    })
  },[])
  const writeToDatabase = () =>{
    const uuid = uid()
    set(ref(db,`/${uuid}`),{
      todo,
      uuid
    });
    setTodo("");
  };
  const handleDelete = (todo) =>{
    remove(ref(db,`/${todo.uuid}`));
  };
  const handleUpdate = (todo) =>{
    setisEdit(true);
    setTempUuid(todo.uuid)
    setTodo(todo.todo);
  }
  const handleSubmitUpdate = () =>{
    update(ref(db,`/${tempUuid}`),{
      todo,
      uuid:tempUuid
    })
    setTodo("");
    setisEdit(false);
  }
  return (
    <div className="App">
    <input type="text" value={todo} onChange={handleTodoChange}/>
    {isEdit ?(<><button onClick={handleSubmitUpdate}>Update Changes</button><button onClick={() => {setisEdit(false);setTodo("");}}>X</button></>) :(<><button onClick={writeToDatabase}>submit</button></>)}
    {todos.map((todo,i) => (
      <div key={i}>
      {console.log(todo)}
        <h1>{todo.todo}</h1>
        <button onClick={() => handleUpdate(todo)}>update</button>
        <button onClick={() => handleDelete(todo)}>delete</button>
        </div>
    ) )}
    </div>
  );
}

export default App;
