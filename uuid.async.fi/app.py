import uuid

def app(env, start_response):
    start_response('200 OK', [('Content-Type','text/plain')])
    return [str(uuid.uuid4()).encode()]
