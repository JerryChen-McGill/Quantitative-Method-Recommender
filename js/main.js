document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const methodsContainer = document.getElementById('methods-container');
    const restartBtn = document.getElementById('restart-btn');

    let currentPath = [];

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
        const category = methodItem.dataset.category;

        // 第一层选择的筛选逻辑 - 严格对应 decisionTree 的一级分类
        if (selectedText === "Only Continuous variables" && category !== 'continuous') {
            return true;
        }
        
        if (selectedText === "Only Categorical data" && category !== 'categorical') {
            return true;
        }
        
        if (selectedText === "Categorical and Continuous variables" && category !== 'mixed') {
            return true;
        }

        // 第二层选择的筛选逻辑
        if (selectedValue === 'continuous-variables') {
            // 当在"连续变量"分支时，只显示连续变量分析方法
            return category !== 'continuous';
        }
        
        if (selectedValue === 'Chi-square') {
            // 当在"分类变量"分支时，只显示分类变量分析方法
            return category !== 'categorical';
        }
        
        if (selectedValue === 'mixed-variables') {
            // 当在"混合变量"分支时，只显示混合变量分析方法
            return category !== 'mixed';
        }

        // 更具体的方法筛选
        if (selectedValue === 'Correlation' && method !== 'Correlation') {
            return true;
        }
        
        if (selectedValue === 'Factor Analyses' && method !== 'Factor Analyses') {
            return true;
        }
        
        if (selectedValue === 'Linear Regression' && !method.includes('Linear Regression')) {
            return true;
        }
        
        if (selectedValue === 'Simple Linear Regression' && method !== 'Simple Linear Regression') {
            return true;
        }
        
        if (selectedValue === 'Multiple Linear Regression' && method !== 'Multiple Linear Regression') {
            return true;
        }
        
        if (selectedValue === 'Logistic Regression' && method !== 'Logistic Regression') {
            return true;
        }
        
        if (selectedValue === 'find-differences' && !method.includes('t-test') && !method.includes('ANOVA')) {
            return true;
        }
        
        if (selectedValue === 'T-test' && !method.includes('t-test')) {
            return true;
        }
        
        if (selectedValue === 'ANOVA' && !method.includes('ANOVA') && method !== 'MANOVA' && method !== 'ANCOVA') {
            return true;
        }

        return false;
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
        initDecisionTree();
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