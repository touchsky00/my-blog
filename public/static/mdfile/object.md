数据属性
-
configurable 可否调用delete删除属性
enumerable 能否使用for-in循环
writable   能否修改属性的值
value   

要修改属性值必须用Object.defineProperty(),接受三个参数：所在对象，属性名称，描述符(configurable,enumerable,writable,value)

    var person = {}
    Object.defineProperty(person, 'name',{
        writable: false,
        value: "Linli"
    })

    person.name = "hello"
    alert(person.name)  //Linli
    

访问属性 getter，setter
-
get() 读取属性时调用函数 set() 写入属性时调用函数

定义多个属性 Object.defineProperties() 接受两个对象参数
访问器属性描述符：configurable, enumerable, get, set
数据属性描述符: configurable, enumerable, writable, value

方法Object.getOwnPropertyDescriptor() 取得属性描述符

方法Object.getPropertyOf() 返回原型prototype

    alert(Object.getPropertyOf(person1) == Person.prototype)    //true


实例设置属性则原型会屏蔽同名属性，可通过delete删除实例属性让属性指回原型属性
方法Object.hasOwnProperty() 判断给定属性是否在实例中
方法hasPrototypeProperty(person,'name')  可以判断实例name属性是否来自原型
Object.keys(person.prototype) 返回一个字符串 // "name,age,job,sayname"

