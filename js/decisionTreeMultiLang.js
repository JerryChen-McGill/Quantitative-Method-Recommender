// 决策树 - 中英文对照版本
const decisionTreeMultiLang = {
    "root": {
        question: {
            en: "I Deal With",
            zh: "我处理的是"
        },
        options: [
            {
                text: {
                    en: "Only Continuous Variables",
                    zh: "仅连续变量"
                },
                next: "continuous-variables"
            },
            {
                text: {
                    en: "Only Categorical Data",
                    zh: "仅分类数据"
                },
                next: "Chi-square"
            },
            {
                text: {
                    en: "Categorical And Continuous Variables",
                    zh: "分类和连续变量"
                },
                next: "mixed-variables"
            }
        ]
    },

    // 连续变量分支
    "continuous-variables": {
        question: {
            en: "I Want To",
            zh: "我想要"
        },
        options: [
            {
                text: {
                    en: "Decide Variable Number / Reduce Dimensions",
                    zh: "确定变量数量/降维"
                },
                result: {
                    en: "Factor Analysis",
                    zh: "因子分析"
                }
            },
            {
                text: {
                    en: "Classify Individuals (Latent Classes)",
                    zh: "对个体分类（潜在类别）"
                },
                result: {
                    en: "Mixture Modeling (LPA)",
                    zh: "混合建模 (LPA)"
                }
            },
            {
                text: {
                    en: "Measure Correlation",
                    zh: "测量相关性"
                },
                result: {
                    en: "Correlation",
                    zh: "相关分析"
                }
            },
            {
                text: {
                    en: "Predict A Variable",
                    zh: "预测一个变量"
                },
                next: "Linear Regression"
            },
            {
                text: {
                    en: "Test Complex/Causal Models",
                    zh: "测试复杂/因果模型"
                },
                next: "Complex-Models"
            },
            {
                text: {
                    en: "Explain Mechanism (How/When)",
                    zh: "解释机制（如何/何时）"
                },
                next: "Mechanisms"
            }
        ]
    },
    "Linear Regression": {
        question: {
            en: "By",
            zh: "通过"
        },
        options: [
            {
                text: {
                    en: "Another Variable",
                    zh: "另一个变量"
                },
                result: {
                    en: "Simple Linear Regression",
                    zh: "简单线性回归"
                }
            },
            {
                text: {
                    en: "Multiple Predictors",
                    zh: "多个预测变量"
                },
                result: {
                    en: "Multiple Linear Regression",
                    zh: "多元线性回归"
                }
            }
        ]
    },
    "Complex-Models": {
        question: {
            en: "Using",
            zh: "使用"
        },
        options: [
            {
                text: {
                    en: "Only Observed Variables",
                    zh: "仅观测变量"
                },
                result: {
                    en: "Path Analysis",
                    zh: "路径分析"
                }
            },
            {
                text: {
                    en: "Latent Variables (Factors)",
                    zh: "潜在变量（因子）"
                },
                result: {
                    en: "Structural Equation Modeling(SEM)",
                    zh: "结构方程模型 (SEM)"
                }
            }
        ]
    },
    "Mechanisms": {
        question: {
            en: "Specifically",
            zh: "具体来说"
        },
        options: [
            {
                text: {
                    en: "Explain HOW X affects Y (Process)",
                    zh: "解释 X 如何影响 Y（过程）"
                },
                result: {
                    en: "Mediation",
                    zh: "中介分析"
                }
            },
            {
                text: {
                    en: "Explain WHEN X affects Y (Condition)",
                    zh: "解释 X 何时影响 Y（条件）"
                },
                result: {
                    en: "Moderation",
                    zh: "调节分析"
                }
            }
        ]
    },

    // 纯分类变量分支
    "Chi-square": {
        question: {
            en: "I Want To",
            zh: "我想要"
        },
        options: [
            {
                text: {
                    en: "Compare Distribution To The Expected",
                    zh: "比较分布与期望值"
                },
                result: {
                    en: "Chi-square Goodness-of-fit Test",
                    zh: "卡方拟合优度检验"
                }
            },
            {
                text: {
                    en: "Test Independence Between Variables",
                    zh: "检验变量间的独立性"
                },
                result: {
                    en: "Chi-square Test Of Independence",
                    zh: "卡方独立性检验"
                }
            }
        ]
    },

    // 混合变量分支
    "mixed-variables": {
        question: {
            en: "I Want To",
            zh: "我想要"
        },
        options: [
            {
                text: {
                    en: "Analyze Nested/Hierarchical Data",
                    zh: "分析嵌套/层级数据"
                },
                result: {
                    en: "Multilevel Modeling (MLM)",
                    zh: "多层线性模型 (MLM)"
                }
            },
            {
                text: {
                    en: "Find Differences",
                    zh: "发现差异"
                },
                next: "find-differences"
            },
            {
                text: {
                    en: "Predict Categorical Outcome",
                    zh: "预测分类结果"
                },
                result: {
                    en: "Logistic Regression",
                    zh: "逻辑回归"
                }
            }
        ]
    },

    // 差异分析分支
    "find-differences": {
        question: {
            en: "Between",
            zh: "在以下之间"
        },
        options: [
            {
                text: {
                    en: "2 Groups",
                    zh: "2 组"
                },
                next: "T-test"
            },
            {
                text: {
                    en: "More Than Two Groups",
                    zh: "超过两组"
                },
                next: "ANOVA"
            },
            {
                text: {
                    en: "Related/Repeated Measures",
                    zh: "相关/重复测量"
                },
                result: {
                    en: "Repeated-measures ANOVA",
                    zh: "重复测量方差分析"
                }
            }
        ]
    },
    "T-test": {
        question: {
            en: "Specifically:",
            zh: "具体来说："
        },
        options: [
            {
                text: {
                    en: "Sample Vs Population",
                    zh: "样本与总体"
                },
                result: {
                    en: "One-sample T-test",
                    zh: "单样本 T 检验"
                }
            },
            {
                text: {
                    en: "Two Independent Groups",
                    zh: "两个独立组"
                },
                result: {
                    en: "Independent-sample T-test",
                    zh: "独立样本 T 检验"
                }
            },
            {
                text: {
                    en: "Two Related (Paired) Groups",
                    zh: "两个相关（配对）组"
                },
                result: {
                    en: "Related-sample T-test (Paired T-test)",
                    zh: "配对样本 T 检验"
                }
            }
        ]
    },
    "ANOVA": {
        question: {
            en: "Specifically:",
            zh: "具体来说："
        },
        options: [
            {
                text: {
                    en: "Independent Groups",
                    zh: "独立组"
                },
                result: {
                    en: "One-way ANOVA",
                    zh: "单因素方差分析"
                }
            },
            {
                text: {
                    en: "Independent Groups With Multiple Factors",
                    zh: "具有多个因子的独立组"
                },
                result: {
                    en: "Factorial ANOVA",
                    zh: "析因方差分析"
                }
            },
            {
                text: {
                    en: "Independent Groups Adjusting For Covariates",
                    zh: "调整协变量的独立组"
                },
                result: {
                    en: "ANCOVA",
                    zh: "协方差分析"
                }
            },
            {
                text: {
                    en: "For Multiple Dependent Variables",
                    zh: "针对多个因变量"
                },
                result: {
                    en: "MANOVA",
                    zh: "多元方差分析"
                }
            }
        ]
    }
};

// UI 文本翻译
const uiTranslations = {
    title: {
        en: "Quantitative Method Hub",
        zh: "定量研究方法库"
    },
    reset: {
        en: "Reset",
        zh: "重置"
    },
    language: {
        en: "Language",
        zh: "语言"
    },
    selectPlaceholder: {
        en: "Please select...",
        zh: "请选择..."
    },
    continuousCategory: {
        en: "Continuous Variables Analysis",
        zh: "连续变量分析"
    },
    categoricalCategory: {
        en: "Categorical Data Analysis",
        zh: "分类数据分析"
    },
    mixedCategory: {
        en: "Mixed Variables Analysis",
        zh: "混合变量分析"
    }
};

