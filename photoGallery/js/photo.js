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
        _.each(this.collection.models, function (item) { // проход по колекции моделей
            if (item.get('visibleImage') == 1) { //проверка видно или нет
                this.$el.html('<img src="' + item.get('uri') + '" + id="bigImage" />');
            }
        }, this);
    }
});


var PreviewOne = Backbone.View.extend({
    initialize: function () {
        images.models[0].setPrev();
        images.models[1].setPrev();
        images.models[2].setPrev();
        this.collection = images;
        console.log(this.collection);
        this.render();

    },
    render: function () {
        var imgs = [];
        var i1 = 1;
        var i2 = 2;
        var i3 = 3;

        _.each(this.collection.models, function (item) {
            if (item.getPreview() == 1) {
                var contactView = new ContactView({
                    model: item
                });
                console.log(contactView);
                imgs.push(contactView);
            }
        }, this);
        document.getElementById('smallImage1').innerHTML = ('<img src="' + imgs[0].model.get('uri') + '"  />');
        document.getElementById('smallImage2').innerHTML = ('<img src="' + imgs[1].model.get('uri') + '"  />');
        document.getElementById('smallImage3').innerHTML = ('<img src="' + imgs[2].model.get('uri') + '"  />');

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
                imgs[0].model.setUri(imgs[1].model.get('uri'));
                imgs[1].model.setUri(imgs[2].model.get('uri'));
                imgs[2].model.setUri(images.models[i3].getUri());
                document.getElementById('smallImage3').innerHTML = ('<img src="' + imgs[2].model.get('uri') + '"  />');
                document.getElementById('smallImage2').innerHTML = ('<img src="' + imgs[1].model.get('uri') + '"  />');
                document.getElementById('smallImage1').innerHTML = ('<img src="' + imgs[0].model.get('uri') + '"  />');
                i3++;
            }
        }));
        document.getElementById('leftButton').addEventListener( "click", (function () {
            if (i3 > 3) {
                imgs[2].model.setUri(imgs[1].model.get('uri'));
                imgs[1].model.setUri(imgs[0].model.get('uri'));
                imgs[0].model.setUri(images.models[i3-4].getUri());
                document.getElementById('smallImage3').innerHTML = ('<img src="' + imgs[2].model.get('uri') + '"  />');
                document.getElementById('smallImage2').innerHTML = ('<img src="' + imgs[1].model.get('uri') + '"  />');
                document.getElementById('smallImage1').innerHTML = ('<img src="' + imgs[0].model.get('uri') + '"  />');
                i3--;
            }
        }));
    }
});



var directory = new ImageView();

var prew1 = new PreviewOne();

