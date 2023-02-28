package com.korit.visitbusan.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class TourRating {

    private int ratingId;

    private int tourId;

    private int userId;

    private int ratingCount;
}
