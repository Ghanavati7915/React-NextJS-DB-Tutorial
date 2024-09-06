import Link from "next/link";
import { useState } from "react";

export default function HomePage(){

    const [contactList,setContactList] = useState([
        {id: 1 ,name: "Contact-1"},
        {id: 2 ,name: "Contact-2"},
        {id: 3 ,name: "Contact-3"},
        {id: 4 ,name: "Contact-4"},
        {id: 5 ,name: "Contact-5"},
    ])

    const [form,setForm] = useState({
        id : 0,
        name:'',
    });

    const handleFromChanged = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const { name , value } = e.target;
        setForm({...form,[name]:value});
    }

    const handleAddClick = ()=>{
        setContactList([
            ...contactList, 
            { id: form.id, name: form.name }
        ]);

        // Reset form fields after adding
        setForm({ id: 0, name: '' });
    }

    const handleDeleteClick = (id:number)=>{
        // Filter out the contact with the given id
        setContactList(contactList.filter(contact => contact.id !== id));

    }


    return (
        <div>
            <h2> My Contacts : </h2>
            <Link href="/page2"> PAGE 2 </Link> | <Link href="/page3"> PAGE 3 </Link>
            <input type="text" name="id"   placeholder="id"   value={form.id} onChange={handleFromChanged}></input>
            <input type="text" name="name" placeholder="name" value={form.name} onChange={handleFromChanged}></input>
            <button onClick={handleAddClick}> Add </button>
            <ul>
                {
                    contactList.map((contact) => {
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