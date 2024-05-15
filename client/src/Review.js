import { gql, useSubscription } from "@apollo/client";

import "./Review.css";

const REVIEW_SUBSCRIPTION = gql`
  subscription reviewAdded {
    reviewAdded {
      id
      body
      product {
        id
        name
        createdBy {
          name
        }
      }
    }
  }
`;

export function Review() {
  const { loading, data } = useSubscription(REVIEW_SUBSCRIPTION);
  return !loading && data ? (
    <div className="review">
      <p>Real-time customer testimonials:</p>
      <div className="review-body">{data.reviewAdded.body}</div>
      <div className="timestamp">
        <small>{new Date().toString()}</small>
      </div>
      <div className="customer">
        <em>
          -- Customer <strong>{data.reviewAdded.product.createdBy.name}</strong>{" "}
          had a blast with our{" "}
          <strong>{data.reviewAdded.product.name.toUpperCase()}</strong>!
        </em>
      </div>
    </div>
  ) : null;
}
