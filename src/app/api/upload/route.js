import { NextResponse } from "next/server";
import {writeFile} from "fs/promises"
import { Pool } from "pg";

const pool = new Pool({
    connectionString:process.env.DATABASE_URL
})



export async function POST(req){
    const data = await req.formData()
    const file = data.get("file");
    const client = await pool.connect()

    if(!file){
        return NextResponse.json({error:"No file or image Uploaded",status:400})
    }

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    // const path = `./public/${file?.name}`
    // await writeFile(path,buffer)

    try{
        const query = `INSERT INTO files(filename,filedata) VALUES($1,$2) RETURNING id`;
        const values = [file.name,buffer]
        const res = await client.query(query,values)
        return NextResponse.json({message:"File Uploaded Successfully",fileId: res.rows[0].id,status:200})
    }
    catch(error){
        return NextResponse.json({error:"Error Uploading File",status:500})
    }
}