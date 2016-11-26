$(function () {
	var tabs = $('#tabs');
	//  sidebar
	var tabSearch = $('#search'),
		tabUserAdd = $('#user-add'),
		tabPassCha = $('#pass-cha'),
		tabUserDis = $('#user-dis'),
		tabWatchDis = $('#watch-dis');
	var lis = $('.sidebar li');
	var searchResult = $('#search-result'),
		searchBody = $(searchResult).find('table>tbody');
	//  buttons
	var btnSearch = $('#btn-search'),
		btnUserAdd = $('#btn-useradd'),
		btnPassCha = $('#btn-passcha'),
		btnUserDis = $('#btn-userdis'),
		btnWatchDis = $('#btn-watchdis');

	//  public
	(function activeToggle() {
		var li = $('.sidebar .nav li');
		$.each(li, function (index, element) {
			$(element).click(function () {
				rmActive(li);
				$(this).attr('class', 'active');
				tabShow($(element).find('a').attr('href'));
			});
		});
	})();

	function rmActive(ele) {
		$.each(ele, function (index, value) {
			$(value).removeClass();
		});
	}

	function tabShow(id) {
		$(tabs).children('div').hide();
		$(id).show();
	}

	function getObj(tab) {
		var obj = {};
		$.each($(tab).find('input[data-post]'), function (index, val) {
			obj[$(this).attr('data-post')] = $(this).val();
		});
		return obj;
	}

	function dataPost(postUrl, postData, success, err) {
		success = success || null;
		err = err || null;
		$.ajax({
			url: postUrl,
			type: 'POST',
			dataType: 'JSON',
			data: postData,
			success: success,
			error: err
		});
	}

	//  RESTful

	function getStatistics() {
		var url = 'http://test.com/kidee_admin/get.php';
		dataPost(url, '', function (data) {
			console.log(data);
		});
	}

	function search() {
		var url = 'http://test.com/kidee_admin/search_user.php';

		var opt = $(tabSearch).find('select option:selected').attr('data-opt');
		var optVal = $(tabSearch).find('input').val();
		var postData = {};
		postData[opt] = optVal;

		//function detailRender(obj) {
		//
		//}

		dataPost(url, postData, function (data) {
			if (data) {
				$(searchBody).empty();
				var rowNum = data.kids.length;
				var i = 0;
				//var dataRow;
				while (i < rowNum) {
					console.log(data.p_username);
					var dataRow = $('<tr>' +
						'<td>' + data.p_username + '</td>' +
						'<td>' + data.p_number + '</td>' +
						'<td>' + data.pid + '</td>' +
						'<td>' + data.kids[i].kid + '</td>' +
						'<td>' + data.kids[i].k_number + '</td>' +
						'<td>' + data.kids[i].imei + '</td>' +
						'<td>' + data.kids[i].k_nickname + '</td>' +
						'<td>' + data.kids[i].qrcode + '</td>' +
						'</tr>');
					$(searchBody).append($(dataRow));
					i++;
				}
			}

			$(searchResult).show();

		});
	}

	function userAdd() {
		var url = 'http://test.com/kidee_admin/add_user.php';
		var postData = {};
		postData = getObj(tabUserAdd);

		dataPost(url, postData, function (data) {
			if (data && data.result == 1) {
				console.log('user add success');
			} else {
				console.log('add fail');
			}
		});

	}

	function passCha() {
		var url = 'http://test.com/kidee_admin/change_pwd.php';
		var postData = {};
		postData = getObj(tabPassCha);

		dataPost(url, postData, function (data) {
			if (data && data.result == 1) {
				console.log('Password change success');
			} else {
				console.log('change fail');
			}
		});

	}

	function userDis() {
		var url = 'http://test.com/kidee_admin/disable_user.php';
		var postData = {};
		postData = getObj(tabUserDis);

		dataPost(url, postData, function (data) {
			if (data && data.result == 1) {
				console.log('Disable user success');
			} else {
				console.log('Disable user fail');
			}
		});

	}

	function watchDis() {
		var url = 'http://test.com/kidee_admin/disable_watch.php';
		var postData = {};
		postData = getObj(tabWatchDis);

		dataPost(url, postData, function (data) {
			if (data && data.result == 1) {
				console.log('Disable watch success');
			} else {
				console.log('Disable watch fail');
			}
		});

	}

	//  todo: Page render function

	//  sidebar click binder

	(function renderStatistics() {
		//  todo: 统计数据
	})();

	function postBind(funcName, func) {
		lis.find('a[href="#' + funcName + '"]').bind('click', func);
	}

	postBind('search', function (event) {

		event.preventDefault();
	});
	postBind('user-add', function (event) {

		$(searchResult).hide();
		event.preventDefault();
	});
	postBind('pass-cha', function (event) {

		$(searchResult).hide();
		event.preventDefault();
	});
	postBind('user-dis', function (event) {

		$(searchResult).hide();
		event.preventDefault();
	});
	postBind('watch-dis', function (event) {

		$(searchResult).hide();
		event.preventDefault();
	});

	//  todo: tabs click binder  --version: 1
	//  btn group
	$(btnSearch).bind('click', function () {
		search();
	});


});