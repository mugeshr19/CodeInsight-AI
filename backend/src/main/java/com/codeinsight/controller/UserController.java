package com.codeinsight.controller;

import com.codeinsight.dto.ApiResponse;
import com.codeinsight.model.Submission;
import com.codeinsight.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/submissions/user/{userId}")
    public ResponseEntity<ApiResponse<List<Submission>>> getUserSubmissions(
            @PathVariable String userId,
            Authentication authentication) {
        String currentUserId = (String) authentication.getPrincipal();
        if (!currentUserId.equals(userId)) {
            return ResponseEntity.status(403).body(ApiResponse.error("Unauthorized access"));
        }
        
        List<Submission> submissions = userService.getUserSubmissions(userId);
        return ResponseEntity.ok(ApiResponse.success(submissions));
    }
    
    @GetMapping("/user/profile")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserProfile(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        Map<String, Object> profile = userService.getUserProfile(userId);
        return ResponseEntity.ok(ApiResponse.success(profile));
    }
}
