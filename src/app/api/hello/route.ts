import { NextResponse } from 'next/server';

type ResponseData = {
    message: string;
};

export async function GET() {
    return NextResponse.json({ message: 'hello world' });
}
