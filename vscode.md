# vscode 简要介绍

一个很niubility的编辑器（具体自己百度吧）当初我选择它的原因是可以编辑并预览markdown文档，后来发现还可以debug nodejs，
智能提示less编写，集成git，显示gulp task（还有许多我没发现的）。
所有的用法都可以参见<a href="https://code.visualstudio.com/docs/editor/codebasics">vscode Docs<a/>

> ## 添加Linters
>>      A linter is a tool that provides warnings for suspicious looking code.
>>      VS Code supports linters through extensions. 
>>      Linters provide warnings, errors, and light bulb actions.
>> 具体步骤
>>>  1 安装 eslint(前提是你安装了node)
>>>
>>>```bash
>>>$ npm install -g eslint
>>> ```
>>>2 安装ESLint extension
>>>
>>>打开vscode然后(Ctrl+P)打开命令窗口，之后输入 ext install vscode-eslint
>>>
>>>然后在当前目录打开cmd 初始化检查规则然后根据提示添就行其实这步并不是必须的这步定义了一下格式规范（缩进，分号，字符串用单引号or双引号）
即便没有eslint还是能检查文件中的语法错误。
>>>
>>>```bash
>>>$ eslint --init
>>>```


     

    
