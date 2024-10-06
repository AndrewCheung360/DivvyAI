import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/config";
import { createClient } from "@/utils/supabase/server";
import { extractPdfText } from "@/utils/openai/openAiAlgo";

/* Gets assignment by supabase id from supabase */
export async function GET(request: NextRequest) {
  console.log("endpoint hit")
  const { searchParams } = new URL(request.url);
  const assignmentId = parseInt(searchParams.get("id") as string);
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

      console.log(buffer);
      try {
        const extractedText = await extractPdfText(buffer);
        console.log("Extracted text:", extractedText);
        return NextResponse.json({ text: extractedText }, { status: 200 });
      } catch (extractError) {
        console.log("Error extracting text:", extractError);
        return NextResponse.json(
          { error: "Error extracting text from PDF" },
          { status: 500 }
        );
      }
      
      // console.log(extractedText);
      // return NextResponse.json({ text: extractedText }, { status: 200 });
      return NextResponse.json("here", { status: 200 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  // try {
  //   const supabase = createClient();
  //   const { data, error } = await supabase
  //     .from("Assignment")
  //     .select("*")
  //     .eq("id", assignmentId)
  //     .single();
    // if (error) {
    //   console.log(error);
    //   return NextResponse.json(
    //     { error: error.message }, 
    //     { status: 400 });
    // }
  //   if (getPdf === "true") {
      // const file = await pinata.gateways.get(data.pdf);
      // const blob = file.data as Blob;
      // const arrayBuffer = await blob?.arrayBuffer();
      // const buffer = Buffer.from(arrayBuffer);

      // console.log(buffer);
      // const extractedText = await extractPdfText(buffer);
      // console.log(extractedText);
      // return NextResponse.json({ text: extractedText }, { status: 200 });

  //     return new NextResponse(buffer, {
  //       status: 200,
  //       headers: {
  //         'Content-Type': "application/pdf",
  //         'Content-Length': blob.size.toString(),
  //         'Content-Disposition': `attachment; filename="${data.name}.pdf"`,
  //       },
  //     });
  //   }

  // //   return NextResponse.json(data, { status: 200 });
  // } catch (e) {
  //   console.log(e);
  //   return NextResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }
}