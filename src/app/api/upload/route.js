import { NextResponse } from "next/server"
import {writeFile} from "fs/promises"

export async function POST(req){
    const payload = await req.formData()
    const file = payload.get("file")

    if(!file){
        return NextResponse.json({error:"No file uploaded"},{status:404})
    }
    const byteData = await file.arrayBuffer()
    const buffer = Buffer.from(byteData)
    const path = `./public/${file?.name}`
    await writeFile(path,buffer)
    return NextResponse.json({message:"File uploaded successfully"},{status:200})

}