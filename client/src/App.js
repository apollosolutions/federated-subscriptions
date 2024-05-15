import { useState } from "react";

import { Review } from "./Review";
import { ReactComponent as Rocket } from "./rocket.svg";

import "./App.css";

export function App() {
  const [showReviews, setShowReviews] = useState(false);
  return (
    <div className="app">
      <h1>The Apollo Program</h1>
      <h2>Putting the rock in rocket since 1961!</h2>
      <Rocket />
      {showReviews ? (
        <button onClick={() => setShowReviews(false)}>Hide Reviews</button>
      ) : (
        <button onClick={() => setShowReviews(true)}>Show Reviews</button>
      )}
      {showReviews ? <Review /> : null}
    </div>
  );
}
