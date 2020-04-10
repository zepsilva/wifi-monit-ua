import cherrypy

class RESTResource(object):
   @cherrypy.expose
   def default(self, *vpath, **params):
      method = getattr(self, "handle_" + cherrypy.request.method, None)
      if not method:
         methods = [x.replace("handle_", "")
            for x in dir(self) if x.startswith("handle_")]
         cherrypy.response.headers["Allow"] = ",".join(methods)
         raise cherrypy.HTTPError(405, "Method not implemented.")
      return method(*vpath, **params);

class FooResource(RESTResource):
    def handle_GET(self, *vpath, **params):
        retval = "Path Elements:<br/>" + '<br/>'.join(vpath)
        query = ['%s=>%s' % (k,v) for k,v in params.items()]
        retval += "<br/>Query String Elements:<br/>" + \
            '<br/>'.join(query)
        return retval

class Root(object):
    foo = FooResource()

    @cherrypy.expose
    def index(self):
        return "REST example."

cherrypy.quickstart(Root())