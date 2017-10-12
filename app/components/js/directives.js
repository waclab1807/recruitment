/**
 * custom directive for single comment
 */
app.directive('singleComment', function () {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			comment: '='
		},
		template:
		'<li class="well single-comment">' +
		'<h3 class="text-center">{{ comment.name }}</h3><hr>' +
		'{{ comment.body }} <br><br>' +
		'<blockquote>' +
		'Autor: {{ comment.email }}</blockquote>' +
		'</li>'
	};
});