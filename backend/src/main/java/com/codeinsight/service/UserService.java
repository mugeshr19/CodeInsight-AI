package com.codeinsight.service;

import com.codeinsight.model.Submission;
import com.codeinsight.model.User;
import com.codeinsight.repository.SubmissionRepository;
import com.codeinsight.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final SubmissionRepository submissionRepository;
    
    public List<Submission> getUserSubmissions(String userId) {
        return submissionRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    public Map<String, Object> getUserProfile(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Submission> submissions = submissionRepository.findByUserIdOrderByCreatedAtDesc(userId);
        
        Map<String, Object> profile = new HashMap<>();
        profile.put("name", user.getName());
        profile.put("email", user.getEmail());
        profile.put("totalSubmissions", submissions.size());
        profile.put("mostWeakTopic", getMostWeakTopic(submissions));
        profile.put("improvementScore", calculateImprovementScore(submissions));
        profile.put("weakTopicsDistribution", getWeakTopicsDistribution(submissions));
        
        return profile;
    }
    
    private String getMostWeakTopic(List<Submission> submissions) {
        Map<String, Long> topicCount = submissions.stream()
            .flatMap(s -> s.getWeakConcepts().stream())
            .collect(Collectors.groupingBy(t -> t, Collectors.counting()));
        
        return topicCount.isEmpty() ? "None" : 
            Collections.max(topicCount.entrySet(), Map.Entry.comparingByValue()).getKey();
    }
    
    private double calculateImprovementScore(List<Submission> submissions) {
        if (submissions.isEmpty()) return 0.0;
        
        long optimizedCount = submissions.stream()
            .filter(s -> s.getDetectedComplexity().contains("O(1)") || 
                        s.getDetectedComplexity().contains("O(n)"))
            .count();
        
        return (optimizedCount * 100.0) / submissions.size();
    }
    
    private Map<String, Long> getWeakTopicsDistribution(List<Submission> submissions) {
        return submissions.stream()
            .flatMap(s -> s.getWeakConcepts().stream())
            .collect(Collectors.groupingBy(t -> t, Collectors.counting()));
    }
}
