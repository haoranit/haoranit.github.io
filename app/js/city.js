$(document).ready(cityLoad);
var changeBaseUrl = "";
function cityLoad() {
	try{dealCity();}catch(e){}
	//天气
	try{getweather();} catch (e) {}
    $("#maintop").prepend("<div style=\"position:fixed;display:none;z-index:999; \" id=\"diqua\" class=\"diqu_01\"><div class=\"diqu_b\"><div class=\"diqu_bt\"><b>选择地区：</b><span><a href=\"javascript:;\" onclick=\"close_div('diqua')\"><img src=\""+$("#bath_path").html()+"/images/diqu_an01.jpg\" width=\"48\" height=\"23\" alt=\"关闭\" /></a></span></div>"+htmlcitydivone);
}
var nowcity = 0;
var lastchoosecity = "";
//是否要更新城市cookie
var isUpdateCookie = false;
//是否要取coolie
var isGetCookie = true;
var isChangePageByCity = false;
function changecity(div) {
    if (div == 0) {
        var txt = encodeURI("");
        $("#cityname").html("全国");
        $("#citycode").val(txt);
        // $.cookie("city","-1",0,"/",".locoso."+urlen);
		close_div("diqua");
        // alert($.cookie("city"));
    } else {
        $("#city_a_" + div).css({
            color:"",
            fontWeight:""
        });
        if (lastchoosecity != "") {
            $("#city_a_" + lastchoosecity).css({
                color:"#ff1e00",
                fontWeight:"bold"
            });
            lastchoosecity = div;
        }
        $("#" + nowcity).hide();
        $("#" + nowcity + "_2").hide();
        $("#" + div).show();
        $("#" + div + "_2").show();
        nowcity = div;
    }

}
function dealCity() {
	if(isUpdateCookie){
		setCityCookie();
	}
	if(isGetCookie){
		//获取城市
		try{getCityCode();}catch(e){}
		if($("#cityname").html()==''){
			$("#cityname").html("北京市");
			$("#citycode").val("hbbb1");
		}
	}
}
function setCityCookie(){
	var id  = $("#citycode").val();
	if(id!=''){
		var str = $("#cityname").html();
		var pro = $("#provinceName").val();
		$.cookie("wo_citycode", id, { expires: 7, path: '/',domain: $("#bath_suffix").html() });
		$.cookie("wo_cityname", str, { expires: 7, path: '/',domain: $("#bath_suffix").html() });
		$.cookie("wo_provincename", pro, { expires: 7, path: '/',domain: $("#bath_suffix").html() });
		
	}
}
//从cookie中读取城市
function getCityCode()
{
	var str= $.cookie('wo_citycode');
	var name= $.cookie('wo_cityname');
	var pro = $.cookie('wo_provincename');
	if(str=="-1"||str==null||name==null||name=="")
	{
		return;
	}
	else if(str!=null&&str!="")
	{
		$("#cityname").html(name);
		$("#citycode").val(str);
		var customizingUrl = $("#customizingUrl").attr('href');
		$("#customizingUrl").attr('href',customizingUrl+"/c"+str);
	}
	if(pro != null && pro != ""){
		$("#provinceName").val(pro);
	}
	if($("#foodMenu").length > 0){
		if(null != pro && pro != "" && pro == "河北省"){
			$("#foodMenu").attr("style","");
		}else{
			$("#foodMenu").attr("style","display:none;");
		}
	}
}
function prcity(id, str) {
    var txt = id;
    $("#cityname").html(str);
    $("#citycode").val(txt);
	/*$.cookie("city", id);
	$.cookie("cityname", str);*/
	close_div("diqua");
	if(changeBaseUrl!=""){
		location.href=changeBaseUrl+"/c_"+txt;
	}
	else{
		location.href=$("#bath_path").html()+"/c_"+txt;
	}
}
function prcity2(id, str) {
	prcity(id, str);
}
// 弹出层，定位于屏幕中间
function show_div(div) {
    // try{
    // if($("#"+div).css("display")=="block")
    // {
    // close_div(div);
    // return;
    // }
    // 层定位
    var high = $(window).height();
    var width = $(window).width();
    var div_high = $("#" + div).height();
    var div_width = $("#" + div).width();
     var top=($(window).scrollTop()+((high-div_high)/2)-100)+"px";
     var left=($(window).scrollLeft()+(width-div_width)/2)+"px";
    //var top = "-68px";
    //var left = "0px";
    $("#" + div).css({
        "left":left,
        "top":top
    });
    $("#" + div).show();
    $("#mask").css({"visibility":"visible","height":document.documentElement.scrollHeight});
    // }catch(e){}

}
// 关闭层
function close_div(div) {
    $("#" + div).hide();
    $("#mask").css("visibility","hidden");
}