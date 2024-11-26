import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "./firebase-config.js";

// SIGN UP
// const handleSignUpWithEmailAndPassword = (signupForm) => {
const signupForm = document.querySelector("#signup-form");
signupForm &&
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const confirmPassword = signupForm["confirm-password"].value;
    // Nếu thuộc tính name bên htmk abc-xyz => JS ['']
    if (password === confirmPassword) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      }
      alert("Đăng ký thành công");
      window.location.replace("../auth/sign-in.html");
    } else {
      console.log("Đăng nhập thất bại");
      alert("Đăng ký thất bại");
    }
  });
// };

// SIGN IN
// const handleSignUpWithEmailAndPassword = (signupForm) => {
const signinForm = document.querySelector("#signin-form");
signinForm &&
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signinForm.email.value;
    const password = signinForm.password.value;
    if (password) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      }
      alert("Đăng nhập thành công");
      window.location.replace("../crud.html");
    } else {
      console.log("Đăng nhập thất bại");
      alert("Sai thông tin, nhập lại");
    }
  });
// };
