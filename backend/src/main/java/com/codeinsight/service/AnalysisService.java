package com.codeinsight.service;

import com.codeinsight.analyzer.StaticAnalyzer;
import com.codeinsight.dto.AnalyzeRequest;
import com.codeinsight.groq.GroqService;
import com.codeinsight.model.Submission;
import com.codeinsight.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnalysisService {
    
    private final StaticAnalyzer staticAnalyzer;
    private final GroqService groqService;
    private final SubmissionRepository submissionRepository;
    
    public Submission analyzeCode(AnalyzeRequest request, String userId) {
        StaticAnalyzer.AnalysisResult staticResult = 
            staticAnalyzer.analyze(request.getCode(), request.getLanguage());
        
        GroqService.GroqAnalysisResult groqResult = 
            groqService.analyzeCode(
                request.getProblemDescription(), 
                request.getCode(), 
                request.getLanguage(), 
                staticResult
            );
        
        Submission submission = new Submission();
        submission.setUserId(userId);
        submission.setProblemTitle(request.getProblemTitle());
        submission.setProblemDescription(request.getProblemDescription());
        submission.setCode(request.getCode());
        submission.setLanguage(request.getLanguage());
        submission.setDetectedComplexity(staticResult.getEstimatedTimeComplexity());
        submission.setWeakConcepts(groqResult.getWeakConcepts());
        submission.setWhyFailed(groqResult.getWhyFailed());
        submission.setOptimizationSuggestion(groqResult.getOptimizationSuggestion());
        submission.setApproachHint(groqResult.getApproachHint());
        submission.setTopicsToRevise(groqResult.getTopicsToRevise());
        
        return submissionRepository.save(submission);
    }
}
