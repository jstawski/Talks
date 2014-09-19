define(["jquery", "home"],
    function ($, homeViewModel) {
        "use strict";
        var $container = $("#container");
        homeViewModel.init($container[0]);
    }
);