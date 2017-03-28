
walk(document.body);

document.addEventListener("DOMSubtreeModified", function(event){
//		console.log(event);
  //      walk(document.body);
});

function walk(node) 
{

	// I stole this function from here:
	// http://is.gd/mwZp7E
    // And I stole it from Cloud-to-Butt
	
	var child, next;
	switch ( node.nodeType )  {
			case 1:  // Element
			case 9:  // Document
			case 11: // Document fragment
				if (node.nodeType==1 && node.hasAttribute("processed")) {
					break;
				} else {

					child = node.firstChild; 
					while ( child )  {
						next = child.nextSibling;
						walk(child);
						child = next;
					}
					break;
				}
			case 3: // Text node
				handleText(node);
				break;
	}
}

function handleText(textNode)  {
	
	if (textNode.parentElement.tagName=="SCRIPT" ) {
		return;
	}
	if (textNode.parentElement.className.indexOf("already-ided")>-1) {
		return;
	}
	var v = textNode.nodeValue;
	var textNodes = [];
	var matches=v.match(/\bfemales\b/ig);
	if (matches==null) {
		return;
	}
	console.log(textNode.nodeValue.substr(0,10));
	var newNode = document.createElement("span");
	newNode.className="already-ided";
	var textSize = parseInt(window.getComputedStyle(textNode.parentNode).fontSize,10);
	for (match in matches) {
		var mi = v.indexOf(matches[match]);

		newNode.appendChild(document.createTextNode(v.substring(0,mi)));
		var img = document.createElement("img");

		img.src = chrome.extension.getURL("images/females-2.png");
		img.width=textSize;
		img.height=textSize;

		newNode.appendChild(img);
		newNode.appendChild(document.createTextNode(" "));
		newNode.appendChild(document.createTextNode(matches[match]));
		newNode.appendChild(document.createTextNode(" "));
		newNode.appendChild(img.cloneNode());
		v = v.substring(mi+matches[match].length,v.length);
	}
	newNode.appendChild(document.createTextNode(v));
	var parent = textNode.parentNode;
	textNode.remove();
	parent.appendChild(newNode);
}


