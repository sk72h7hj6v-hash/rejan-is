/* GitHub Pages project sites: without a trailing slash on the repo path, relative URLs like
   "posts/foo.html" wrongly resolve to "/posts/foo.html". Insert <base> only on github.io. */
(function () {
  if (location.protocol === "file:" || !location.hostname.endsWith("github.io")) {
    return;
  }
  var parts = location.pathname.split("/").filter(Boolean);
  var repo = "rejan-is";
  var idx = parts.indexOf(repo);
  if (idx === -1) {
    return;
  }
  var baseUrl = location.origin + "/" + parts.slice(0, idx + 1).join("/") + "/";
  var b = document.createElement("base");
  b.href = baseUrl;
  document.head.insertBefore(b, document.head.firstChild);
})();
