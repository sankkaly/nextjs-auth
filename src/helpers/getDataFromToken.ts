import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request:NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedeToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedeToken.id;
    } catch (error:any) {
        throw new Error(error.message);
        
    }
}