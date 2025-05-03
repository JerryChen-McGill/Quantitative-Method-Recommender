const decisionTree = {
    // 第一级选择
    "root": {
        question: "I deal with",
        options: [
            {
                text: "Only Continuous variables",
                next: "continuous-variables"
            },
            {
                text: "Only Categorical data",
                next: "Chi-square"
            },
            {
                text: "Categorical and Continuous variables",
                next: "mixed-variables"
            }
        ]
    },

    // 连续变量分支
    "continuous-variables": {
        question: "I want to",
        options: [
            {
                text: "Decide Variable Number",
                result: "Factor Analyses"
            },
            {
                text: "Measure Correlation",
                result: "Correlation"
            },
            {
                text: "Predict a variable",
                next: "Linear Regression"
            }
        ]
    },
    "Linear Regression": {
        question: "by",
        options: [
            {
                text: "Another variable",
                result: "Simple Linear Regression"
            },
            {
                text: "Multiple predictors",
                result: "Multiple Linear Regression"
            }
        ]
    },

    // 纯分类变量分支
    "Chi-square": {
        question: "I want to",
        options: [
            {
                text: "Compare distribution to the expected",
                result: "Chi-square goodness-of-fit test"
            },
            {
                text: "Test independence between variables",
                result: "Chi-square test of independence"
            }
        ]
    },

    // 混合变量分支
    "mixed-variables": {
        question: "I want to",
        options: [
            {
                text: "Find differences",
                next: "find-differences"
            },
            {
                text: "Predict Categorical Outcome",
                result: "Logistic Regression"
            }
        ]
    },

    // 差异分析分支
    "find-differences": {
        question: "Between",
        options: [
            {
                text: "2 Groups",
                next: "T-test"
            },
            {
                text: "More than two groups",
                next: "ANOVA"
            },
            {
                text: "Related/repeated measures",
                result: "Repeated-measures ANOVA"
            }
        ]
    },
    "T-test": {
        question: "Specifically:",
        options: [
            {
                text: "Sample vs Population",
                result: "One-sample t-test"
            },
            {
                text: "Two independent groups",
                result: "Independent-sample t-test"
            },
            {
                text: "Two related (paired) groups",
                result: "Related-sample t-test (Paired t-test)"
            }
        ]
    },
    "ANOVA": {
        question: "Specifically:",
        options: [
            {
                text: "Independent groups",
                result: "One-way ANOVA"
            },
            {
                text: "Independent groups with multiple factors",
                result: "Factorial ANOVA"
            },
            {
                text: "Independent groups adjusting for covariates",
                result: "ANCOVA"
            },
            {
                text: "for multiple dependent variables",
                result: "MANOVA"
            }
        ]
    }
};