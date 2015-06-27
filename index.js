Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'My Title'}});
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/one');

// when you navigate to "/two" automatically render the template named "Two".
Router.route('/two');

if (Meteor.isClient) {
  Template.modal.helpers({
    routeName: function () {
      return Router.current().route.getName();
    }
  });

  Template.body.onRendered(function () {
    var c = this.autorun(function () {
      Router.current();

      Tracker.afterFlush(function () {
        $('#modal').modal();
      })
    });
    c.onInvalidate(function () {
      $('#modal').hide();
    })
  });
}
