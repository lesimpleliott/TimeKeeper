import Tag from "@/models/Tag"; // Importation du modèle Tag
import dbConnect from "@/utils/dbConnect"; // Importation de la fonction de connexion à la base de données
import { NextResponse } from "next/server"; // Importation de NextResponse pour gérer les réponses HTTP

// Fonction GET pour récupérer un tag par ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect(); // Connexion à la base de données
    const { id } = params; // Extraction de l'ID des paramètres
    const tag = await Tag.findById(id); // Recherche du tag par ID
    if (!tag) {
      return NextResponse.json(
        { success: false, message: "Tag not found" },
        { status: 404 }
      ); // Tag non trouvé
    }
    return NextResponse.json({ success: true, tag }); // Tag trouvé, réponse avec les détails du tag
  } catch (error) {
    console.error("Error fetching Tag:", error); // Log de l'erreur
    return NextResponse.json(
      { success: false, message: "Error fetching Tag", error },
      { status: 500 }
    ); // Réponse en cas d'erreur
  }
}

// Fonction PUT pour mettre à jour un tag par ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect(); // Connexion à la base de données
    const { id } = params; // Extraction de l'ID des paramètres
    const data = await req.json(); // Extraction des données de la requête
    const updatedTag = await Tag.findByIdAndUpdate(id, data, { new: true }); // Mise à jour du tag
    if (!updatedTag) {
      return NextResponse.json(
        { success: false, message: "Tag not found" },
        { status: 404 }
      ); // Tag non trouvé
    }
    return NextResponse.json({
      success: true,
      message: "Tag updated successfully",
      tag: updatedTag,
    }); // Tag mis à jour avec succès
  } catch (error) {
    console.error("Error updating tag:", error); // Log de l'erreur
    return NextResponse.json(
      { success: false, message: "Error updating tag", error },
      { status: 500 }
    ); // Réponse en cas d'erreur
  }
}

// Fonction DELETE pour supprimer un tag par ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect(); // Connexion à la base de données
    const { id } = params; // Extraction de l'ID des paramètres
    const deletedTag = await Tag.findByIdAndDelete(id); // Suppression du tag
    if (!deletedTag) {
      return NextResponse.json(
        { success: false, message: "Tag not found" },
        { status: 404 }
      ); // Tag non trouvé
    }
    return NextResponse.json({
      success: true,
      message: "Tag deleted successfully",
    }); // Tag supprimé avec succès
  } catch (error) {
    console.error("Error deleting tag:", error); // Log de l'erreur
    return NextResponse.json(
      { success: false, message: "Error deleting tag", error },
      { status: 500 }
    ); // Réponse en cas d'erreur
  }
}
