const decisionTree = {
    // 第一级选择
    "root": {
        question: "I Deal With",
        options: [
            {
                text: "Only Continuous Variables",
                next: "continuous-variables"
            },
            {
                text: "Only Categorical Data",
                next: "Chi-square"
            },
            {
                text: "Categorical And Continuous Variables",
                next: "mixed-variables"
            }
        ]
    },

    // 连续变量分支
    "continuous-variables": {
        question: "I Want To",
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
                text: "Predict A Variable",
                next: "Linear Regression"
            }
        ]
    },
    "Linear Regression": {
        question: "By",
        options: [
            {
                text: "Another Variable",
                result: "Simple Linear Regression"
            },
            {
                text: "Multiple Predictors",
                result: "Multiple Linear Regression"
            }
        ]
    },

    // 纯分类变量分支
    "Chi-square": {
        question: "I Want To",
        options: [
            {
                text: "Compare Distribution To The Expected",
                result: "Chi-square Goodness-of-fit Test"
            },
            {
                text: "Test Independence Between Variables",
                result: "Chi-square Test Of Independence"
            }
        ]
    },

    // 混合变量分支
    "mixed-variables": {
        question: "I Want To",
        options: [
            {
                text: "Find Differences",
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
                text: "More Than Two Groups",
                next: "ANOVA"
            },
            {
                text: "Related/Repeated Measures",
                result: "Repeated-measures ANOVA"
            }
        ]
    },
    "T-test": {
        question: "Specifically:",
        options: [
            {
                text: "Sample Vs Population",
                result: "One-sample T-test"
            },
            {
                text: "Two Independent Groups",
                result: "Independent-sample T-test"
            },
            {
                text: "Two Related (Paired) Groups",
                result: "Related-sample T-test (Paired T-test)"
            }
        ]
    },
    "ANOVA": {
        question: "Specifically:",
        options: [
            {
                text: "Independent Groups",
                result: "One-way ANOVA"
            },
            {
                text: "Independent Groups With Multiple Factors",
                result: "Factorial ANOVA"
            },
            {
                text: "Independent Groups Adjusting For Covariates",
                result: "ANCOVA"
            },
            {
                text: "For Multiple Dependent Variables",
                result: "MANOVA"
            }
        ]
    }
};