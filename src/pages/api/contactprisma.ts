import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function contactService (req: NextApiRequest,res: NextApiResponse){
console.log('Contact Service Called')

if (req.method == "GET"){
    console.log('API GET Called')

    const result = await prisma.contact.findMany();
    return res.json(result);
}

if (req.method == "POST"){
    console.log('API POST Called')
    const {name , mobile} = req.body;

    const result = await prisma.contact.create({
        data:{
            name : name,
            mobile: mobile
        }
    })

    return res.json(result)
}

if (req.method == "DELETE"){
    console.log('API DELETE Called')
    const {id} = req.body;
    const result = await prisma.contact.delete({
        where : {
            id : +id
        }
    })
    return res.json(result);
}


}