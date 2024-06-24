package com.example.javadgs.types;

public class Review {
    private final int id;
    private final String body;
    private final Product product;

    public Review(int id, String body, Product product) {
        this.id = id;
        this.body = body;
        this.product = product;
    }

    public int getId() {
        return id;
    }

    public String getBody() {
        return body;
    }

    public Product getProduct() {
        return product;
    }
}
