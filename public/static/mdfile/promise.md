promise
-

async await
-

promise/async await 区别

假设函数getJSON返回值是 Promise，并且 Promise resolves 有一些JSON 对象。我们只想调用它并且记录该JSON并且返回完成。

使用promise

    const makeRequest = () =>
        getJSON().then(data => {
            console.log(data)
            return "done"
        })

    makeRequest()

使用async await 不需要用then 

    const makeRequest = async () => {
        // await getJSON()表示console.log会等到getJSON的promise成功reosolve之后再执行。
        console.log(await getJSON())
        return "done"
    }

