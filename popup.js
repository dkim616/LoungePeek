var matches_json;
var matches = [];

document.addEventListener('DOMContentLoaded', function() {
	// YUI().use('yql', function(Y) {
	// 	Y.YQL("select * from html where url='http://www.csgolounge.com'", function(r) {
	// 		matches_json = (r.query.results.body.main.section[1].article.div);
	// 		createBoxes();
	// 	});
	// });
});

var createBoxes = function() {
	matches_json.forEach(function(match, index) {
		matches.push({
			id: function() {
				var index = match.div[1].div.a.href.indexOf("=");
				return match.div[1].div.a.href.substring(index + 1);
			}(),

			time: function() {
				var string = match.div[0].div[0].content;
				var index = string.indexOf("\n");
				return string.substring(0, index);
			}(),

			status: function() {
				if (match.div[0].div[0].span.constructor === Array) {
					return match.div[0].div[0].span[0].content.substring(1);
				} else {
					return match.div[0].div[0].span.content.substring(1);
				}
			}(),

			link: "http://csgolounge.com/" + match.div[1].div.a.href,
			league: match.div[0].div[1].content,

			team1: match.div[1].div.div[0].div[1].b,
			team1Logo: function() {
				var string = match.div[1].div.div[0].div[0].style;
				var index = string.indexOf("url(\'");
				return string.substring(index + 5, string.length - 2);
			}(),
			team1Odds: match.div[1].div.div[0].div[1].i,

			team2: match.div[1].div.div[2].div[1].b,
			team2Logo: function() {
				var string = match.div[1].div.div[2].div[0].style;
				var index = string.indexOf("url(\'");
				return string.substring(index + 5, string.length - 2);
			}(),
			team2Odds: match.div[1].div.div[2].div[1].i,

			bestOf: match.div[1].div.div[1].span.content
		});
	});

	matches.forEach(function(match, index) {
		var fragment = create(
			"<div class='matchBox'>" +
			index +
			"</div>"
			);
		document.getElementById("boxes").appendChild(fragment);
	});
	console.log(matches);
};

function create(htmlStr) {
    var frag = document.createDocumentFragment();
    var temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    
    while (temp.firstChild) {
    	frag.appendChild(temp.firstChild);
    }
    return frag;
}
