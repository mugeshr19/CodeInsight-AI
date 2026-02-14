package com.codeinsight.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "submissions")
public class Submission {
    @Id
    private String id;
    private String userId;
    private String problemTitle;
    private String problemDescription;
    private String code;
    private String language;
    private String detectedComplexity;
    private List<String> weakConcepts;
    private String whyFailed;
    private String optimizationSuggestion;
    private String approachHint;
    private List<String> topicsToRevise;
    private LocalDateTime createdAt = LocalDateTime.now();
}
