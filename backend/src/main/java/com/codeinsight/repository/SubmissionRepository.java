package com.codeinsight.repository;

import com.codeinsight.model.Submission;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SubmissionRepository extends MongoRepository<Submission, String> {
    List<Submission> findByUserIdOrderByCreatedAtDesc(String userId);
    long countByUserId(String userId);
}
