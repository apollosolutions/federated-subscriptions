package com.example.javadgs;

import com.example.javadgs.types.Review;
import com.example.javadgs.types.Product;

import java.util.ArrayList;

public class ReviewRepository {
    private ArrayList<Review> reviews;

    public ReviewRepository() {
        reviews = new ArrayList<>();
        reviews.add(new Review(1, "Apollo may only be the 3rd US human spaceflight program, but my ride was 1st class!", new Product("p1")));
        reviews.add(new Review(2, "What a ride - we went up AND down! A++!", new Product("p2")));
        reviews.add(new Review(3, "Nobody beats Apollo when it comes to command and service modules - my time in lunar orbit is going to be hard to beat. Highly recommended!", new Product("p3")));
        reviews.add(new Review(4, "Thank you Apollo for a wonderful time, and even more wonderful photos - I got my best far side of the moon shots yet!", new Product("p4")));
    }

    public ArrayList<Review> getReviews() {
        return reviews;
    }
}
