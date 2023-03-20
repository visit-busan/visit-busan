package com.korit.visitbusan.service;

import com.korit.visitbusan.entity.*;
import com.korit.visitbusan.exception.CustomUnknownPostException;
import com.korit.visitbusan.repository.PostRepository;
import com.korit.visitbusan.web.dto.*;
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
import java.time.LocalDateTime;
import java.util.*;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 CRUD를 위한 Service
 *  작성일 : 2023.03.06
 *******************************************/
@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    @Value("${file.path}")
    private String filePath;

    //tourId로 게시글 Read ----------------------------------------------------------
    public PostRespDto getPostByTourId(int tourId) {
        TourMst tourMst = postRepository.getPost(tourId);
        if(tourMst == null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("UnknownPost", "게시글Id를 확인해주세요");
            throw new CustomUnknownPostException(errorMap);
        }

        PostRespDto postRespDto = new PostRespDto(tourMst.getTourId(),
                tourMst.getCategoryId(),
                tourMst.getUserId(),
                tourMst.getTitle(),
                tourMst.getSubtitle(),
                tourMst.getContents(),
                tourMst.getMainImage(),
                tourMst.getThumbnailImage(),
                tourMst.getViewCount(),
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
                tourMst.getEtcInfo(),
                tourMst.getRating()
                );
        return postRespDto;
    }

    //게시글 Create ---------------------------------------------------------------
    public TourReqDto registerTourMst(TourReqDto tourReqDto) {
        postRepository.savePost(tourReqDto);
        postRepository.saveTourUsage(tourReqDto);
        return tourReqDto;
    }

    //게시글 Delete ---------------------------------------------------------------
    public int deletePost(int tourId) {

        return postRepository.deletePost(tourId) + postRepository.deleteTourUsage(tourId);
    }

    //게시글 이미지 Create ---------------------------------------------------------
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

    //게시글 썸네일 Create --------------------------------------------------------
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

    public void registerThumbnailImgWithLink(String tourId,String thumbnailLink) {
        postRepository.saveThumbnailImg(tourId, thumbnailLink);
    }

    //게시글 메인이미지 Create ------------------------------------------------------
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

    public void registerMainImgWithLink(String tourId, String mainImgLink) {
        postRepository.saveMainImg(tourId, mainImgLink);
    }

    //게시글 Update --------------------------------------------------------------

    public int updatePost(TourReqDto tourReqDto) {
       if(postRepository.getTourIdByTourId(tourReqDto.getTourId()) == null) {
           Map<String,String> errorMap = new HashMap<String,String>();
           errorMap.put("tourId", "존재하지 않는 tourId입니다.");
           throw new CustomUnknownPostException(errorMap);
       }

       return postRepository.updateTourMst(tourReqDto) + postRepository.updateTourUsage(tourReqDto);
    }

    //게시글 메인이미지 Delete -----------------------------------------------------
    public void deleteMainImg(String tourId) {
        String mainImg = postRepository.getMainImgByTourId(tourId);
        if(mainImg == null) {
            return;
        }
        if(!mainImg.contains("http")) {
            File file = new File(filePath + mainImg);
            if(file.exists()) {
                file.delete();
                System.out.println(filePath + mainImg + "삭제 완료!");
            } else {
                System.out.println("해당하는 mainImg 파일이 경로에 없습니다!");
            }
        } else {
            System.out.println("링크형식의 mainImg 파일입니다.");
        }
    }

    //게시글 썸네일이미지 Delete ----------------------------------------------------
    public void deleteThumbnail(String tourId) {
        String thumbnail = postRepository.getThumbnailByTourId(tourId);
        if(thumbnail == null) {
            return;
        }
        if(!thumbnail.contains("http")) {
            File file = new File(filePath + thumbnail);
            if(file.exists()) {
                file.delete();
                System.out.println(filePath + thumbnail + "삭제 완료!");
            }else {
                System.out.println("해당하는 thumbnail 파일이 경로에 없습니다!");
            }
        } else {
            System.out.println("링크형식의 thumbnail 파일입니다.");
        }
    }

    //게시글 조회수 Read ----------------------------------------------------------
    public int getPostViewCount(int tourId) {
        return postRepository.getPostViewCount(tourId);
    }

    //게시글 조회수 Create --------------------------------------------------------
    public int updateViewCount(int tourId) {
        return postRepository.updateViewCount(tourId);
    }

    //리뷰 Read -----------------------------------------------------------------
    public List<ReviewRespDto> getReviewList(int tourId) {
        return postRepository.getReviewList(tourId);
    }

    //리뷰 Create ---------------------------------------------------------------
    public int registerReviewAndRating(int tourId, ReviewReqDto reviewReqDto) {
        CommentMst commentMst = CommentMst.builder()
                .commentId(0)
                .userId(reviewReqDto.getUserId())
                .tourId(tourId)
                .visit(reviewReqDto.getVisitStatus())
                .reviewComment(reviewReqDto.getReviewContent())
                .rating(reviewReqDto.getRating())
                .createDate(LocalDateTime.now())
                .build();


        postRepository.saveTourComment(commentMst);
        return commentMst.getCommentId();
    }

    public void registerReviewImages(int commentId, List<MultipartFile> files) {
        if(files.size() < 1) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("files", "이미지를 선택하세요.");

            throw new RuntimeException();
        }

        List<CommentDtl> commentDtls = new ArrayList<CommentDtl>();

        files.forEach(file -> {
            String originFileName = file.getOriginalFilename();
            String extension = originFileName.substring(originFileName.lastIndexOf("."));
            String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + extension;

            Path uploadPath = Paths.get(filePath + "review/" + tempFileName);

            File f = new File(filePath + "review/");
            if(!f.exists()) {
                f.mkdirs();
            }

            try {
                Files.write(uploadPath, file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            CommentDtl commentDtl = CommentDtl.builder()
                            .commentDtlId(0)
                            .commentId(commentId)
                            .saveName(tempFileName)
                            .originName(originFileName)
                            .build();

            commentDtls.add(commentDtl);
        });
        postRepository.saveCommentDtl(commentDtls);
    }

    //리뷰 Delete ---------------------------------------------------------------
    public String deleteReviewAndImages(DeleteReviewDto deleteReviewDto) {
        if(postRepository.exitReviewCheckByCommentIdAndUserId(deleteReviewDto) != 1) {
            Map<String, String>errorMap = new HashMap<String, String>();
            errorMap.put("commentId", "해당하는 Review가 없습니다.");

            throw new CustomUnknownPostException(errorMap);
        }

        List<String> reviewImagePaths = postRepository.getReviewImagePaths(deleteReviewDto.getReviewId());

        reviewImagePaths.forEach(path -> {
           File file = new File(filePath + "review/" + path);
           if(file.exists()) {
               file.delete();
               System.out.println(file + "삭제완료");
           }else {
               System.out.println("해당하는 reviewImage 파일이 경로에 없습니다!");
           }
        });

        postRepository.deleteReview(deleteReviewDto.getReviewId());
        postRepository.deleteReviewImages(deleteReviewDto.getReviewId());

        return "삭제완료";
    }

    //카테고리 Get ---------------------------------------------------------------
    public List<CategoryMst> getCategoryList() {
        return postRepository.getCategoryList();
    }

    //태그 Get ------------------------------------------------------------------
    public List<TourTag> getTourTagList(int categoryId) {
        return postRepository.getTourTagList(categoryId);
    }

    //게시글의 태그 Get ----------------------------------------------------------
    public List<Integer> getPostTag(int tourId) { return postRepository.getPostTag(tourId); }

    //태그 Create ---------------------------------------------------------------
    public void registerTourTag(int tourId,TagReqDto tagReqDto) {

        List<TagDtl> tagDtls = new ArrayList<TagDtl>();

        tagReqDto.getTagList().forEach(tag -> {
            TagDtl tagDtl = new TagDtl(tourId, tag);
            tagDtls.add(tagDtl);
        });

        postRepository.registerTagDtl(tagDtls);
    }

    //태그 Delete ---------------------------------------------------------------
    public int deleteTagDtl(int tourId) {
        return postRepository.deleteTagDtl(tourId);
    }

    //게시글 좋아요 개수 Get -------------------------------------------------------
    public int getLikeCount(int tourId) {
        return postRepository.getLikeCount(tourId);
    }

    //게시글 좋아요 여부 Get -------------------------------------------------------
    public boolean isLike(LikeReqDto likeReqDto) {
        int isLike = postRepository.isLike(likeReqDto);
        System.out.println("isLike = " + isLike);
        if(isLike > 0) {
            return true;
        } else {
            return false;
        }
    }

    //게시글 좋아요 Create --------------------------------------------------------
    public int registerLike(LikeReqDto likeReqDto) {
        return postRepository.registerLike(likeReqDto);
    }

    //게시글 좋아요 Delete --------------------------------------------------------
    public int deleteLike(LikeReqDto likeReqDto) {
        return postRepository.deleteLike(likeReqDto);
    }
}
