$(function () {
	$('#login-button').click(function () {
		var url = 'http://test.com/kidee_admin/login.php';
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'JSON',
			data: {
				username: $('#username').val(),
				pwd: $('#password').val()
			},
			success: function (data) {
				if (data) {
					if(data.result == 1) {
						tmpShow('.info .success', msg.success);
						window.location.href = './admin.html'
					} else {
						tmpShow('.info .error', msg.fail);
					}
				}
			}
		})
	});

	var msg = {
		success: 'Login success, redirecting...',
		fail: 'Login error, try again'
	};

	function tmpShow(ele, msg) {
		$(ele).show();
		$(ele).text(msg);
		setTimeout(function () {
			$(ele).hide();
		}, 1500);
	}
});