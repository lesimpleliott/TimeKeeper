import Tag from "@/models/Tag";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

// Fonction pour créer un tag
export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const newTag = new Tag(data);
    await newTag.save();
    return NextResponse.json({
      success: true,
      message: "Tag created successfully",
      tag: newTag,
    });
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json(
      { success: false, message: "Error creating tag", error },
      { status: 500 }
    );
  }
}

// Fonction pour récupérer tous les tags
export async function GET() {
  try {
    await dbConnect();
    const tags = await Tag.find({});
    return NextResponse.json({ success: true, tags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching tags", error },
      { status: 500 }
    );
  }
}
