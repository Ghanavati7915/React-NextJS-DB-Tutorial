import { NextApiRequest, NextApiResponse } from "next";


let dummyData = [
    {id: 1 ,name: "Dummy-Contact-1"},
    {id: 2 ,name: "Dummy-Contact-2"},
    {id: 3 ,name: "Dummy-Contact-3"},
    {id: 4 ,name: "Dummy-Contact-4"},
    {id: 5 ,name: "Dummy-Contact-5"},
]

export default async function contactService (req: NextApiRequest,res: NextApiResponse){
console.log('Contact Service Called')

if (req.method == "GET"){
    console.log('API GET Called')
    res.json(dummyData);
}

if (req.method == "POST"){
    console.log('API POST Called')
    const {id,name} = req.body;
    dummyData.push({id,name});
    res.status(200).end();
}

if (req.method == "DELETE"){
    console.log('API DELETE Called')
    const {id} = req.body;
    dummyData = dummyData.filter(dummy => dummy.id != id);
    res.status(200).end();
}


}