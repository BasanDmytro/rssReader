 function parseRSS() {
        var form = document.forms[0];
        var select = form.elements.url;
        var urlSelected;
        for (var i = 0; i < select.options.length; i++) {
            var option = select.options[i];
            if(option.selected) {
                urlSelected = option.value;
            }
        }
        parseXML(urlSelected);
    }

    function parseXML(url) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'xml',
            error: function(xhr) {
                alert('Failed to parse feed');
            },
            success: function(xml) {
                var channel = $('entry', xml).eq(0);
                var items = [];
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
    }

    function buildRSS(temp) {
        var items = temp;
        console.log(items[0].authorName);
        console.log(items.length);
        var table = document.getElementById('rss');
        table.setAttribute('width','auto');
        table.setAttribute('border','1');
        for (var i = 0; i < items.length; i++) {
            var newRow = table.insertRow(i);
            var newCell0 = newRow.insertCell(0);
            newCell0.width = window.innerWidth;
            var date = new Date(items[i].published);
            newCell0.innerHTML = "<b>" + items[i].title + "</b>" + "<hr>" + date + "<br>" + items[i].content;
        }
    }


