package com.example.javadgs;

import com.example.javadgs.types.Review;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import reactor.test.StepVerifier;
import java.util.function.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.javadgs.ReviewRepository;

import java.time.Duration;
import java.util.ArrayList;

@SpringBootTest(classes = {SubscriptionDataFetcher.class})
class SubscriptionDataFetcherTest {

	@Autowired
	SubscriptionDataFetcher subscriptionDataFetcher;

	@Test
	void testReviewAdded() {
		ArrayList<Review> reviews = new ReviewRepository().getReviews();
		// Create a test subscriber using StepVerifier
		StepVerifier.withVirtualTime(() -> subscriptionDataFetcher.reviewAdded())
				.thenAwait(Duration.ofSeconds(1)) // wait for the initial delay
				.expectNextMatches(reviewMatchesBody(reviews.get(0))) // expect the first item
				.thenAwait(Duration.ofSeconds(3)) // wait for the interval
				.expectNextMatches(reviewMatchesBody(reviews.get(1))) // expect the second item
				.thenAwait(Duration.ofSeconds(3)) // wait for the interval
				.expectNextMatches(reviewMatchesBody(reviews.get(2))) // expect the third item
				.thenAwait(Duration.ofSeconds(3)) // wait for the interval
				.expectNextMatches(reviewMatchesBody(reviews.get(3))) // expect the fourth item
				.thenCancel() // cancel the subscription
				.verify(); // verify the expectations
	}

	private Predicate<Review> reviewMatchesBody(Review expectedReview) {
	    return actualReview -> actualReview.getBody().equals(expectedReview.getBody());
	}
}
