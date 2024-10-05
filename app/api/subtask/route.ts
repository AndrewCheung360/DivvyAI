import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/config";
import { createClient } from "@/utils/supabase/server";
import { start } from "repl";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };


/* Adds subtask with assignmentId to supabase */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const formData = await request.formData();
    const assignmentId = formData.get("assignment_id");
    const { data, error } = await supabase
      .from("Subtask")
      .insert({
        name: formData.get("name"),
        start_time: formData.get("start_time"),
        end_time: formData.get("end_time"),
        notes: formData.get("notes"),
        assignment_id: assignmentId,
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