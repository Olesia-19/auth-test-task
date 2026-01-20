"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  reload,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";

function firebaseErrorToMessage(code: string) {
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function AuthPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const isSignup = mode === "signup";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (!email || !password) return false;
    if (isSignup && !fullName.trim()) return false;
    if (password.length < 6) return false;
    return true;
  }, [email, password, isSignup, fullName]);

  useEffect(() => {
    if (!loading && user) router.replace("/home");
  }, [loading, user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      if (isSignup) {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await updateProfile(cred.user, { displayName: fullName.trim() });
        await reload(cred.user);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.replace("/home");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(firebaseErrorToMessage(err.code));
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Babylon Auth Task</h1>

      <div className={styles.tabs}>
        <button
          type="button"
          onClick={() => setMode("login")}
          disabled={submitting}
          className={`${styles.tabBtn} ${mode === "login" ? styles.activeTab : ""}`}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          disabled={submitting}
          className={`${styles.tabBtn} ${mode === "signup" ? styles.activeTab : ""}`}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {isSignup && (
          <label className={styles.label}>
            Full Name
            <input
              className={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
        )}

        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type="password"
            value={password}
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className={styles.hint}>At least 6 characters</span>
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className={styles.submitBtn}
        >
          {submitting
            ? "Please wait..."
            : isSignup
              ? "Create account"
              : "Log in"}
        </button>
      </form>
    </main>
  );
}
