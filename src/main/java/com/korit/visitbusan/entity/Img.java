package com.korit.visitbusan.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Img {
        private int imageId;
        private String tourId;
        private String saveName;
        private String originName;
}
