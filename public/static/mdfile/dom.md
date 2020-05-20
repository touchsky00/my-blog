node类型
-
node.nodeType == 1 判断node类型是element
常见方法
childNodes 返回保存NodeList对象
parentNode
firstChild
lastChild
hasChildNodes   //true or false
操作节点方法
appendChild() 后添加节点
insertBefor(newNode, some.lastChild) 插入哪个节点前面
replaceChild()
removeChild()
cloneNode([true,false]) 深浅复制

Document类型
-
nodeType == 9
取得完整url = document.URL
取得域名domain = document.domain

查找元素
var div = document.getElementById("myDiv")
var images = document.getElemenstByTagName('img')  //返回数组
var radios = document.getElementsByName('color')

文档写入
write(), writeln(), open(), close()

Element类型
-
常见方法
tagName() 比较时加toLowerCase()
element.attributes 返回元素属性数组
getAttribute('id')
setAttribute('id','hello')
removeAttribute('id')
var div = document.createElement('div')
div.id = 'hello'

Text类型
-
nodeType == 3
document.createTextNode()

comment类型
-
nodeType == 8

DocumentType类型
-
DocumentFragment类型
-
用来保存可能会添加到文档中的节点
var fragment = document.createDocumentfragment();


DOM操作技术
-
DOM扩展
-
querySelector(CSS 选择符) //id, class, node
querySelectorAll(CSS 选择符)




