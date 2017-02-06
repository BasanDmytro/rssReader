
var imagesStorage = JSON.parse(localStorage.getItem('images'));

var Image = Backbone.Model.extend({
    emptyURL: "/images/image.jpg",
    emptyTitle: "No photo",
    initialize: function() {
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
    }
});

var ImagesCollection = Backbone.Collection.extend({
    model: Image
});

var images = new ImagesCollection;

function addImagesToCollection() {
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


var ImagesView = Backbone.View.extend({
    el: $("#gallery"),
    initialize: function () {
        addImagesToCollection();
        this.collection = images;
        this.render();
    },
    render: function () {
        var that = this;
        _.each(this.collection.models, function (item) {
            that.renderContact(item);
        }, this);
    },
    renderContact: function (item) {
        var contactView = new ContactView({
            model: item
        });
        this.$el.innerHTML = "asdas";
        this.$el.append(contactView.render().el);
    }

});


var directory = new ImagesView();
