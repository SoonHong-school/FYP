const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.addAgent = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated managers can add agents."
    );
  }

  const managerDoc = await db.collection("users").doc(context.auth.uid).get();
  if (!managerDoc.exists || managerDoc.data().role !== "manager") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only managers can add agents."
    );
  }

  const { name, email } = data;
  if (!name || !email) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Name and email are required."
    );
  }

  try {
    // Create agent in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email: email,
      password: "abcd1234",
      displayName: name,
      emailVerified: false,
    });

    // Add agent details to Firestore
    await db.collection("users").doc(userRecord.uid).set({
      name: name,
      email: email,
      role: "agent",
      firstLogin: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, uid: userRecord.uid };
  } catch (err) {
    throw new functions.https.HttpsError("internal", err.message);
  }
});
