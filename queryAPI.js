get_href = window.location.href
// 从前端获取到的城市名，无法直接用，已经url编码了，需要url解码
var city_Name = decodeURI(get_href.slice(get_href.indexOf("=")+1,get_href.length))
document.title = city_Name
    $.ajax({
        type:"get",
        url:"https://www.tianqiapi.com/api/",
        dataType:"json",
        data:{
            appid:69378456,appsecret:"Nm2eUYea",version:"v1",city:city_Name
        },
        success:function(responce,status){
            var new_data = responce
            if (new_data.city != city_Name){
                alert("输入错误,没有这个城市,请重新输入。")
                window.location.href="index.html"
            }
            else{
            day_weather=new_data.data
            $(".city").append(new_data.city)
            $(".date").append(new_data.update_time + "</br>")
            $(".intr").append("今日湿度：" + day_weather[0].humidity+"</br>")
            $(".intr").append("今日空气指数,质量："+day_weather[0].air + "，" +
                                    day_weather[0].air_level + "</br>")
            $(".intr").append("空气描述：" + day_weather[0].air_tips+"</br>")
                
            url_img="url(./JPEG/" + day_weather[0].wea_img + ".jpg)"
            console.log(url_img)
            $(".bg").css({"background":url_img + 'no-repeat',"background-size":'100%'})
            for(i=0;i<7;i++){
                class_name = ".weather" + i;
                $(class_name).html( 
                                    ""+day_weather[i].week + "</br>" + 
                                    "日期：" +day_weather[i].date +  "</br>"  +
                                    "天气："+day_weather[i].wea + "</br>" +
                                    "气温：" +  day_weather[i].tem1 + "~" +
                                    day_weather[i].tem2 + "</br>" + 
                                    "风向：" + day_weather[i].win[0] + 
                                    day_weather[i].win[1] + "</br>" + 
                                    "风力：" + day_weather[i].win_speed + "</br>" 
                                    )
            }
            for (i=0;i<6;i++){
            $(".weatherindex").append("<tr><td>"+day_weather[0].index[i].title+ "</td>" +
                        "<td>" + day_weather[0].index[i].level+"</td><td>"+
                            day_weather[0].index[i].desc+"</td></tr>")
            }
            }
        }
    })
$(function () {
    $(".sty").hover(function(){
        $(this).css({"color":"#e9faff","background":"#32407b"})
        $(".mb").css({"margin-left":$(this).offset().left-$(document.body).width()*0.12})
    }),
    $(".sty").on("mouseleave",function(){
        $(this).css({"color":"black","background":"none"})
    })
})
