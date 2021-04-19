function showmenu(tag) {
	var light = document.getElementById(tag);
	var fade = document.getElementById('fade');
	light.style.display = 'block';
	fade.style.display = 'block';
}
function hidemenu(tag) {
	var light = document.getElementById(tag);
	var fade = document.getElementById('fade');
	light.style.display = 'none';
	fade.style.display = 'none';
}
function test(){
	alert("亲，此功能还正在建设当中哦，还是浏览其他功能吧！");
}
function sendMobileForDownLink() {
	try {
		$("#sbb").attr({
			"disabled" : "disabled"
		});
		var mobile = $("#mobile").val();
		if (mobile == '' || mobile == '输入手机号码') {
			alert("请输入手机号码");
			$("#mobile").focus();
			$("#sbb").removeAttr("disabled");
			return;
		}
		var chkma = $("#chkma").val();
		if (chkma == '' || chkma== '') {
			alert("请输入验证码");
			$("#chkma").focus();
			$("#sbb").removeAttr("disabled");
			return;
		}
		$.ajax({
			url : $("#bath_path").html() + "/app/sendSMSForDownLink.do?mobile="
					+ mobile+"&chkma="+chkma,
			dataType : "html",
			success : function(data) {
				alert(data);
				$("#sbb").removeAttr("disabled");
				changeVerifyCode("code_img_2");
				$("#chkma").val("");
			}
		});
	} catch (e) {
		alert("出现异常");
		$("#sbb").removeAttr("disabled");
	}
}
function mobilefocus() {
	var mobile = $("#mobile").val();
	if (mobile == '输入手机号码') {
		$("#mobile").val("");
	}
}