const firebaseConfig = {
  apiKey: "AIzaSyB0ggNUW15VGbmlkpNS5NtQi4695HSAnBA",
  authDomain: "edpoint-6d6a4.firebaseapp.com",
  projectId: "edpoint-6d6a4",
  storageBucket: "edpoint-6d6a4.appspot.com",
  messagingSenderId: "732595810972",
  appId: "1:732595810972:web:5c7cd0b7a444da7c04b359",
};

firebase.initializeApp(firebaseConfig);

function login() {

  const auth = firebase.auth();

  const googleAuth = new firebase.auth.GoogleAuthProvider();
  event.preventDefault();
  firebase
    .auth()
    .signInWithPopup(googleAuth)
    .then((result) => {
      // var user = result.user;
      // console.log(user);
      window.location.href = "homepage.html";
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

function uploadMaterials(fileName) {
  const ref = firebase.storage().ref();

  const file = document.querySelector("#file").files[0];

  const name = file.name;

  const metadata = { contentType: file.type };

  const task = ref.child(name).put(file, metadata);
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      alert("File upload successful!");
      // document.location.reload();
      document.getElementById("fileName").value = null;
      document.getElementById("file").value = null;
      const node = document.createElement("li");
      const parentNode = document.createElement("a");
      const textnode = document.createTextNode(fileName);
      parentNode.setAttribute("href", url);
      parentNode.setAttribute("target", "_blank");
      parentNode.appendChild(textnode);
      node.appendChild(parentNode)
      document.getElementById("materials_list").appendChild(node);
    });
}
