简介
-
核心组成： ecmascript, dom, bom

\<script>属性
async: 异步，表示应该立即下载脚本，但不妨碍其他操作
defer：脚本延迟到文档完全加载完后下载

XHTML中使用javascript

    <script type="text/javascript"><![CDATA[
        function hello(a,b) {
            ...
        }
    ]]>
    </script>

在现代浏览器中都可以使用

数据类型
-
基本数据类型：Undefined, Null, Boolean, Number, String
复杂数据类型: Object Array Data Function Math

typeof返回小写字符串如"undefined","boolean","string","number","object","function"

Number
-
八进制：第一位为 0 var octaNuml = 070
十六进制：　前面两位必须是 0x var hexNum = 0xA;

NaN，非数值

    alear(isNaN(10)); //false
    alear(isNaN(NaN)); //true

数值转换
Number(),parseInt(),parseFloat()

    var num = Number('00011');  //11
    var num = parseInt('0xA',16) ; //10

parseInt()第二参数代表2，8，10，16中的一个

 string
 -
 toString() 字符串转换函数
    
    var num = 10;
    alert(num.toSting());   //'10'
    alert(num.toSting(2));  //'1010'
    alert(num.toSting(8));  //'12'
    alert(num.toSting(10)); //'10'
    alert(num.toSting(16)); //'a'

    var value = null;
    alert(value.toStirng());    //'null'
    ...

str.split(",")分割字符串返回数组
str.substr()
str.substirng()
str.replace(/zifuchuan/g," ")
str.length
str.indexOf()
var charCode=mystr.charCodeAt(7);    //111
str.slice() 接收两个参数，起和终index, 复制并返回新数组，从起index开始复制到终index
str.substring() 只能非负整数，截取起始结束位置同slice()函数一致。
str.substr() substr()与第一、第二种函数不同，从起始位置开始截取，结束位置为第二个参数截取的字符串最大长度
str.toLowerCase()  //变小写
str.toUpperCase() //变大写
str.trim() 去除前后空格

Object
-
属性：
constructor,toString(),valueOf()

    var num1 = 2;
    var num2 = 20;
    var num3 = --num1 + num2;   //21(会改变算术结果，先--后执行)
    var num4 = num1-- + num2;   //22(不会改变算术结果，先执行后--)
    var num5 = num1 + num2;     //21

Array
-
push("hello"):推进hello     //后添加
pop():取得最后一项，在数组中移除    //后删减
shift():取得第一项，在数组中移除    //前删减
unshift():在数组前添加任意项，并返回长度    //前添加

reverse()   //倒转数组
sort()  //升序可以接收一个比较函数
concat()    //合并数组，返回新的数组　

    var colors = ['red']
    var colors2 = colors.concat('yello',['back','green'])   //['red','yello','back','green']
slice(): 接收两个参数，起和终index, 复制并返回新数组，从起index开始复制到终index

splice():返回删除的元素数组
    
    //删除
    arr.splice(0,2) //删除第一项的位置和删除的项数
    //插入
    arr.splice(2,0,'red','green') //数组第二的位置插入red,green
    //替换
    arr.splice(2,2,'red','green')

indexOf(value,index): 参数value，从index=index开始找，返回的是index
lastIndexOf(value,index): 参数value，从index=index开始找，返回的是index

迭代方法:
every():每一项都复合传入函数规则，返回Boolen
some():有一项以上复合传入函数规则,返回Boolen
forEarch():没有返回值，只对数组每一项循环操作
filter():返回传入函数true的数组
map():
    
    //map():返回原始数组对应项上运行传入函数的结果数组：给数组每一项乘2
    var arr = [0,2,1]
    var mapArr = arr.map(function(item,index,array) {
        return item*2
    })
    consloe.log(mapArr) //[0,4,2]

归并方法
reduce(perv,curr) //从前遍历数组  return perv + curr
reduceRight(perv,curr) //从后遍历数组 return perv + curr

Data类型
-
var now = new Data()

Data.parse():
Data.UTC():设置开始时间（0-23）

RegExp
-
    var exp = / pattern / flags
    /***
    flags = g:表示全局 i:不区分大小写 m: 表示多行 
    ***/
    
    //使用
    re.test('字符串')
RegExp实例方法
exec():