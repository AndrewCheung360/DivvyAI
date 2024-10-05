import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/config";
import { createClient } from "@/utils/supabase/server";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

/* Uploads an assignment to Pinata and adds file to supabase */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const formData = await request.formData();
    console.log(formData);
    const file: File | null = formData.get("file") as unknown as File;
    const uploadData = await pinata.upload.file(file)
    const imgUrl = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${uploadData.cid}`;
    console.log(`Image url is ${imgUrl}`);
    const { data, error } = await supabase
      .from("Assignment")
      .insert({
        name: formData.get("name"),
        deadline: formData.get("deadline"),
        estimated_time: formData.get("estimated_time"),
        priority: formData.get("priority"),
        pdf: imgUrl,
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
