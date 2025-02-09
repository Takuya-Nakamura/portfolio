import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import { getAuth, getRedirectResult, signInWithPopup, signInWithRedirect, OAuthProvider, signOut, onAuthStateChanged, browserPopupRedirectResolver } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDOoYcchWpqLG43RkV8w1ZydikFfWBDBdg",
    authDomain: "mt-meet.firebaseapp.com",
    projectId: "mt-meet",
    storageBucket: "mt-meet.firebasestorage.app",
    messagingSenderId: "520764560478",
    appId: "1:520764560478:web:7367a12c677c97de5850cf"
  }

const app = initializeApp(firebaseConfig)

// Elements
const loginButton = document.getElementById('login')
const logoutButton = document.getElementById('logout')
const logoutCognitoButton = document.getElementById('logoutCognito')
const userInfo = document.getElementById('userInfo')
const loginStatus = document.getElementById('loginStatus')

// Auth
const auth = getAuth()

// signInWithRedirect用の処理。うまく行かない・
// 以下URLのいずれかの対応をしないとダメっぽい。
// https://firebase.google.com/docs/auth/web/redirect-best-practices?hl=ja

// window.onload = () => {
//     getRedirectResult(auth)
//         .then((result) => {
//             console.log("■getRedirectResult", result);
//             if (result) {
//                 // 認証成功
//                 console.log("🌟認証成功:", result.user);
//                 userInfo.textContent = JSON.stringify(result.user);
//                 loginStatus.textContent = "ログイン中";
//             } else {
//                 // 認証がまだ行われていない場合
//                 console.log("🌟認証結果がありません");
//             }
//         })
//         .catch((error) => {
//             console.error("🌟認証エラー:", error);
//         });
// };
// loginButton.addEventListener('click', () => {
//     const provider = new OAuthProvider('oidc.nakamura_cognito_test_1');
//     provider.addScope('email');
//     provider.addScope('openid');
//     provider.addScope('profile');

//     // signInWithRedirectでリダイレクトを開始
//     signInWithRedirect(auth, provider);
// });


// 認証状態の変更を監視
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("■ログイン中:", user);
        userInfo.textContent = JSON.stringify(user);
        loginStatus.textContent = "ログイン中";
    } else {
        console.log("■ログアウト済み");
        userInfo.textContent = "";
        loginStatus.textContent = "ログアウト済み";
    }
});

loginButton.addEventListener('click', () => {
    const provider = new OAuthProvider('oidc.mt-cognito-test');
    
    provider.addScope('email');
    provider.addScope('openid');
    provider.addScope('profile'); //これを

    const auth = getAuth();
    const startTime = Date.now(); // 開始時間を記録

    signInWithPopup(auth, provider)
    .then((result) => {
        console.log("■success", result);
        userInfo.textContent = JSON.stringify(result.user)

    })
    .catch((error) => {
        console.log("■error", error);
        // userInfo.textContent = JSON.stringify(error)  
        const elapsedTime = (Date.now() - startTime) / 1000; // 経過時間（秒）
        userInfo.textContent = `Error after ${elapsedTime} seconds: ${JSON.stringify(error)}`;

    });    
});




logoutButton.addEventListener('click', async () => {
    confirm("ログアウトしますか？")

    const promise = signOut(auth)
    promise.then(() => {
        console.log("■success signOut:")
        userInfo.textContent = ""
    }).catch((error) => {
        console.log("■error signOut:", error)
        userInfo.textContent = JSON.stringify(error)
    })
})

logoutCognitoButton.addEventListener('click', async () => {
    confirm("Cognitoログアウトしますか？")

    // Cognito のログアウト URL にリダイレクト
    const cognitoDomain = "https://ap-southeast-2zzohhtrgf.auth.ap-southeast-2.amazoncognito.com";
    const clientId = "3561nchukga9t8htp2cef30s8j";
    const logoutRedirectUri = "https://takuya-nakamura.github.io/portfolio/oidc/index.html";

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutRedirectUri)}`;

})

