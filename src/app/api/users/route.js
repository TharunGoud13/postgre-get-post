import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    connectionString:process.env.DATABASE_URL
})


export async function GET(){
    try{
    const client = await pool.connect()
    const result = await client.query("SELECT * FROM userdetails");
    const data = result.rows;
    client.release();

    return NextResponse.json({response:data},{status:200})
    }
    catch(error){
        return NextResponse.json({response:error},{status:500})
    }
}

export async function POST(req,res){
    const payload = await req.json()
    try{

        const client = await pool.connect()

        const insertedQuery = `INSERT INTO userdetails (id,username,email,phone,address) VALUES($1,$2,$3,$4,$5) RETURNING id,username,email,phone,address`;
        const values = [payload.id,payload.username,payload.email,payload.phone,payload.address]
        const result = await client.query(insertedQuery,values);
        const data = result.rows[0];
        client.release()
        return NextResponse.json({response:data},{status:200})
    }
    catch(error){
        console.log(error)
        return NextResponse.json({response:error},{status:500})
    }
}