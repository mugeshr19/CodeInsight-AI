package com.codeinsight.controller;

import com.codeinsight.dto.*;
import com.codeinsight.model.Submission;
import com.codeinsight.service.AnalysisService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AnalysisController {
    
    private final AnalysisService analysisService;
    
    @PostMapping("/analyze")
    public ResponseEntity<ApiResponse<Submission>> analyzeCode(
            @Valid @RequestBody AnalyzeRequest request,
            Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        Submission submission = analysisService.analyzeCode(request, userId);
        return ResponseEntity.ok(ApiResponse.success("Analysis completed", submission));
    }
}
