import Tag from "@/models/tagSchema";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

// Fonction POST pour créer un nouveau tag
export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const newTag = await Tag.create(data);

    return NextResponse.json({
      success: true,
      message: "Tag created successfully",
      tag: newTag.toJSON(), // Transformation automatique
    });
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json(
      { success: false, message: "Error creating tag", error },
      { status: 500 },
    );
  }
}

// Fonction GET pour récupérer tous les tags
export async function GET() {
  try {
    await dbConnect();
    const tags = await Tag.find({}).lean(); // `.lean()` pour convertir directement en objet JS

    return NextResponse.json({
      success: true,
      tags: tags.map((tag) => ({
        id: tag._id, // Ajout de `id`
        ...tag,
        _id: undefined, // Suppression de `_id`
        __v: undefined, // Suppression de `__v`
      })),
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching tags", error },
      { status: 500 },
    );
  }
}
