import Tag from "@/models/tagSchema";
import { TagType } from "@/types/tag";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

// Fonction GET pour récupérer un tag par ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const tag = (await Tag.findById(params.id).lean()) as TagType | null;

    if (!tag) {
      return NextResponse.json(
        { success: false, message: "Tag not found" },
        { status: 404 },
      );
    }

    // Reconstruction de l'objet pour que `id` soit la première propriété
    const { _id, ...tagData } = tag;
    const tagWithIdFirst = { id: _id.toString(), ...tagData };

    return NextResponse.json({
      success: true,
      tag: tagWithIdFirst,
    });
  } catch (error) {
    console.error("Error fetching tag:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching tag", error },
      { status: 500 },
    );
  }
}

// Fonction PUT pour mettre à jour un tag par ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const data = await req.json();
    const updatedTag = (await Tag.findByIdAndUpdate(params.id, data, {
      new: true,
    }).lean()) as TagType | null;

    if (!updatedTag) {
      return NextResponse.json(
        { success: false, message: "Tag not found" },
        { status: 404 },
      );
    }

    // Reconstruction de l'objet pour que `id` soit la première propriété
    const { _id, ...tagData } = updatedTag;
    const tagWithIdFirst = { id: _id.toString(), ...tagData };

    return NextResponse.json({
      success: true,
      message: "Tag updated successfully",
      tag: tagWithIdFirst,
    });
  } catch (error) {
    console.error("Error updating tag:", error);
    return NextResponse.json(
      { success: false, message: "Error updating tag", error },
      { status: 500 },
    );
  }
}

// Fonction DELETE pour supprimer un tag par ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const deletedTag = await Tag.findByIdAndDelete(params.id);

    if (!deletedTag) {
      return NextResponse.json(
        { success: false, message: "Tag not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tag deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tag:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting tag", error },
      { status: 500 },
    );
  }
}
