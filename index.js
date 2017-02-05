

//var xhr = new XMLHttpRequest();
//xhr.open("GET", "https://www.flickr.com/services/feeds/photos_public.gne?id=33616145@N00&lang=en-us&format=atom", true);
//xhr.onreadystatechange = function() {
 //   if (xhr.readyState == 4) {
        // innerText does not let the attacker inject HTML elements.
//      console.log(xhr.responseXML);
  //      var xmlDoc = xhr.responseXML;
  //      var markers = xmlDoc.getElementsByTagName("entry") ;
  //      console.log(markers);
  //  }

//};
//xhr.send();
    var items = [];

    $.ajax({
        type: 'GET',
        url: 'https://www.flickr.com/services/feeds/photos_public.gne?id=33616145@N00&lang=en-us&format=atom',
        dataType: 'xml',
        error: function(xhr) {
            alert('Failed to parse feed');
        },
        success: function(xml) {
            var channel = $('entry', xml).eq(0);
            $('entry', xml).each( function() {
                var item = {};
                item.title = $(this).find('title').eq(0).text();
                item.id = $(this).find('id').eq(0).text();
                item.published = $(this).find('published').eq(0).text();
                item.updated = $(this).find('updated').eq(0).text();
                item.authorName = $(this).find('name').text();
                item.authorUri = $(this).find('uri').text();
                item.content= $(this).find('content').text();
                items.push(item);
                console.dir(item);
            });
            buildRSS(items);
        }
    });

    function buildRSS(temp) {
        items = temp;
        console.log(items[0].authorName);
        console.log(items.length);
        var table = document.getElementById('rss');
        table.setAttribute('width','auto');
        table.setAttribute('border','1');

        for (var i = 0; i < items.length; i++) {
            var newRow = table.insertRow(i);

            var newCell0 = newRow.insertCell(0);
            newCell0.width = window.innerWidth;
            newCell0.innerHTML = items[i].authorName + items[i].content;
        }
    }


