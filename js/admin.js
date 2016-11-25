$(function () {
	//	sidebar
	(function activeToggle() {
		var li = $('.sidebar .nav li');
		$.each(li, function(index, element){
			//console.log('index: ' + index);
			//console.log('value: ' + $(element).find('a').attr('class'));
			$(element).click(function() {
				rmActive(li);
				$(this).attr('class', 'active');
			});
		});
	})();

	function rmActive(ele) {
		$.each(ele, function(index, value) {
			$(value).removeClass();
		});
	}
});