"use client";
import Image from "next/image";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="container">
      <div className="top-logo">top-logo</div>
      <form className="form">
        <p>Welcome, ep:stay</p>
        <input type="text" />
        <input type="text" />
        <button type="submit">Sign in</button>
      </form>

      <div className="bottom-logo">bottom-logo</div>
    </div>
  );
}
