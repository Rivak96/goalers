import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail 
} from 'firebase/auth'
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc,
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAPK_2q1fWziv8p9zM0LUERYOw9VG9_Hfc",
  authDomain: "mystorage-8afa5.firebaseapp.com",
  databaseURL: "https://mystorage-8afa5.firebaseio.com",
  projectId: "mystorage-8afa5",
  storageBucket: "mystorage-8afa5.firebasestorage.app",
  messagingSenderId: "138162225219",
  appId: "1:138162225219:web:71b347c042a4a0139dd4f6",
  measurementId: "G-XH05QZWNVT"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const userRef = doc(db, 'users', result.user.uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      // Create new user document
      await setDoc(userRef, {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      })
      return { user: result.user, isNewUser: true }
    }

    // Update last login for existing users
    await updateDoc(userRef, {
      lastLogin: serverTimestamp()
    })

    return { user: result.user, isNewUser: false }
  } catch (error) {
    console.error('Google sign in error:', error)
    throw error
  }
}

// Email Password Sign In
export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    await updateDoc(doc(db, 'users', result.user.uid), {
      lastLogin: serverTimestamp()
    })
    return result.user
  } catch (error) {
    console.error('Email sign in error:', error)
    throw error
  }
}

// Register new user
export const registerUser = async (email, password, userData) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      email: result.user.email,
      ...userData,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    })
    return result.user
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

// Password Reset
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error('Password reset error:', error)
    throw error
  }
}

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const userSnap = await getDoc(doc(db, 'users', userId))
    if (userSnap.exists()) {
      return userSnap.data()
    }
    return null
  } catch (error) {
    console.error('Get user profile error:', error)
    throw error
  }
}

// Update user profile
export const updateUserProfile = async (userId, data) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...data,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser
}

export { auth, db }