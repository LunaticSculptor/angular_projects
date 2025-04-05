"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = "https://jsonplaceholder.typicode.com/posts";
var allPosts;
var fetchData = function () {
    fetch(url)
        .then(function (res) {
        res.json().then(function (data) {
            allPosts = data;
            updateAllPosts();
            printPostData();
        });
    })
        .catch(function (error) { return console.error("Error fetching data:", error); });
};
fetchData();
var updatedPosts;
var updateAllPosts = function () {
    allPosts.forEach(function (post) {
        delete post.userId;
        delete post.body;
    });
};
var printPostData = function () {
    console.log(allPosts);
};
