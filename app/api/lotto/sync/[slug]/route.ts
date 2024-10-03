import { NextRequest, NextResponse } from "next/server";

// get single item by id
export async  function GET(req: NextRequest,
                           { params }: { params: {slug: string} }) {

  console.log(params.slug);

  if (params.slug === null || params.slug === undefined)
    return new Response("",{ status : 200 });

  const getWinNo = null;
  if (getWinNo === null) {
    return new Response("",{ status : 204 });
  }

  const res = {
    message: 'get single item query succeed!',
    data: getWinNo
  }
  return NextResponse.json(res, { status: 200 });
}
