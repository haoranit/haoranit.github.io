//顶部,底部公共JS
//2011.10.04
//lsj
$(document).ready(loadPageCommon);
var firstSearch=true;
//绝对路径
var IPData;
//页面body宽
var div_width = 970;
//浏览器页面宽
var z_width;
//右侧移动图片位置
var z_left;
//表单提交处理
function returnSearch() {
	// 编码utf-8
	var k = $("#search").val().trim();
	if(k == "" || k == searchMsg) {
	//if (false){
		alert('请输入搜索关键词。');
		$("#search").focus();
		return false;
	}
	else
	{
		var kk = encodeURI(k);
		var txt=$("#citycode").val();
		if(txt!=""&&txt!="0")
		{
			kk=kk+"/c"+txt;
		}
		kk = "/"+kk;
		if($("#idcode").val()!=0){
			kk = kk+"/u"+$("#idcode").val();
		}
		if(firstSearch)
		{
			$("#formSearch")[0].action=$("#formSearch")[0].action+kk;
			firstSearch=false;
		}
		
		return true;
	}
}
//表单提交处理
function returnSearchFood() {
	// 编码utf-8
	var k = $("#search").val().trim();
	if(k == "" || k == searchMsg) {
	//if (false){
		alert('请输入搜索关键词。');
		$("#search").focus();
		return false;
	}
	else
	{
		var kk = encodeURI(k);
		kk += "/v1";
		var txt=$("#citycode").val();
		if(txt!=""&&txt!="0")
		{
			kk=kk+"/c"+txt;
		}
		kk = "/"+kk;
		if($("#idcode").val()!=0){
			kk = kk+"/u"+$("#idcode").val();
		}
		if(firstSearch)
		{
			$("#formSearch")[0].action=$("#formSearch")[0].action+kk;
			firstSearch=false;
		}
		
		return true;
	}
}
//页面加载
function loadPageCommon() {
	try{z_width = $(window).width();
	z_left = z_width/2+div_width/2;
	}catch(e){}
	//获取登陆名
	try{getUserinfo();}catch(e){}
	// 监听回车键
	try{KeyDownHandler();}catch(e){}
	try {
		if($("#search").val()==''||$("#search").val()=='null'){
			$("#search").val(searchMsg);
		}
	} catch (e) {
	}
	//显示时间
	try{getDateTime();} catch (e) {}
}
var searchkind=1;
var searchMsg = "搜索商家 / 城市 / 优惠";
function KeyDownHandler() {
	document.onkeydown = function(e) {
		if (!e)
			e = window.event;// 火狐中是 window.event
		if ((e.keyCode || e.which) == 13) {
			//if ($("#search").val()!=''&&$("#search").val()!=searchMsg)
			if(true)
			{
				if(searchkind==2)
				{
					//searchage();
				}
				else
				{
					$("#formSearch").submit();
				}
			}
			else
			{
				alert('请输入搜索关键词。');
			}
		}
	}
}
function inputfocus(){
	if($("#search").val()==searchMsg){
		$("#search").val("");
	}
}
function inputblur(){
	if($("#search").val()==""){
		$("#search").val(searchMsg);
	}
}
var iscomeback = false;
function getUserinfo(){
	$.ajaxSetup({cache:true});
	try {
		var param = "";
		if(iscomeback){
			param = "?url="+window.location.href;
		}
		$.getJSON("http://my."+$("#bath_suffix").html()+"/user/login-getUserInfo.do?callback=?", function(result){
			if(result==-1){
			}
			else if(result==0){
				var str = '<dl class="top_rightl"><a class="logout" href="http://my.'+$("#bath_suffix").html()+param+'">[登录]</a></dl>'+
					'<dl class="top_rightl"><a class="logout" href="http://my.'+$("#bath_suffix").html()+'/pages/register.jsp">[注册]</a></dl>';
				$("#stone_box").html(str);
			}
			else{
				var str = '<dl class="img"><img src="'+result.facepath+'" width="26" height="26" border="0" /></dl>'+
					'<dl class="top_rightl"><a href="http://my.'+$("#bath_suffix").html()+'">'+result.nickname+'</a></dl>'+
	             	'<dl class="top_rightl"><a class="logout" onclick="return confirm("确认退出吗？")" href="http://my.'+$("#bath_suffix").html()+'/user/login-logout.action">[退出]</a></dl>';
				/*var str1 = '<div class="logon_container_haveuser">'+
	            	'<dl class="l"><img src="'+result.facepath+'" width="30" height="30" border="0" /></dl>'+
	            	'<dl class="l"><a href="http://my.'+$("#bath_suffix").html()+'">'+result.nickname+'</a></dl>'+
	            	'<dl class="r"><a class="logout" onclick="return confirm("确认退出吗？")" href="http://my.'+$("#bath_suffix").html()+'/user/login-logout.action">[退出登录]</a></dl>'+
	            	'</div>';*/
				$("#stone_box").html(str);
				try {
					$("#idcode").val(result.idcode);
				} catch (e) {
				}
			}
		});
	} catch (e) {
	}
}
function getweather(){
	$.ajaxSetup({cache:true});
	try {
		var c = $("#citycode").val();
		$.getJSON($("#bath_path").html()+"/weather/currentWeather.do?c="+c+"&callback=?", function(result){
			if(result==-1){
			}
			else if(result==0){
			}
			else{
				var txtWeather = result.weatherinfo.img_title1;
				var imgpath = "";
				if (txtWeather.indexOf("晴")>=0)
				{
					imgpath = "sunny.png";
				}
				else if (txtWeather.indexOf("有云")>=0)
				{
					imgpath = "havecloudy.png";
				}
				else if (txtWeather.indexOf("云")>=0)
				{
					imgpath = "cloudy.png";
				}
				else if (txtWeather.indexOf("大雨")>=0)
				{
					imgpath = "bshower.png";
				}
				else if (txtWeather.indexOf("中雨")>=0)
				{
					imgpath = "cshower.png";
				}
				else if (txtWeather.indexOf("小雨")>=0)
				{
					imgpath = "sshower.png";
				}
				else if (txtWeather.indexOf("雨")>=0)
				{
					imgpath = "sshower.png";
				}
				else if (txtWeather.indexOf("雪")>=0)
				{
					imgpath = "snow.png";
				}
				else if (txtWeather.indexOf("雷")>=0)
				{
					imgpath = "tstorm.png";
				}
				else
				{
					imgpath = "sunny.png";
				}
				$("#weather_img").html("<img src=\""+$("#bath_path").html()+"/images/weather/"+imgpath+"\" width=\"58\" height=\"58\" border=\"0\" />")
				$("#weather_num").html(result.weatherinfo.temp1);
				$("#weather_text").html(result.weatherinfo.weather1);
			}
		});
	} catch (e) {
	}
}
function selectMenu(id) {
	$("#nav_id" + id).addClass("nav_now");
}
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
 }
function checkemail(email)
{

	//var myreg = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if(emailPattern.test(email))
    {
        return true;
    }
	return false;
}


function checkmobile(mobile) {
    var pattern = /^((0[0-9]{2,3})?(-)?\d{7,8})$|^((\+86)|(86))?(1)\d{10}$/;
    if (pattern.test(mobile)) {
        return true;
    }
    return false;
}
function gotopscroll(){
	var h = $(window).height();
	var t = $(document).scrollTop();
	if(t > 300){
		$('#gotop').show();
	}else{
		$('#gotop').hide();
	}
}
$(document).ready(function(e) {
	gotopscroll();
	$('#gotop').click(function(){
		$(document).scrollTop(0);
	});
	$('#code').hover(function(){
			$(this).attr('id','code_hover');
			$('#code_img').show();
		},function(){
			$(this).attr('id','code');
			$('#code_img').hide();
	});
});

$(window).scroll(function(e){
	gotopscroll();
});
