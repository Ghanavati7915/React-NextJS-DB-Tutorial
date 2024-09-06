import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page2(){

    const [form,setForm] = useState({
        id : 0,
        name:'',
    });

    const [list , setList] = useState([])

    const handleFromChanged = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const { name , value } = e.target;
        setForm({...form,[name]:value});
    }

    const getAll = async () => {
        const res = await fetch('/api/contact');
        if (res.ok){
            const data = await res.json();
            setList(data);
        }
    }

    const handleAddClick = async () => {
        const res = await fetch('/api/contact',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({id:+form.id , name : form.name})
        })

        if (res.ok){
            getAll();
            setForm({id:0,name:''});
        }
    }

    const handleDeleteClick = async (id:number) => {
        const res = await fetch('/api/contact',{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({id:+id})
        })

        if (res.ok){
            getAll();
        }
    }

    useEffect(() => {
        getAll();
      }, []); 

    return (
        <div>
            <h2> My Contacts Page 2 : </h2>
            <Link href="/"> HOME PAGE </Link>
            <input type="text" name="id"   placeholder="id"   value={form.id} onChange={handleFromChanged}></input>
            <input type="text" name="name" placeholder="name" value={form.name} onChange={handleFromChanged}></input>
            <button onClick={handleAddClick}> Add </button>
            <ul>
                {
                    list.map((contact) => {
                       return (
                        <li key={contact.id}>
                            {contact.id} . {contact.name}  
                            - <button onClick={() => handleDeleteClick(contact.id)}> Remove </button>
                        </li>
                       )
                    })
                }
            </ul>
        </div>
    )
}