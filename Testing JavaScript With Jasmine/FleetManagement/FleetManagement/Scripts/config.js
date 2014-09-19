// RequireJS config for app
require.config({
    baseUrl: "/Scripts/app",
    noGlobal: true,
    paths: {
        jquery: "../jquery-2.1.1",
        ko: "../knockout-3.2.0.debug",
        toastr: "../toastr",
        bootstrap: "../bootstrap"
    },
    shim: {
        bootstrap: ["jquery"],
        toastr: ["jquery"]
    }
});
