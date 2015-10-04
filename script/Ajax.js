    function ajax(url,fnSucc,fnFaild)
    {
        //1.创建Ajax对象
        if(window.XMLHttpRequest) //window为了解决ie6下的报错
        {
            var oAjax=new XMLHttpRequest(); //非ie6的浏览器
        }else{
            var oAjax=new ActiveXObject('Microsoft.XMLHTTP'); //ie6下的方法
        }
        //2.链接服务器
        //open(发送方式，URL，异步通信)
        oAjax.open('POST',url+'?t='+new Date().getTime(),true)
        //3.发送请求
        oAjax.send();
        //4.接收返回值
        oAjax.onreadystatechange=function()
        {
            //oAjax.readyState //浏览器和服务器进行到哪一步了
            if(oAjax.readyState==4) //读取完成
            {
                if(oAjax.status==200) //读取成功
                {
                    fnSucc(oAjax.responseText);
                }
                else
                {
                    if(fnFaild)
                    {
                        fnFaild(oAjax.status);
                    }
                }
            }
        }
    }