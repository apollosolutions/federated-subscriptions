package com.example.javadgs;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsSubscription;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;
import com.example.javadgs.types.Review;
import com.example.javadgs.types.Product;
import com.example.javadgs.ReviewRepository;

import java.util.ArrayList;
import java.time.Duration;


@DgsComponent
public class SubscriptionDataFetcher {
    ReviewRepository reviewRepository = new ReviewRepository();
    ArrayList<Review> reviews = reviewRepository.getReviews();

    @DgsSubscription
    public Publisher<Review> reviewAdded() {
        return Flux.interval(
            Duration.ofSeconds(1), // delay,
            Duration.ofSeconds(3) // interval
        ).map(
            i -> reviews.get(i.intValue() % reviews.size())
        );
    }
}
