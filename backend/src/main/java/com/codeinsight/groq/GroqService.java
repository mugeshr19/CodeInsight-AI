package com.codeinsight.groq;

import com.codeinsight.analyzer.StaticAnalyzer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroqService {
    
    @Value("${groq.api.key}")
    private String apiKey;
    
    @Value("${groq.api.url}")
    private String apiUrl;
    
    @Value("${groq.model}")
    private String model;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    @Data
    public static class GroqAnalysisResult {
        private String whyFailed;
        private List<String> weakConcepts;
        private String optimizationSuggestion;
        private String approachHint;
        private List<String> topicsToRevise;
    }
    
    public GroqAnalysisResult analyzeCode(String problem, String code, String language, 
                                          StaticAnalyzer.AnalysisResult staticAnalysis) {
        try {
            String prompt = buildPrompt(problem, code, language, staticAnalysis);
            String response = callGroqApi(prompt);
            return parseResponse(response);
        } catch (Exception e) {
            log.error("Error calling Groq API", e);
            return createFallbackResponse();
        }
    }
    
    private String buildPrompt(String problem, String code, String language, 
                               StaticAnalyzer.AnalysisResult staticAnalysis) {
        return String.format("""
            You are an expert Data Structures and Algorithms mentor.
            
            Problem:
            %s
            
            Student Code (%s):
            %s
            
            Static Analysis:
            - Estimated complexity: %s
            - Nested loops: %s
            - Recursion detected: %s
            - Detected patterns: %s
            
            Tasks:
            1. Explain why the code might fail or be inefficient
            2. Identify weak concepts the student needs to work on
            3. Suggest optimization approaches
            4. Give hint-based guidance (not full solution)
            5. List topics to revise
            
            Respond ONLY in valid JSON format:
            {
              "why_failed": "explanation here",
              "weak_concepts": ["concept1", "concept2"],
              "optimization_suggestion": "suggestion here",
              "approach_hint": "hint here",
              "topics_to_revise": ["topic1", "topic2"]
            }
            """, 
            problem, language, code, 
            staticAnalysis.getEstimatedTimeComplexity(),
            staticAnalysis.isHasNestedLoops(),
            staticAnalysis.isHasRecursion(),
            staticAnalysis.getDetectedPatterns()
        );
    }
    
    private String callGroqApi(String prompt) {
        try {
            WebClient webClient = WebClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
            
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", model);
            requestBody.put("temperature", 0.3);
            requestBody.put("max_tokens", 1000);
            
            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "user", "content", prompt));
            requestBody.put("messages", messages);
            
            log.info("Calling Groq API with model: {}", model);
            
            String response = webClient.post()
                .bodyValue(requestBody)
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                    clientResponse -> clientResponse.bodyToMono(String.class)
                        .map(body -> {
                            log.error("Groq API error: {}", body);
                            return new RuntimeException("Groq API error: " + body);
                        }))
                .bodyToMono(String.class)
                .block();
            
            log.info("Groq API response received");
            return response;
        } catch (Exception e) {
            log.error("Error calling Groq API: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to call Groq API", e);
        }
    }
    
    private GroqAnalysisResult parseResponse(String response) {
        try {
            JsonNode root = objectMapper.readTree(response);
            String content = root.path("choices").get(0).path("message").path("content").asText();
            
            content = content.replaceAll("```json\\s*", "").replaceAll("```\\s*$", "").trim();
            
            JsonNode analysisJson = objectMapper.readTree(content);
            
            GroqAnalysisResult result = new GroqAnalysisResult();
            result.setWhyFailed(analysisJson.path("why_failed").asText());
            result.setWeakConcepts(jsonArrayToList(analysisJson.path("weak_concepts")));
            result.setOptimizationSuggestion(analysisJson.path("optimization_suggestion").asText());
            result.setApproachHint(analysisJson.path("approach_hint").asText());
            result.setTopicsToRevise(jsonArrayToList(analysisJson.path("topics_to_revise")));
            
            return result;
        } catch (Exception e) {
            log.error("Error parsing Groq response", e);
            return createFallbackResponse();
        }
    }
    
    private List<String> jsonArrayToList(JsonNode arrayNode) {
        List<String> list = new ArrayList<>();
        if (arrayNode.isArray()) {
            arrayNode.forEach(node -> list.add(node.asText()));
        }
        return list;
    }
    
    private GroqAnalysisResult createFallbackResponse() {
        GroqAnalysisResult result = new GroqAnalysisResult();
        result.setWhyFailed("Unable to analyze at this moment. Please try again.");
        result.setWeakConcepts(Arrays.asList("Analysis pending"));
        result.setOptimizationSuggestion("Review your algorithm approach and time complexity.");
        result.setApproachHint("Consider edge cases and optimize nested operations.");
        result.setTopicsToRevise(Arrays.asList("Algorithm optimization", "Time complexity"));
        return result;
    }
}
