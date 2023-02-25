


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



