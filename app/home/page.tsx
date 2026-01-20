"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const name = useMemo(() => user?.displayName || "there", [user]);

  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [loading, user, router]);

  async function handleLogout() {
    setLoggingOut(true);
    await signOut(auth);
    router.replace("/");
  }

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>
        Hey, {name}! You’re successfully logged in.
      </h1>

      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className={styles.logoutBtn}
      >
        {loggingOut ? "Logging out..." : "Logout"}
      </button>
    </main>
  );
}
