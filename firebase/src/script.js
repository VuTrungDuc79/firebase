// import {var, func,...} from "./path|link"
// Init service firebase
import { app, auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "./firebase-config.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "./firebase-config.js";

/** Firebase Firestore / CRUD
 *
 */
const colRef = collection(db, "books");

// READ /////////////////////////////////////////////////
getDocs(colRef)
  .then((snapshot) => {
    let posts = [];
    snapshot.docs.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
    console.log(posts);
  })
  .catch((error) => {
    console.log(error);
  });

async function fetchPosts() {
  try {
    const snapshot = await getDocs(colRef);
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  } catch (error) {
    console.log(error);
  }
}
fetchPosts();

// CREATE //////////////////////////////////////////////////////
const addPost = document.querySelector(".add");
addPost &&
  addPost.addEventListener("submit", (e) => {
    e.preventDefault();
    addDoc(colRef, {
      name: addPost.name.value,
      title: addPost.title.value,
      des: addPost.des.value,
      createAt: serverTimestamp(),
    })
      .then(() => {
        addPost.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  });

addPost &&
  addPost.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await addDoc(colRef, {
        name: addPost.name.value,
        title: addPost.title.value,
        des: addPost.des.value,
        createAt: serverTimestamp(),
      });
      addPost.reset();
    } catch (error) {
      console.log(error);
    }
  });

// UPDATE //////////////////////////////////////////////////////////
const updatePost = document.querySelector(".update");
updatePost &&
  updatePost.addEventListener("submit", (e) => {
    e.preventDefault();
    let docRef = doc(db, "books", deletePost.id.value);
    updateDoc(docRef, {
      name: updatePost.name.value,
      title: updatePost.title.value,
      des: updatePost.des.value,
      createAt: serverTimestamp(),
    })
      .then(() => {
        updatePost.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  });

updatePost &&
  updatePost.addEventListener("submit", async (e) => {
    e.preventDefault();
    let docRef = doc(db, "books", updatePost.id.value);
    try {
      await updateDoc(docRef, {
        name: updatePost.name.value,
        title: updatePost.title.value,
        des: updatePost.des.value,
        createAt: serverTimestamp(),
      });
      updatePost.reset();
    } catch (error) {
      console.log(error);
    }
  });

// DELETE //////////////////////////////////////////////////////////
const deletePost = document.querySelector(".delete");
deletePost &&
  deletePost.addEventListener("submit", (e) => {
    e.preventDefault();
    let docRef = doc(db, "books", deletePost.id.value);
    deleteDoc(docRef)
      .then(() => {
        updatePost.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  });

deletePost &&
  deletePost.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      let docRef = doc(db, "books", deletePost.id.value);
      await deleteDoc(docRef);
      updatePost.reset();
    } catch (error) {
      console.log(error);
    }
  });

////////////////////////////////////////////
const searchItem = document.querySelector(".search");

searchItem &&
  searchItem.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Lấy giá trị tìm kiếm từ ô input
    const searchTerm = searchItem.search.value.trim();

    if (searchTerm) {
      // Tạo một truy vấn Firestore để tìm kiếm tài liệu có trường `name` hoặc `title` chứa từ khóa tìm kiếm
      const q = query(collection(db, "books"), where("name", "==", searchTerm));

      try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("Không tìm thấy kết quả.");
        } else {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
          });
        }
      } catch (error) {
        console.log("Lỗi khi tìm kiếm:", error);
      }
    } else {
      console.log("Vui lòng nhập từ khóa tìm kiếm.");
    }
  });
