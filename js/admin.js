$(function () {
	var tabs = $('#tabs');
	var tabSearch = $('#search'),
		tabUserAdd = $('#user-add'),
		tabPassCha = $('#pass-cha'),
		tabUserDis = $('#user-dis'),
		tabWatchDis = $('#watch-dis');

	//  public
	(function activeToggle() {
		var li = $('.sidebar .nav li');
		$.each(li, function (index, element) {
			//console.log('index: ' + index);
			//console.log('value: ' + $(element).find('a').attr('class'));
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

	//setTimeout(getStatistics, 100);

	function search() {
		var url = 'http://test.com/kidee_admin/search_user.php';

		var opt = $(tabSearch).find('select option:selected').attr('data-opt');
		var optVal = $(tabSearch).find('input').val();
		var postData = {};
		postData[opt] = optVal;

		dataPost(url, postData, function (data) {
			if (data) {
				console.log(data);
			}
		});

		//console.log(postData);
	}

	//setTimeout(search, 3000);

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

	//setTimeout(userAdd, 4000);

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

	//setTimeout(passCha, 5000);

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

	//setTimeout(userDis, 2000);

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

	//setTimeout(watchDis, 2000);
});