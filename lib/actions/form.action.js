import { connect } from "@/lib/db";

export const submitFormAction = async (formData) => {
  try {
    const db = await connect();
    const Email = String(formData.Email || "").trim().toLowerCase();
    const Department = String(formData.Department || formData.Pref || "").trim();
    if (!Email || !Department) throw new Error("Email and department are required");
    const { Questions = {}, ...fields } = formData;
    const id = Buffer.from(`${Email}\u0000${Department}`, "utf8").toString("base64url");
    await db.collection("formData").doc(id).create({
      ...fields, Email, Department, Questions,
      shortlisted: false, createdAt: new Date(), updatedAt: new Date(), schemaVersion: 2,
    });
    return { success: true, message: "Form submitted successfully!", id };
  } catch (error) {
    return { success: false, message: error?.message || "Unable to submit form" };
  }
};
