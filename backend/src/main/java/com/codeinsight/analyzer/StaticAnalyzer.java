package com.codeinsight.analyzer;

import lombok.Data;
import org.springframework.stereotype.Component;
import java.util.*;
import java.util.regex.*;

@Component
public class StaticAnalyzer {
    
    @Data
    public static class AnalysisResult {
        private String estimatedTimeComplexity;
        private boolean hasNestedLoops;
        private boolean hasRecursion;
        private int loopDepth;
        private List<String> detectedPatterns = new ArrayList<>();
    }
    
    public AnalysisResult analyze(String code, String language) {
        AnalysisResult result = new AnalysisResult();
        
        code = removeComments(code, language);
        
        result.setLoopDepth(detectLoopDepth(code, language));
        result.setHasNestedLoops(result.getLoopDepth() > 1);
        result.setHasRecursion(detectRecursion(code, language));
        
        result.setEstimatedTimeComplexity(estimateComplexity(result));
        result.setDetectedPatterns(detectPatterns(code, result));
        
        return result;
    }
    
    private String removeComments(String code, String language) {
        if (language.equalsIgnoreCase("python")) {
            code = code.replaceAll("#.*", "");
            code = code.replaceAll("\"\"\"[\\s\\S]*?\"\"\"", "");
        } else {
            code = code.replaceAll("//.*", "");
            code = code.replaceAll("/\\*[\\s\\S]*?\\*/", "");
        }
        return code;
    }
    
    private int detectLoopDepth(String code, String language) {
        String loopPattern = getLoopPattern(language);
        Pattern pattern = Pattern.compile(loopPattern);
        
        int maxDepth = 0;
        int currentDepth = 0;
        
        String[] lines = code.split("\n");
        for (String line : lines) {
            if (pattern.matcher(line).find()) {
                currentDepth++;
                maxDepth = Math.max(maxDepth, currentDepth);
            }
            if (line.contains("}") || (language.equalsIgnoreCase("python") && 
                line.trim().isEmpty() && currentDepth > 0)) {
                currentDepth = Math.max(0, currentDepth - 1);
            }
        }
        
        return maxDepth;
    }
    
    private String getLoopPattern(String language) {
        if (language.equalsIgnoreCase("python")) {
            return "\\b(for|while)\\b";
        } else if (language.equalsIgnoreCase("java") || language.equalsIgnoreCase("c++")) {
            return "\\b(for|while|do)\\b.*\\(";
        }
        return "\\b(for|while)\\b";
    }
    
    private boolean detectRecursion(String code, String language) {
        Pattern functionPattern;
        if (language.equalsIgnoreCase("python")) {
            functionPattern = Pattern.compile("def\\s+(\\w+)\\s*\\(");
        } else {
            functionPattern = Pattern.compile("\\b(\\w+)\\s*\\([^)]*\\)\\s*\\{");
        }
        
        Matcher matcher = functionPattern.matcher(code);
        while (matcher.find()) {
            String functionName = matcher.group(1);
            int start = matcher.end();
            int braceCount = 1;
            int end = start;
            
            while (end < code.length() && braceCount > 0) {
                if (code.charAt(end) == '{') braceCount++;
                if (code.charAt(end) == '}') braceCount--;
                end++;
            }
            
            if (end < code.length()) {
                String functionBody = code.substring(start, end);
                if (functionBody.contains(functionName + "(")) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    private String estimateComplexity(AnalysisResult result) {
        if (result.isHasRecursion()) {
            return "O(2^n) - Exponential (Recursion detected)";
        }
        
        switch (result.getLoopDepth()) {
            case 0: return "O(1) - Constant";
            case 1: return "O(n) - Linear";
            case 2: return "O(n²) - Quadratic";
            case 3: return "O(n³) - Cubic";
            default: return "O(n^" + result.getLoopDepth() + ") - Polynomial";
        }
    }
    
    private List<String> detectPatterns(String code, AnalysisResult result) {
        List<String> patterns = new ArrayList<>();
        
        if (result.isHasNestedLoops()) {
            patterns.add("Nested loops detected");
        }
        if (result.isHasRecursion()) {
            patterns.add("Recursive function calls");
        }
        if (code.contains("sort") || code.contains("Sort")) {
            patterns.add("Sorting operation detected");
        }
        if (code.contains("[]") || code.contains("List") || code.contains("Array")) {
            patterns.add("Array/List usage");
        }
        
        return patterns;
    }
}
