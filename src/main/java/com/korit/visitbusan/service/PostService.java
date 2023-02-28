package com.korit.visitbusan.service;

import com.korit.visitbusan.entity.TourComment;
import com.korit.visitbusan.entity.TourMst;
import com.korit.visitbusan.entity.TourRating;
import com.korit.visitbusan.repository.PostRepository;
import com.korit.visitbusan.web.dto.PostRespDto;
import com.korit.visitbusan.web.dto.ReviewReqDto;
import com.korit.visitbusan.web.dto.TourReqDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    @Value("${file.path}")
    private String filePath;

    public PostRespDto getPostByTourId(int tourId) {
        TourMst tourMst = postRepository.getPost(tourId);
        PostRespDto postRespDto = new PostRespDto(tourMst.getTourId(),
                tourMst.getCategoryId(),
                tourMst.getTitle(),
                tourMst.getSubtitle(),
                tourMst.getContents(),
                tourMst.getMainImage(),
                tourMst.getSubtitle(),
                tourMst.getLat(),
                tourMst.getLon(),
                tourMst.getCreateDate(),
                tourMst.getTellNumber(),
                tourMst.getHomepageUrl(),
                tourMst.getHolidayInfo(),
                tourMst.getHandicappedArea(),
                tourMst.getUsageDayAndTime(),
                tourMst.getUsageAmount(),
                tourMst.getMainMenu(),
                tourMst.getTrafficInfo(),
                tourMst.getEtcInfo()
                );
        return postRespDto;
    }

    public List<String> registerPostImg(List<MultipartFile> files) {
        if(files.size() < 1) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("files", "이미지를 선택하세요.");

            throw new RuntimeException();
        }

        List<String> pathList = new ArrayList<String>();

        files.forEach(file -> {
            String originFileName = file.getOriginalFilename();
            String extension = originFileName.substring(originFileName.lastIndexOf("."));
            String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + extension;

            Path uploadPath = Paths.get(filePath + "post/" + tempFileName);
            pathList.add("post/" + tempFileName);

            File f = new File(filePath + "post/");
            if(!f.exists()) {
                f.mkdirs();
            }

            try {
                Files.write(uploadPath, file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        return pathList;
    }

    public void registerThumbnailImg(String tourId, List<MultipartFile> files) {
        if(files.size() < 1) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("files", "이미지를 선택하세요.");

            throw new RuntimeException();
        }

        List<String> pathList = new ArrayList<String>();

        files.forEach(file -> {
            String originFileName = file.getOriginalFilename();
            String extension = originFileName.substring(originFileName.lastIndexOf("."));
            String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + extension;

            Path uploadPath = Paths.get(filePath + "thumbnail/" + tempFileName);
            pathList.add("thumbnail/" + tempFileName);

            File f = new File(filePath + "thumbnail/");
            if(!f.exists()) {
                f.mkdirs();
            }

            try {
                Files.write(uploadPath, file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

        });

        postRepository.saveThumbnailImg(tourId, pathList.get(0));
    }

    public void registerMainImg(String tourId, List<MultipartFile> files) {
        if(files.size() < 1) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("files", "이미지를 선택하세요.");

            throw new RuntimeException();
        }

        List<String> pathList = new ArrayList<String>();

        files.forEach(file -> {
            String originFileName = file.getOriginalFilename();
            String extension = originFileName.substring(originFileName.lastIndexOf("."));
            String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + extension;

            Path uploadPath = Paths.get(filePath + "mainimage/" + tempFileName);
            pathList.add("mainimage/" + tempFileName);

            File f = new File(filePath + "mainimage/");
            if(!f.exists()) {
                f.mkdirs();
            }

            try {
                Files.write(uploadPath, file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

        });

        postRepository.saveMainImg(tourId, pathList.get(0));
    }

    public TourReqDto registerPost(TourReqDto tourReqDto) {
        postRepository.savePost(tourReqDto);

        return tourReqDto;
    }

    //-----------------------------Review 관련 기능--------------------------------

    public void registerReviewAndRating(ReviewReqDto reviewReqDto) {
        TourRating tourRating = TourRating.builder()
                .ratingId(0).tourId(reviewReqDto.getTourId())
                .userId(reviewReqDto.getUserId())
                .ratingCount(reviewReqDto.getRating()).build();

        postRepository.saveTourRating(tourRating);

        TourComment tourComment = TourComment.builder()
                .commentId(0)
                .tourId(reviewReqDto.getTourId())
                .userId(reviewReqDto.getUserId())
                .reviewComment(reviewReqDto.getReview()).build();

        postRepository.saveTourComment(tourComment);
    }

}
