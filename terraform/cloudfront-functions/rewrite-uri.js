function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri === "/") {
    return request;
  }

  if (uri.charAt(uri.length - 1) === "/") {
    uri = uri.slice(0, -1);
  }

  var lastSegment = uri.substring(uri.lastIndexOf("/") + 1);
  if (lastSegment.indexOf(".") === -1) {
    request.uri = uri + ".html";
  }

  return request;
}
