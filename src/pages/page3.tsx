import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page3(){

    const [form,setForm] = useState({    
        name:'',
        mobile:'',
    });

    const [list , setList] = useState([])

    const handleFromChanged = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const { name , value } = e.target;
        setForm({...form,[name]:value});
    }

    const getAll = async () => {
        const res = await fetch('/api/contactprisma');
        if (res.ok){
            const data = await res.json();
            setList(data);
        }
    }

    const handleAddClick = async () => {
        const res = await fetch('/api/contactprisma',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({mobile:form.mobile , name : form.name})
        })

        if (res.ok){
            getAll();
            setForm({mobile:'',name:''});
        }
    }

    const handleDeleteClick = async (id:number) => {
        const res = await fetch('/api/contactprisma',{
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
            <h2> My Contacts Page 3 : </h2>
            <Link href="/"> HOME PAGE </Link>
            <input type="text" name="name" placeholder="name" value={form.name} onChange={handleFromChanged}></input>
            <input type="text" name="mobile"   placeholder="mobile"   value={form.mobile} onChange={handleFromChanged}></input>
            <button onClick={handleAddClick}> Add </button>
            <ul>
                {
                    list.map((contact:any) => {
                       return (
                        <li key={contact.id}>
                            {contact.name} : {contact.mobile}  
                            - <button onClick={() => handleDeleteClick(contact.id)}> Remove </button>
                        </li>
                       )
                    })
                }
            </ul>
        </div>
    )
}