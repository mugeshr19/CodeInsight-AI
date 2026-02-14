package com.codeinsight.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class AnalyzeRequest {
    @NotBlank(message = "Problem title is required")
    private String problemTitle;
    
    @NotBlank(message = "Problem description is required")
    private String problemDescription;
    
    @NotBlank(message = "Code is required")
    private String code;
    
    @NotBlank(message = "Language is required")
    private String language;
}
