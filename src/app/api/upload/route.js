import { NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export async function POST(req){
    const payload = await req.formData()
    const file = payload.get("file")
    const client = await pool.connect()

    if(!file){
        return NextResponse.json({error:"No file uploaded"},{status:404})
    }
    const byteData = await file.arrayBuffer()
    const buffer = Buffer.from(byteData)

    try{
    
    const query = 'INSERT INTO files(filename,filedata) VALUES($1,$2) RETURNING id';
    const values = [file.name, buffer];
    const result = await client.query(query, values);

    return NextResponse.json({message:"File uploaded successfully",response:result.rows[0].id},{status:200})
    }
    catch(error){
        console.log(error)
        return NextResponse.json({error:"Error uploading file"},{status:500})
    }

}

export async function GET(req) {
    
    const client = await pool.connect();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    

    if (!id) {
        return NextResponse.json({ error: "No file ID provided", status: 400 });
    }

    try {
        const query = 'SELECT filename, filedata FROM files WHERE id = $1';
        const values = [id];
        const res = await client.query(query, values);

        if (res.rows.length === 0) {
            return NextResponse.json({ error: "File not found", status: 404 });
        }

        const file = res.rows[0];
        const base64 = Buffer.from(file.filedata).toString('base64');
        const dataUrl = `data:image/jpeg;base64,${base64}`;

        return NextResponse.json({ filename: file.filename, dataUrl },{status:200});
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error fetching file", status: 500 });
    }
}