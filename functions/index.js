const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {
  if (authUser.email) {
    const customClaims = {
      user: true,
    };
    try {
      var _ = await admin
        .auth()
        .setCustomUserClaims(authUser.uid, customClaims);

      return db
        .collection("roles")
        .doc(authUser.uid)
        .set({
          email: authUser.email,
          role: customClaims,
          id: authUser.uid,
          displayName: authUser.displayName,
        });
    } catch (error) {
      console.log(error);
    }
  }
});

exports.setUserRole = functions.https.onCall(async (data, context) => {
  if (!context.auth.token.admin) return;

  try {
    var _ = await admin.auth().setCustomUserClaims(data.uid, data.role);

    return db
      .collection("roles")
      .doc(data.uid)
      .update({
        role: data.role,
      });
  } catch (error) {
    console.log(error);
  }
});
exports.deleteUser = functions.https.onCall(async (data) => {
  try {
    var _ = await admin.auth().deleteUser(data.id);

    return db
      .collection("roles")
      .doc(data.id)
      .delete();
  } catch (error) {
    console.log(error);
  }
});
exports.createUser = functions.https.onCall(async (data) => {
  try {
    var _ = await admin.auth().updateUser(data.id, data);
    return db
      .collection("roles")
      .doc(data.id)
      .update(data);
  } catch (error) {
    console.log(error);
  }
});
