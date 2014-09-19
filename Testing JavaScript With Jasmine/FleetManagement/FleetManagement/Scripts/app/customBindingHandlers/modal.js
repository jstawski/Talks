define(["ko", "bootstrap"],
    function (ko) {
        "use strict";

        ko.bindingHandlers.modal = {
            init: function (element, valueAccessor, allBindingsAccessor) {
                var $element = $(element);

                $element.attr("tabindex", -1);

                // Default to allowing ESC to close the modal
                $element.data("keyboard", true);

                // Adust height dynamically so the modal isn't off the screen
                $element.on("shown.bs.modal", function () {
                    $element.find(".modal-body").css({
                        "max-height": ($(window).height() - 50) * 0.7 + "px"
                    });
                });

                return ko.bindingHandlers.with.init.apply(this, arguments);
            },

            update: function (element, valueAccessor) {
                var value = ko.unwrap(valueAccessor());

                $(element).modal(value ? "show" : "hide");

            }
        };
    }
);