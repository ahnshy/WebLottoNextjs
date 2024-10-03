import { NextRequest, NextResponse } from "next/server";
import {getWinNo} from "@/app/database/db";

// get single item by id
export async  function GET(req: NextRequest,
                           { params }: { params: {slug: string} }) {

  console.log(params.slug);

  if (params.slug === null || params.slug === undefined)
    return new Response("",{ status : 200 });

  let res = {

  };

  try {
    const result = await getWinNo(params.slug);

    if (result === null) {
      return new Response("No results found.", {status: 404});
    }

    res = {
      message: 'get single item by id succeed!',
      data: result
    }

  } catch (error) {
  console.error('Error fetching win count:', error);
    return new Response("Error fetching win count.", {status: 500});
}
  return NextResponse.json(res, { status: 200 });
}
