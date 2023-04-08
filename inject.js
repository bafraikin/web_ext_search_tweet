


//		https://stackoverflow.com/questions/61021084/webextension-how-to-transparently-modify-xmlhttprequests


function begin_search() {
		if (window.request_augmented === true)
			return;
		else
			window.request_augmented = true;

		open_real = XMLHttpRequest.prototype.open;
		good_request_pattern = new RegExp(/Likes/i);
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
		//https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts
//		window.wrappedJSObject.XMLHttpRequest = cloneInto(XMLHttpRequest, window, {cloneFunctions: true});
	
}

begin_search();
//
//
