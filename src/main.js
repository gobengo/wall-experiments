define(function (require, exports) {

var ListView = require('streamhub-sdk/views/list-view'),
    isotope = require('isotope'),
    $ = require('jquery');

function WallView (opts) {
    ListView.call(this, opts);
    var self = this;
    setInterval(function () {
        self.$el.isotope('reLayout');
    }, 1000);
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

WallView.prototype._insertContentView = function (contentView) {
    ListView.prototype._insertContentView.call(this, contentView);
    this.$el.isotope('appended', contentView.$el);
}

exports = WallView;
return exports;
});