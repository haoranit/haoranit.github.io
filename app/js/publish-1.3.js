/***********************************************************************************************
 * 版本发布平台，公用JS.调用publish-1.3.js文件，须先支持jquery.
 * 新增功能：增加渠道标识
 * 适用规则：先引入publish-1.3.js文件，再调用publish(c,n,c2)函数。注意，参数c代表容器ID前缀。各属性需要加上对应的id值，才能将信息反填入对应ID容器中。
 * 
 * 在调用publish()方法前，页面中需要重新定义如下参数：
 * 	format = "yyyy-MM-dd HH"; //版本更新时间格式
 *	qr = true; //需要生成二维码
 *  accountid，
 *  t //时间戳  格式yyyyMMddHHmmss
 *  md5str,
 *  w //二维码图片宽,
 *  h //二维码图片高。
 * @author locoso
 * @date 2013-08-20 11:25
 * @version 1.3
 * */
var curl = document.location.href;
var vurl = "http://www.htun.cn";
var qurl = "http://www.htun.cn";
try {
	$(this).find("img");
} catch (e) {
}
var a = 1.4;
var f = "yyyy年MM月dd日";
var q = false;
var accountid = "";
var t = "";
var md5str = "";
var w = 100;
var h = 100;
var isreplace = false;
var publish = function(c,n,c2) {
	var p = [];
	p.push("a="+a);
	p.push("n="+n);
	if(c2!=null&&c2!=''&&c2!='0'){
		p.push("c="+c2);
	}
	var content = $("#"+c);
	try {
		$.getJSON(vurl+"?"+p.join("&")+"&callback=?", 
	            function(result){ 
			var r = result.r; 
			var m = result.m; 
			if(r == 1)
			{ 
				content.show();


//				
				if(isreplace){
					url = url.replace("itms-apps","https");
				}
				try {$("#"+c+"_u").attr("href",url);} catch (e) {} 
				try {$("#"+c+"_u2").html(url);} catch (e) {} 
				if(q){
					try {getqurl(c,url);} catch (e) {} 
				}
				try {$("#"+c+"_v").html(result.v);} catch (e) {} 
				try {$("#"+c+"_c").html(result.c);} catch (e) {} 
				try {
					$("#"+c+"_t").html(new Date(Date.parse(result.t.replace(/-/g,   "/"))).format(f));
				} catch (e) {} 
				try {$("#"+c+"_p").attr("src",result.p);} catch (e) {} 
				/*var str = "<div class=\"url\"><a href=" + u + "><img src=\""+p+"\" border=\"0\"/></a></div>" + 
						"<div class=\"version\">版本号：" + v + "</div>" + 
						"<div class=\"time\">最后更新时间：" + t + "</div>";
				content.html(str); */
			}
			else if (r == 0) { 
				content.hide();
			}
	        });
	} catch (e) {
		alert(e.message);
	}
}



var getqurl = function(c,u){
	if(u==null||u==''){
		return;
	}
	var p = [];
	//p.push("accountid="+accountid);
	p.push("url="+encodeURIComponent(u));
	//p.push("t="+t);
	//p.push("md5str="+md5str);
	p.push("w="+w);
	p.push("h="+h);
	try {$("#"+c+"_u_qr").attr("src",qurl+"?"+p.join("&"));} catch (e) {} 
	/*try {
		$.getJSON(surl+"?"+p.join("&")+"&callback=?", 
	            function(result){ 
			var r = result.r; 
			if(r == 1)
			{ 
				try {$("#"+c+"_u_qr").attr("src",result.u);} catch (e) {} 
			}
			else if (r == 0) { 
			}
	        });
	} catch (e) {
	}*/
}
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"H+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}

	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
