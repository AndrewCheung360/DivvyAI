import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/config";
import { createClient } from "@/utils/supabase/server";

/* Gets all assignments from supabase */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Assignment")
      .select();
    if (error) {
      console.log(error);
      return NextResponse.json(
        { error: error.message }, 
        { status: 400 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* Uploads an assignment to Pinata and adds file to supabase */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const formData = await request.formData();
    console.log(formData);

    const name = formData.get("name");
    const deadline = formData.get("deadline");
    const estimated_time = formData.get("estimated_time");
    const priority = formData.get("priority");
    const file: File | null = formData.get("file") as unknown as File;

    // Validate required fields
    if (!name || !deadline || !estimated_time || !priority || !file) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const uploadData = await pinata.upload.file(file)
    const pdfId = `${uploadData.cid}`;
    console.log(`pdf id ${pdfId}`);

    const { data, error } = await supabase
      .from("Assignment")
      .insert({
        name,
        deadline,
        estimated_time,
        priority,
        pdf: pdfId,
      })
      .select();
    if (error) {
      console.log(error);
      console.log(data);
      return NextResponse.json(
        { error: error.message }, 
        { status: 400 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
