
(function () {

	if (window.search_twitter_is_running_in_this_tab)
		return;
	else
		window.search_twitter_is_running_in_this_tab = true;

	function remove_this_tweet(tweet)
	{
		tweet.parentNode.parentNode.parentNode.remove();
	}

	function search(to_search) 
	{
		to_search = to_search.split(" ").map(word => `(${word})`).join("|");
		let regex = new RegExp(to_search, "i");
		let tweets = Array.from(document.querySelectorAll("article"));
		let index = -1;
		let tweet;
		while(tweet = tweets[++index])
		{
			if (!regex.test(tweet.textContent))
			{
				let is_this_quote_tweet = tweet.querySelectorAll('[data-testid="tweetText"]');
				if (is_this_quote_tweet.length > 1)
				{
					if (!regex.test(is_this_quote_tweet[1].textContent))
						remove_this_tweet(tweet)
				}
				else
				{
					remove_this_tweet(tweet)
				}
			}
		}
	}
	function begin_search(text) {

		open_real = XMLHttpRequest.prototype.open;
		good_request_pattern = new RegExp(/Likes/);
		XMLHttpRequest.prototype.open = function() {
			if (arguments[1] && good_request_pattern.test(arguments[1]))
			{
				const parsed_url = new URL(arguments[1]);
				let variables = JSON.parse(parsed_url.searchParams.get("variables"));
				variables.count = 50;
				parsed_url.searchParams.set("variables", JSON.stringify(variables));
				arguments[1] = parsed_url.href;
			}
			open_real.apply(this, arguments);
		}
	}

	function reset() {

	}

	browser.runtime.onMessage.addListener((message) => {
		console.log(window.search_input)
		if (message.command == "search") {
			{
				window.search_input = message.input_search;
				window.addEventListener("scroll", () => console.log("coucou"))
				search(message.input_search);
			}
		} else if (message.command == "reset") {
			reset();
		}
	});

})();
