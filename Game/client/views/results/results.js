Template.results.helpers({
    results: function() {
        return Results.find({}, {
            sort: {
                points: -1
            }
        });
    }
});