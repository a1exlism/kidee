$(function () {
	var tabs = $('#tabs');
	//  sidebar
	var tabSearch = $('#search'),
		tabUserAdd = $('#user-add'),
		tabPassCha = $('#pass-cha'),
		tabUserDis = $('#user-dis'),
		tabWatchDis = $('#watch-dis');
	var lis = $('.sidebar li');
	var notify = $(tabs).find('.notify');
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
		$(tabs).children('div:not(.notify)').hide();
		$(notify).find('p').hide();
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

	function notifyShow(className, msg) {
		$(notify).find('p').hide();
		$(notify).find('.' + className).html(msg);
		$(notify).find('.' + className).show();
	}

	//  RESTful

	function getStatistics() {
		var url = 'http://test.com/kidee_admin/get.php';
		dataPost(url, '', function (data) {
			$('.navbar span[data-num="watch"]').html(data.k_number);
			$('.navbar span[data-num="user"]').html(data.p_number);
		});
	}

	function search() {
		var url = 'http://test.com/kidee_admin/search_user.php';
		var opt = $(tabSearch).find('select option:selected').attr('data-opt');
		var optVal = $(tabSearch).find('input').val();
		var postData = {};
		postData[opt] = optVal;

		dataPost(url, postData, function (data) {
			if (data) {
				$(searchBody).empty();
				var rowNum = data.kids.length;
				var i = 0;
				while (i < rowNum) {
					var dataRow = $('<tr>' +
						'<td>' + data.p_username + '</td>' +
						'<td>' + data.p_number + '</td>' +
						'<td>' + data.pid + '</td>' +
						'<td>' + data.kids[i].kid + '</td>' +
						'<td>' + data.kids[i].k_number + '</td>' +
						'<td>' + data.kids[i].imei + '</td>' +
						'<td>' + data.kids[i].relationship + '</td>' +
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
				notifyShow('success', 'User add successfully.');
			} else {
				notifyShow('error', 'User add failed, try again.');
			}
		});

	}

	function passCha() {
		var url = 'http://test.com/kidee_admin/change_pwd.php';
		var postData = {};
		postData = getObj(tabPassCha);

		dataPost(url, postData, function (data) {
			if (data && data.result == 1) {
				notifyShow('success', 'User password changed.');
			} else {
				notifyShow('error', 'Password change failed, try again.');
			}
		});

	}

	function userDis() {
		var url = 'http://test.com/kidee_admin/disable_user.php';
		var postData = {};
		postData = getObj(tabUserDis);
		dataPost(url, postData, function (data) {
			if (data && data.result == 1) {
				notifyShow('success', 'User disabled successfully.');
			} else {
				notifyShow('error', 'User disable failed, try again.');
			}
		});
	}

	function watchDis() {
		var url = 'http://test.com/kidee_admin/disable_watch.php';
		var postData = {};
		postData = getObj(tabWatchDis);

		dataPost(url, postData, function (data) {
			if (data && data.result == 1) {
				notifyShow('success', 'Watch disabled successfully.');
			} else {
				notifyShow('error', 'Watch disabled failed, try again.');
			}
		});

	}

	//  sidebar click binder

	(function renderStatistics() {
		getStatistics();
		setInterval(getStatistics, 30 * 1000);
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

	//  btn group

	$(btnSearch).bind('click', function () {
		search();
	});

	$(btnUserAdd).bind('click', function () {
		userAdd();
	});

	$(btnPassCha).bind('click', function () {
		passCha();
	});

	$(btnUserDis).bind('click', function () {
		userDis();
	});

	$(btnWatchDis).bind('click', function () {
		watchDis();
	});

	//  header btn toggle
	function langCha(lang) {
		var dropdown = $('.dropdown-menu');
		var headLan = $('.dropdown-toggle span[data-lang="now"]');
		switch (lang) {
			case 'chinese':
				$(headLan).html('中文');
				break;
			case 'english':
				$(headLan).html('English');
				break;
			case 'spanish':
				$(headLan).html('Español');
				break;
			default:  //  english
				$(headLan).html('English');
		}
	}


	//  todo: i18n
	function langSet(lang) {
		var langs = {
			chinese: 'zh_CN.json',
			english: 'en_US.json',
			spanish: 'es_ES.json'
		};

		var url = 'http://test.com/kidee/langs/' + langs[lang];
		$.get(url, function (data) {
			//  todo-0:  i18n Render

			console.log(data);

			//  nav
			var nav = $('nav');
			$(nav).find('.navbar-header span[data-locale="navbar-brand"]').text(data['nav-brand']);
			$(nav).find('.navbar-right span[data-locale="nav-right-0"]').text(data['nav-right-0'] + ': ');
			$(nav).find('.navbar-right span[data-locale="nav-right-1"]').text(data['nav-right-1'] + ': ');
			//  tab
			$('.nav li > a[data-locale^="tab-"]').each(function (index, ele) {
				console.log(index);
				console.log(data['tab-name']['tab-' + index]);
				$(ele).text(data['tab-name']['tab-' + index]);
			});
			//  tab-search
			var dataSearch = data['tab-search'];
			$(tabSearch).find('h2').html(dataSearch['title']);
			$(tabSearch).find('label').text(dataSearch['label'] + ': ');
			$(tabSearch).find('option').each(function (index, ele) {
				$(ele).text(dataSearch['section']['op-' + index]);
			});
			//  tab-userAdd
			var dataUserAdd = data['tab-useradd'];
			$(tabUserAdd).find('h2').text(dataUserAdd['title']);
			$(tabUserAdd).find('label').each(function (index, ele) {
				$(ele).text(dataUserAdd['label-' + index]);
			});
			$(tabUserAdd).find('button').text(dataUserAdd['btn']);
			//  tab-passCha
			var dataPassCha = data['tab-passcha'];
			$(tabPassCha).find('h2').text(dataPassCha['title']);
			$(tabPassCha).find('label').each(function (index, ele) {
				$(ele).text(dataPassCha['label-' + index] + ':');
			});
			$(tabPassCha).find('button').text(dataPassCha['btn']);
			//  tab-userDis
			var dataUserDis = data['tab-userdis'];
			$(tabUserDis).find('h2').text(dataUserDis['title']);
			$(tabUserDis).find('label').text(dataUserDis['label'] + ': ');
			$(tabUserDis).find('button').text(dataUserDis['btn']);
			//  tab-watchDis
			var dataWatchDis = data['tab-watchdis'];
			$(tabWatchDis).find('h2').text(dataWatchDis['title']);
			$(tabWatchDis).find('label').text(dataWatchDis['label'] + ': ');
			$(tabWatchDis).find('button').text(dataWatchDis['btn']);

		});
	}


	(function lanToggle() {
		$('.dropdown-menu').each(function (index, element) {
			$(element).find('a').bind('click', function () {
				var lang = $(this).attr('data-lang');
				langCha(lang);
				langSet(lang);
			});
		});
	})();


	//  todo: 更改一下fonts源为本地

});