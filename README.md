# 可爱的小猪

有位同学看英语文档必备“谷歌金山词霸”（现在谷歌和金山已经停止合作了），碰到不认识的生词就添加进“生词本”里。后来她想把生词本里的单词打印出来，可以随时随地看看。但直接从生词本里导出的文档是采用 Unicode 编码（用于输出音标），而且格式是混乱的，计算机看得懂，人看起来就很吃力了。

该软件可以将这个文件格式化成HTML文档，方便打印。界面如下：

![Pig-0.7.0](http://redraiment.com/resources/figure/pig/070-1.gif)

# 关于名字

为什么起名叫“小猪”？记得以前央视有一个栏目叫“天天快乐”，其中有一个笑话是这样的。

    有两个旅行者来到一个小岛，想补充一下食物。看到路上有一头大猪和大头小猪，就问一个当地居民：“你知道这两头猪是谁家的吗？”
    居民说：“大猪是谁家的我不知道，但小猪是谁家的我知道。”
    “那小猪是谁家的呢？”
    “小猪是大猪家的！”

# 更新日志

<table>
  <thead>
    <tr>
      <th>版本</th>
      <th>描述</th>
      <th>大小</th>
      <th>日期</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/redraiment/pig/archive/v0.1.1.zip" target="_blank">0.1.1</a></td>
      <td>最初版本，收藏用。</td>
      <td>5K</td>
      <td>2008-11-09</td>
    </tr>
    <tr>
      <td><a href="https://github.com/redraiment/pig/archive/v0.3.0.zip" target="_blank">0.3.0</a></td>
      <td>增加了图形界面，批量文件转换。</td>
      <td>260K</td>
      <td>2009-01-27</td>
    </tr>
    <tr>
      <td><a href="https://github.com/redraiment/pig/archive/v0.3.1.zip" target="_blank">0.3.1</a></td>
      <td>实现Set选项<br>选项默认不开启(效果和上版本一样)。
        <ul>
          <li>允许自定义是否覆盖原有文件。</li>
          <li>允许指定统一的输出目录地址。</li>
          <li>允许将多个文件生成一张网页。</li>
        </ul>
      </td>
      <td>200K</td>
      <td>2009-02-02</td>
    </tr>
    <tr>
      <td><a href="https://github.com/redraiment/pig/archive/v0.5.3.zip" target="_blank">0.5.3</a></td>
      <td>
        实现自定义排版功能：
        <ul>
          <li>实现Unicode和ANSI两种编码格式，支持IE6.0等低版本的浏览器。</li>
          <li>列表和卡片两种不同的风格。</li>
          <li>自定义输出内容和顺序，以及分割线。</li>
          <li>自带配置文件，能保存用户的个性化配置信息。</li>
        </ul>
      </td>
      <td>445K</td>
      <td>2009-02-10</td>
    </tr>
    <tr>
      <td><a href="https://github.com/redraiment/pig/archive/v0.7.0.zip" target="_blank">0.7.0</a></td>
      <td>
        新版本解决的问题
        <ol>
          <li>解决开发环境版权问题：编辑器用 Emacs，语言是 JavaScript 和 HTML；</li>
          <li>支持新版金山词霸的输出格式；</li>
          <li>源码即程序，彻底开源；</li>
          <li>更新了帮助文档。</li>
        </ol>
        砍掉的功能
        <ol>
          <li>合并“指定输出路径”和“生成单个文件”两个功能；</li>
          <li>删除“输出卡片风格”；</li>
          <li>删除“图片格式”；</li>
          <li>删除“PDF格式”；</li>
          <li>删除“字段排序”功能。</li>
        </ol>
      </td>
      <td>246K</td>
      <td>2011-01-02</td>
    </tr>
    <tr>
      <td><a href="https://github.com/redraiment/pig/archive/v0.7.3.zip" target="_blank">0.7.3</a></td>
      <td>
        <ol>
          <li>支持 Windows XP 平台；</li>
          <li>支持导出 CSV 格式文件。</li>
        </ol>
      </td>
      <td>246K</td>
      <td>2011-01-03</td>
    </tr>
    <tr>
      <td><a href="https://github.com/redraiment/pig/archive/v0.7.5.zip" target="_blank">0.7.5</a></td>
      <td>
        <ol>
          <li>解决 Vista 和 Win7 下默认没有 Common Dialog 的问题；</li>
          <li>支持导出 TXT 格式文件。</li>
        </ol>
      </td>
      <td>275K</td>
      <td>2011-06-26</td>
    </tr>
  </tbody>
</table>

# 计划列表

1. 在已安装了金山词霸的电脑上能自动分析生词本数据库，用户无需导出成文本文件；
2. ~~支持其他词典软件，比如有道、灵格斯等。~~<sup>[1]</sup>

# 版权问题

和我的其他玩具一样：源代码都给你了，那还不是想怎么样就怎么样了？我在乎的人知道这玩意儿是我为她开发的，至于其他人怎么想我就懒得管了。

#  注解 

[1] 有道词典自带了导出可打印格式的功能；灵格斯没有生词本功能。
