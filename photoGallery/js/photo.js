var Image = Backbone.Model.extend({
    emptyURL: "/images/image.jpg",
    emptyTitle: "No photo",
    defaults: {
        visibleImage: 0,
        preview: 0
    },
    initialize: function(options) {
        if (!this.get("uri")) {
            this.set({"uri": this.emptyURL});
        }
        if (!this.get("title")) {
            this.set({"title": this.emptyTitle});
        }
    },
    getTitle : function() {
        return this.get("title");
    },
    getUri: function () {
        return this.get("uri")
    },
    setUri: function (uri) {
        return this.set("uri", uri)
    },
    getPreview: function () {
        return this.get("preview")
    },
    setView: function (value) {
        this.set('visibleImage', value);
    },
    setPrev: function() {
        this.set('preview', 1);
    },
    setNoPreview: function () {
        this.set('preview', 0);
    }
});

var ImagesCollection = Backbone.Collection.extend({
    model: Image
});

var images = new ImagesCollection;

function addImagesToCollection() {
    var imagesStorage = JSON.parse(localStorage.getItem('images'));
    images.reset();
    for (var i = 0; i < imagesStorage.length; i++) {
        var image = new Image;
        image.set({title: imagesStorage[i].title, uri: imagesStorage[i].uri});
        images.push(image);
    }
}


var ContactView = Backbone.View.extend({
    tagName: "article",
    className: "contact-container",
    template: $("#contactTemplate").html(),
    render: function () {
        var tmpl = _.template(this.template);
        this.$el.html(tmpl(this.model.toJSON()));
        return this;
    }
});


var ImageView = Backbone.View.extend({
    el: $("#bigImage"),
    initialize: function () {
        addImagesToCollection();
        this.collection = images;
        console.log(this.collection);
        this.collection.models[0].setView(1);
        this.render();
    },
    render: function () {
        _.each(this.collection.models, function (item) {
            if (item.get('visibleImage') == 1) {
                this.$el.html('<img src="' + item.get('uri') + '" + id="bigImage" />');
            }
        }, this);
    }
});


var PreviewOne = Backbone.View.extend({
    initialize: function () {
        this.collection = images;
        this.render();

    },
    render: function () {
        var i3 = 3;

        document.getElementById('smallImage1').innerHTML = ('<img src="' + images.models[i3-3].get('uri') + '"  />');
        document.getElementById('smallImage2').innerHTML = ('<img src="' + images.models[i3-2].get('uri') + '"  />');
        document.getElementById('smallImage3').innerHTML = ('<img src="' + images.models[i3-1].get('uri') + '"  />');

        document.getElementById('smallImage1').addEventListener( "click", (function () {
            document.getElementById('bigImage').innerHTML = document.getElementById('smallImage1').innerHTML
            console.log(document.getElementById('bigImage').innerHTML)
        }) );
        document.getElementById('smallImage2').addEventListener( "click", (function () {
            document.getElementById('bigImage').innerHTML = document.getElementById('smallImage2').innerHTML
        }) );
        document.getElementById('smallImage3').addEventListener( "click", (function () {
            document.getElementById('bigImage').innerHTML = document.getElementById('smallImage3').innerHTML
        }) );
        document.getElementById('rightButton').addEventListener( "click", (function () {
            if (i3 < images.models.length) {
                document.getElementById('smallImage3').innerHTML = ('<img src="' + images.models[i3].getUri() + '"  />');
                document.getElementById('smallImage2').innerHTML = ('<img src="' + images.models[i3-1].getUri() + '"  />');
                document.getElementById('smallImage1').innerHTML = ('<img src="' + images.models[i3-2].getUri() + '"  />');
                i3++;
            }
        }));
        document.getElementById('leftButton').addEventListener( "click", (function () {
            if (i3 > 3) {
                document.getElementById('smallImage3').innerHTML = ('<img src="' + images.models[i3 - 2].getUri() + '"  />');
                document.getElementById('smallImage2').innerHTML = ('<img src="' + images.models[i3 - 3].getUri() + '"  />');
                document.getElementById('smallImage1').innerHTML = ('<img src="' + images.models[i3 - 4].getUri() + '"  />');
                i3--;
            }
        }));
    }
});


var directory = new ImageView();

var prew1 = new PreviewOne();

