searchLights
============

highlighting search results


  <strong>selectType:</strong><br>
  &nbsp;&nbsp;"color" - color text style<br>
  &nbsp;&nbsp;"background" - background text style<br>
  <strong>color:</strong><br>
  &nbsp;&nbsp;[Specifies the text color]<br>

  <strong>Initial setup:</strong><br>
  var search = searchLights.init({<br>
		&nbsp;&nbsp;selectType: "color",<br>
		&nbsp;&nbsp;color: "#45BDD4"<br>
	});<br>

  <strong>Use:</strong><br>
  var new_text = search.useLight(searchText , contentText);
