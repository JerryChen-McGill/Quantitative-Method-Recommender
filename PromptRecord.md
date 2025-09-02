帮我创建一个网站，帮助用户学会如何选择恰当的定量分析方法，而且让界面非常简单，让用户第一步选What do you want to analyze?，就是一个多选题一样，然后用户做出选择后，比如他点击了Only Continuous variables然后将这些信息上移，显示下一个选择题Measure Correlation between two Continuous variables，or Pridict outcome，以此类推，最后给用户他们应该用的方法。

这是所有决策树信息。做成一个英文网站。保留原始表达。

the last step,should not be user chose the exact method, but just display the recommendation. I mean, you can decrease a step making choice. do not change other things.

更新目前的样式，让每一轮的选择题都变成一个下拉列表的一个选项，然后呢第1轮的问题在最左边的一个下拉按钮第2轮的问题在嗯从左到右的第2个位置，然后依次。

最后一轮的下拉框是不需要的，直接显示结果即可。也就是整个决策树的末梢最后一个节点都不需要用，嗯选择题的方式呈现，而是直接显示推荐结果。

Recommended method可以一开始就显示在下方，并且一开始的时候包含所有的method，每一个都用一个嗯好看的一个容器给它装起来，并且同类型的给它用大容器装起来。随着这个选项的进行。这个整个的这个包含的method就被筛选掉件并且减少了。而当下拉列表所有选项做完之后，基本只剩下一个推荐。

无法访问此网站
localhost 拒绝了我们的连接请求。

检查问题

@index.html @style.css 
将下拉框部分变得美观一点，根据内容宽度适配对应的下拉框宽度。

@index.html @main.js @decisionTree.js main.js似乎出了较大问题，请帮忙看看，修改一下。

index.html 中也有一个小问题，第24行的 <h2>Continuous Variables Analysis</h2>div class="method-group"> 缺少闭合标签和开始标签。@index.html 帮解决

我想在本地测试，浏览器显示网址：http://localhost:8080/，信息：localhost 拒绝了我们的连接请求。

奇怪，我没有python代码，可以说没有后端代码呀？为什么会这样？我记得之前是可以直接在本地测试的呀。@js @index.html @css @.vscode 

参考@decisionTree.js ，修复@index.html @main.js这两个文件，每一个“result” 都是一个最小单位的方法，应该在初始状态作为一个块显示在某一类里面。每一层下拉框，都是一个筛选的过程，当最后一个下拉框用户做出选项，下面的显示框应该会只显示一个方法。

很好，当第一层下拉框 "I deal with"，我选"Only Categorical data"
第二层I want to，我选Compare distribution to the expected的时候，虽然最终被选中的方法块有绿色突出，但其他所有方法块都显示出来了。我希望他们都暂时消失。请帮我沿着这个逻辑检查是哪里出现了问题，并同时检查全部代码是否存在同样类似的问题，如果存在，都帮忙进行修复。@main.js @index.html （别改@decisionTree.js ）

主页下面的三个分类也有问题，应该严格按照@decisionTree.js 的一级分类来啊。请修改@index.html @main.js ，并同时梳理所有数据分类和显示，请严格按照decisiontree文件的数据来。

很好，最后一个小问题，在我已经做出了4个下拉框的选择，得到结果之后，如果我修改第2层级的下拉框的选项，我发现第三、四层级下拉框还保留原有状态，我希望的效果是，他们应该都被去掉，仅仅如果还有下一个层级，才显示下一个层级下拉框的空框。也就是，当我在已有状态下修改某个层级下拉框的选项的时候，它的更后面的下拉框应该有一个清空的动作，仅仅按照正常逻辑如果还有下一级就显示下一级的空框。@main.js @index.html 

我想对数据做更好的封装，有没有办法将这部分也采用js中的数据来显示呢？这些就是@decisionTree.js 中的result. 这样方便以后我想加新的数据，可以比较方便在js文件中直接加。

@README.md 根据功能更新一个readme，英文版，且让用户很简单就了解功能和如何使用。

@README.md 帮我写进去呀，且格式友好，标题样式明显

如何通过一个单独的链接打开这个网站，也就是如何用github来托管这个project