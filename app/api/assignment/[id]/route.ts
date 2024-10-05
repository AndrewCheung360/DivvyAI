import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/config";
import { createClient } from "@/utils/supabase/server";

/* Gets assignment by supabase id from supabase */
export async function GET(request: NextRequest, { params }: { params: { id: string }}) {
  const { id } = params;
  const assignmentId = BigInt(id);
  const { searchParams } = new URL(request.url);
  const getPdf = searchParams.get("pdf");
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("Assignment")
      .select("*")
      .eq("id", assignmentId)
      .single();
    if (error) {
      console.log(error);
      return NextResponse.json(
        { error: error.message }, 
        { status: 400 });
    }
    if (getPdf === "true") {
      const file = await pinata.gateways.get(data.pdf);
      const blob = file.data as Blob;
      const arrayBuffer = await blob?.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': "application/pdf",
          'Content-Length': blob.size.toString(),
          'Content-Disposition': `attachment; filename="${data.name}.pdf"`,
        },
      });
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

/* Deletes assignment by supabase id from Pinata and Supabase */
export async function DELETE(request: NextRequest, { params }: { params: { id: string }}) {
  const { id } = params;
  const assignmentId = BigInt(id);
  try {
    const supabase = createClient();
    // Delete assignment from supabase
    const { data, error } = await supabase
      .from("Assignment")
      .delete()
      .eq("id", assignmentId)
      .select();
    if (error) {
      console.log(error);
      return NextResponse.json(
        { error: error.message }, 
        { status: 400 });
    }
    // Delete assignment from Pinata
    if (data[0].pdf) {
      console.log(data[0].pdf.toString());
      const deletedAssignment = await pinata.files.delete([data[0].pdf.toString()]);
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
