import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/config";
import { createClient } from "@/utils/supabase/server";

/* Gets alls substacks with assignmentId*/
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const assignmentId = parseInt(searchParams.get("assignment_id") as string);
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Subtask")
      .select("*")
      .eq("assignment_id", assignmentId);
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

/* Adds subtask with assignmentId to supabase */
export async function POST(request: NextRequest) {
  console.log("hi")
  try {
    const supabase = createClient();
    const body = await request.json();
    const {
      name,
      start_time,
      end_time,
      notes,
      assignment_id,
    } = body;
    const { data, error } = await supabase
      .from("Subtask")
      .insert({
        name,
        start_time,
        end_time,
        notes,
        assignment_id,
      })
      .select();
    console.log(data);
    if (error) {
      console.log(error);
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