define(function (require, exports) {

var ListView = require('streamhub-sdk/views/list-view'),
    isotope = require('isotope'),
    $ = require('jquery');

function WallView (opts) {
    ListView.call(this, opts);
    var self = this;
    setInterval(function () {
        //self.$el.isotope('reLayout');
    }, 1000);
    this.on('insert', function (insertedContentView) {
        this.$el.isotope('appended', insertedContentView.$el);
        this.$el.isotope('reloadItems');
        this.$el.isotope('reLayout');
    });
}
WallView.prototype = new ListView();

WallView.prototype.elClass = 'content-wall'

WallView.prototype.setElement = function (el) {
    ListView.prototype.setElement.call(this, el);
    this.$el.isotope({
        itemSelector: '.content-wall-item'
    });
};

WallView.prototype.getContentView = function (content) {
    var CV = this.getContentViewConstructor(content);
    CV.prototype.elClass += ' content-wall-item';
    return CV;
};

exports = WallView;
return exports;
});