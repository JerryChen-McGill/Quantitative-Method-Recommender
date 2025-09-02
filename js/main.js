document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const methodsContainer = document.getElementById('methods-container');
    const restartBtn = document.getElementById('restart-btn');

    let currentPath = [];
    let pathCache = new Map(); // 新增：缓存策略

    // 新增：深度优先搜索算法 - 查找方法对应的路径
    function findPathToMethod(targetMethod, node = decisionTree.root, currentPath = []) {
        if (!node || !node.options) return null;
        
        for (let option of node.options) {
            const newPath = [...currentPath, {
                question: node.question,
                answer: option.text,
                nodeId: option.next || 'result'
            }];
            
            // 如果找到目标方法
            if (option.result === targetMethod) {
                return newPath;
            }
            
            // 如果有下一个节点，继续搜索
            if (option.next) {
                const result = findPathToMethod(targetMethod, decisionTree[option.next], newPath);
                if (result) return result;
            }
        }
        
        return null;
    }

    // 新增：获取方法路径（带缓存）
    function getMethodPath(methodName) {
        if (pathCache.has(methodName)) {
            return pathCache.get(methodName);
        }
        
        const path = findPathToMethod(methodName);
        if (path) {
            pathCache.set(methodName, path);
        }
        return path;
    }

    // 新增：显示方法对应的决策路径
    function showMethodPath(methodName) {
        const path = getMethodPath(methodName);
        if (!path) {
            console.warn(`No path found for method: ${methodName}`);
            return;
        }

        // 清空当前问题容器
        questionContainer.innerHTML = '';
        
        // 显示路径中的每个选择 - 改为下拉框形式
        path.forEach((step, index) => {
            // 找到对应的决策树节点
            let node;
            if (index === 0) {
                node = decisionTree.root;
            } else {
                // 根据前一个选择找到当前节点
                const prevStep = path[index - 1];
                // 需要从根节点开始重新计算路径到当前节点
                let currentNode = decisionTree.root;
                for (let j = 0; j < index; j++) {
                    const currentStep = path[j];
                    const option = currentNode.options.find(opt => opt.text === currentStep.answer);
                    if (option && option.next) {
                        currentNode = decisionTree[option.next];
                    } else {
                        break;
                    }
                }
                node = currentNode;
            }
            
            if (node) {
                // 创建下拉框，预设为路径中的选择
                const selectWrapper = document.createElement('div');
                selectWrapper.className = 'select-wrapper';

                const label = document.createElement('div');
                label.className = 'select-label';
                label.textContent = node.question;

                const select = document.createElement('select');
                select.innerHTML = '<option value="" selected disabled>请选择...</option>';

                const options = node.options;
                
                // 添加选项，并预设当前路径的选择
                options.forEach(option => {
                    const optionEl = document.createElement('option');
                    optionEl.value = option.next || option.result || '';
                    optionEl.textContent = option.text;
                    optionEl.dataset.next = option.next || '';
                    optionEl.dataset.result = option.result || '';
                    
                    // 如果是当前路径中的选择，设为选中状态
                    if (option.text === step.answer) {
                        optionEl.selected = true;
                    }
                    
                    select.appendChild(optionEl);
                });

                // 添加事件监听器 - 直接使用正向模式的处理逻辑
                select.addEventListener('change', handleSelectChange);

                selectWrapper.appendChild(label);
                selectWrapper.appendChild(select);
                questionContainer.appendChild(selectWrapper);
            }
        });

        // 高亮显示对应的方法
        highlightMethod(methodName);
    }

    // 新增：高亮显示方法
    function highlightMethod(methodName) {
        const methodItems = document.querySelectorAll('.method-item');
        methodItems.forEach(item => {
            if (item.dataset.method === methodName) {
                item.classList.add('recommended');
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
                item.classList.remove('recommended');
            }
        });
    }

    // 新增：返回初始状态
    function returnToInitialState() {
        // 清空问题容器
        questionContainer.innerHTML = '';
        
        // 重置所有方法显示
        resetMethods();
        
        // 重新显示第一个问题
        displayQuestion(decisionTree["root"]);
        
        // 更新状态
        currentPath = [];
    }

    // 显示问题
    function displayQuestion(node) {
        // 创建选择包装器
        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper';

        // 创建标签
        const label = document.createElement('div');
        label.className = 'select-label';
        label.textContent = node.question;

        // 创建下拉列表
        const select = document.createElement('select');
        select.innerHTML = '<option value="" selected disabled>请选择...</option>';

        const options = node.options;

        // 添加选项
        options.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = option.next || option.result || '';
            optionEl.textContent = option.text;
    optionEl.dataset.next = option.next || '';
            optionEl.dataset.result = option.result || '';
            select.appendChild(optionEl);
        });

        // 添加事件监听器
        select.addEventListener('change', handleSelectChange);
        
        // 添加工具提示功能
        select.title = select.options[select.selectedIndex]?.textContent || '';

        // 组装下拉列表
        selectWrapper.appendChild(label);
        selectWrapper.appendChild(select);
        questionContainer.appendChild(selectWrapper);
    }

    // 处理选择变化
    function handleSelectChange(e) {
        const select = e.target;
        const selectedOption = select.options[select.selectedIndex];

        if (!selectedOption.value) return;

        // 更新工具提示
        select.title = selectedOption.textContent;

        // 找出当前选择的下拉列表在所有下拉列表中的索引
        const currentIndex = Array.from(questionContainer.children).indexOf(select.parentElement);
        
        // 移除此下拉列表之后的所有下拉列表
        while (questionContainer.children.length > currentIndex + 1) {
            questionContainer.removeChild(questionContainer.lastChild);
        }
        
        // 更新路径 - 截断到当前选择
        currentPath = currentPath.slice(0, currentIndex);
        currentPath.push(selectedOption.textContent);

        if (selectedOption.dataset.result) {
            // 显示结果
    showResult(selectedOption.dataset.result);
        } else if (selectedOption.dataset.next) {
            // 进入下一个问题
            const nextNode = decisionTree[selectedOption.dataset.next];
            if (nextNode) {
                // 检查下一个节点是否是最终节点（只有一个选项且该选项有结果）
                if (nextNode.options.length === 1 && nextNode.options[0].result) {
                    // 直接显示结果
                    currentPath.push(nextNode.options[0].text);
                    showResult(nextNode.options[0].result);
                } else {
            // 显示下一个问题
                    displayQuestion(nextNode);
                }
            }
        }

        // 根据当前选择筛选方法
        if (!selectedOption.dataset.result) {
            // 重置所有方法显示，然后根据当前路径重新筛选
            resetMethods();
        filterMethods(selectedOption);
        }
    }

    // 筛选方法
    function filterMethods(selectedOption) {
        const methodItems = document.querySelectorAll('.method-item');
        const selectedText = selectedOption.textContent;
        const selectedValue = selectedOption.value;

        methodItems.forEach(item => {
            // 根据选择的内容决定是否隐藏该方法
            if (shouldHideMethod(item, selectedText, selectedValue)) {
                item.classList.add('hidden');
            } else {
                item.classList.remove('hidden');
            }
        });
    }

    // 判断是否应该隐藏方法
    function shouldHideMethod(methodItem, selectedText, selectedValue) {
        const method = methodItem.dataset.method;
        
        // 基于当前路径精确匹配决策树
        // 获取当前路径中的所有选择
        const currentSelections = [...currentPath];
        
        // 根据当前路径确定应该显示哪些方法
        const allowedMethods = getMethodsForCurrentPath(currentSelections, selectedValue);
        
        // 如果当前方法不在允许的方法列表中，则隐藏
        return !allowedMethods.includes(method);
    }
    
    // 根据当前路径获取应该显示的方法列表
    function getMethodsForCurrentPath(pathSelections, currentValue) {
        // 如果当前选择有直接结果，返回该结果
        if (currentValue && !currentValue.includes('-') && !currentValue.includes(' ')) {
            // 检查是否是最终节点
            const currentNode = decisionTree[currentValue];
            if (currentNode && currentNode.options) {
                const results = currentNode.options
                    .filter(option => option.result)
                    .map(option => option.result);
                if (results.length > 0) {
                    return results;
                }
            }
        }
        
        // 特殊处理：如果当前值是 "T-test"，返回 t-test 相关方法
        if (currentValue === "T-test") {
            return ['One-sample T-test', 'Independent-sample T-test', 'Related-sample T-test (Paired T-test)'];
        }
        
        // 特殊处理：如果当前值是 "ANOVA"，返回 ANOVA 相关方法
        if (currentValue === "ANOVA") {
            return ['One-way ANOVA', 'Factorial ANOVA', 'ANCOVA', 'MANOVA'];
        }
        
        // 根据路径长度和选择内容进行精确匹配
        if (pathSelections.length === 1) {
            // 第一层选择
            const firstChoice = pathSelections[0];
            if (firstChoice === "Only Continuous Variables") {
                return ['Correlation', 'Factor Analyses', 'Simple Linear Regression', 'Multiple Linear Regression'];
            } else if (firstChoice === "Only Categorical Data") {
                return ['Chi-square Goodness-of-fit Test', 'Chi-square Test Of Independence'];
            } else if (firstChoice === "Categorical And Continuous Variables") {
                return ['Logistic Regression', 'One-sample T-test', 'Independent-sample T-test', 'Related-sample T-test (Paired T-test)', 
                       'One-way ANOVA', 'Factorial ANOVA', 'ANCOVA', 'MANOVA', 'Repeated-measures ANOVA'];
            }
        } else if (pathSelections.length === 2) {
            // 第二层选择
            const firstChoice = pathSelections[0];
            const secondChoice = pathSelections[1];
            
            if (firstChoice === "Only Continuous Variables") {
                if (secondChoice === "Decide Variable Number") {
                    return ['Factor Analyses'];
                } else if (secondChoice === "Measure Correlation") {
                    return ['Correlation'];
                } else if (secondChoice === "Predict A Variable") {
                    return ['Simple Linear Regression', 'Multiple Linear Regression'];
                }
            } else if (firstChoice === "Only Categorical Data") {
                if (secondChoice === "Compare Distribution To The Expected") {
                    return ['Chi-square Goodness-of-fit Test'];
                } else if (secondChoice === "Test Independence Between Variables") {
                    return ['Chi-square Test Of Independence'];
                }
            } else if (firstChoice === "Categorical And Continuous Variables") {
                if (secondChoice === "Find Differences") {
                    return ['One-sample T-test', 'Independent-sample T-test', 'Related-sample T-test (Paired T-test)', 
                           'One-way ANOVA', 'Factorial ANOVA', 'ANCOVA', 'MANOVA', 'Repeated-measures ANOVA'];
                } else if (secondChoice === "Predict Categorical Outcome") {
                    return ['Logistic Regression'];
                }
            }
        } else if (pathSelections.length === 3) {
            // 第三层选择
            const firstChoice = pathSelections[0];
            const secondChoice = pathSelections[1];
            const thirdChoice = pathSelections[2];
            
            if (firstChoice === "Categorical And Continuous Variables" && secondChoice === "Find Differences") {
                if (thirdChoice === "2 Groups") {
                    return ['One-sample T-test', 'Independent-sample T-test', 'Related-sample T-test (Paired T-test)'];
                } else if (thirdChoice === "More Than Two Groups") {
                    return ['One-way ANOVA', 'Factorial ANOVA', 'ANCOVA', 'MANOVA'];
                } else if (thirdChoice === "Related/Repeated Measures") {
                    return ['Repeated-measures ANOVA'];
                }
            } else if (firstChoice === "Only Continuous Variables" && secondChoice === "Predict A Variable") {
                if (thirdChoice === "Another Variable") {
                    return ['Simple Linear Regression'];
                } else if (thirdChoice === "Multiple Predictors") {
                    return ['Multiple Linear Regression'];
                }
            }
        } else if (pathSelections.length === 4) {
            // 第四层选择
            const firstChoice = pathSelections[0];
            const secondChoice = pathSelections[1];
            const thirdChoice = pathSelections[2];
            const fourthChoice = pathSelections[3];
            
            if (firstChoice === "Categorical And Continuous Variables" && secondChoice === "Find Differences") {
                if (thirdChoice === "2 Groups") {
                    if (fourthChoice === "Sample Vs Population") {
                        return ['One-sample T-test'];
                    } else if (fourthChoice === "Two Independent Groups") {
                        return ['Independent-sample T-test'];
                    } else if (fourthChoice === "Two Related (Paired) Groups") {
                        return ['Related-sample T-test (Paired T-test)'];
                    }
                } else if (thirdChoice === "More Than Two Groups") {
                    if (fourthChoice === "Independent Groups") {
                        return ['One-way ANOVA'];
                    } else if (fourthChoice === "Independent Groups With Multiple Factors") {
                        return ['Factorial ANOVA'];
                    } else if (fourthChoice === "Independent Groups Adjusting For Covariates") {
                        return ['ANCOVA'];
                    } else if (fourthChoice === "For Multiple Dependent Variables") {
                        return ['MANOVA'];
                    }
                }
            }
        }
        
        // 如果没有匹配的路径，返回空数组（隐藏所有方法）
        return [];
    }

    // 显示结果
    function showResult(result) {
        const methodItems = document.querySelectorAll('.method-item');
        let foundRecommended = false;
        
        // 首先隐藏所有方法
        methodItems.forEach(item => {
            item.classList.add('hidden');
            item.classList.remove('recommended');
        });
        
        // 然后只显示推荐的方法
        methodItems.forEach(item => {
            if (item.dataset.method === result) {
                item.classList.add('recommended');
                item.classList.remove('hidden');
                foundRecommended = true;
            }
        });

        // 如果没有找到完全匹配的，尝试部分匹配（兼容数据中可能的不一致）
        if (!foundRecommended) {
            methodItems.forEach(item => {
                if (item.dataset.method.includes(result) || result.includes(item.dataset.method)) {
                    item.classList.add('recommended');
                    item.classList.remove('hidden');
                }
            });
        }
    }

    // 重置所有方法显示
    function resetMethods() {
        const methodItems = document.querySelectorAll('.method-item');
        methodItems.forEach(item => {
            item.classList.remove('hidden', 'recommended');
        });
    }

    // 重启决策树
    restartBtn.addEventListener('click', () => {
        returnToInitialState();
    });

    // 初始化决策树
    function initDecisionTree() {
        // 清空容器
        questionContainer.innerHTML = '';
        
        // 重置路径
        currentPath = [];

        // 重置所有方法显示
        resetMethods();

        // 显示第一个问题
        displayQuestion(decisionTree["root"]);
    }

    // 从决策树中提取所有统计方法
    function extractMethodsFromDecisionTree() {
        // 创建方法集合，用于存储所有唯一的方法
        const methods = {
            continuous: new Set(),
            categorical: new Set(),
            mixed: new Set()
        };
        
        // 递归函数，用于遍历决策树并提取所有方法
        function traverseTree(node) {
            if (!node || !node.options) return;
            
            node.options.forEach(option => {
                if (option.result) {
                    // 根据路径确定方法类别
                    let category;
                    if (option.result.includes('Chi-square')) {
                        category = 'categorical';
                    } else if (option.result.includes('Linear Regression') || 
                             option.result === 'Correlation' || 
                             option.result === 'Factor Analyses') {
                        category = 'continuous';
                    } else {
                        category = 'mixed';
                    }
                    
                    // 添加到对应的集合中
                    methods[category].add(option.result);
                }
                
                // 如果有下一个节点，继续遍历
                if (option.next) {
                    traverseTree(decisionTree[option.next]);
                }
            });
        }
        
        // 从根节点开始遍历
        traverseTree(decisionTree.root);
        
        return methods;
    }

    // 生成统计方法列表
    function generateMethodsList() {
        // 提取所有方法
        const methods = extractMethodsFromDecisionTree();
        
        // 清空方法容器
        methodsContainer.innerHTML = '';
        
        // 创建连续变量分析类别
        const continuousCategory = document.createElement('div');
        continuousCategory.className = 'method-category';
        continuousCategory.innerHTML = '<h2>Continuous Variables Analysis</h2>';
        
        const continuousGroup = document.createElement('div');
        continuousGroup.className = 'method-group';
        
        methods.continuous.forEach(method => {
            const methodItem = document.createElement('div');
            methodItem.className = 'method-item';
            methodItem.dataset.category = 'continuous';
            methodItem.dataset.method = method;
            methodItem.textContent = method;
            
            // 新增：添加点击事件
            methodItem.addEventListener('click', () => {
                showMethodPath(method);
            });
            
            continuousGroup.appendChild(methodItem);
        });
        
        continuousCategory.appendChild(continuousGroup);
        methodsContainer.appendChild(continuousCategory);
        
        // 创建分类变量分析类别
        const categoricalCategory = document.createElement('div');
        categoricalCategory.className = 'method-category';
        categoricalCategory.innerHTML = '<h2>Categorical Data Analysis</h2>';
        
        const categoricalGroup = document.createElement('div');
        categoricalGroup.className = 'method-group';
        
        methods.categorical.forEach(method => {
            const methodItem = document.createElement('div');
            methodItem.className = 'method-item';
            methodItem.dataset.category = 'categorical';
            methodItem.dataset.method = method;
            methodItem.textContent = method;
            
            // 新增：添加点击事件
            methodItem.addEventListener('click', () => {
                showMethodPath(method);
            });
            
            categoricalGroup.appendChild(methodItem);
        });
        
        categoricalCategory.appendChild(categoricalGroup);
        methodsContainer.appendChild(categoricalCategory);
        
        // 创建混合变量分析类别
        const mixedCategory = document.createElement('div');
        mixedCategory.className = 'method-category';
        mixedCategory.innerHTML = '<h2>Mixed Variables Analysis</h2>';
        
        const mixedGroup = document.createElement('div');
        mixedGroup.className = 'method-group';
        
        methods.mixed.forEach(method => {
            const methodItem = document.createElement('div');
            methodItem.className = 'method-item';
            methodItem.dataset.category = 'mixed';
            methodItem.dataset.method = method;
            methodItem.textContent = method;
            
            // 新增：添加点击事件
            methodItem.addEventListener('click', () => {
                showMethodPath(method);
            });
            
            mixedGroup.appendChild(methodItem);
        });
        
        mixedCategory.appendChild(mixedGroup);
        methodsContainer.appendChild(mixedCategory);
    }

    // 初始化方法列表
    generateMethodsList();

    // 初始化决策树
    initDecisionTree();
});