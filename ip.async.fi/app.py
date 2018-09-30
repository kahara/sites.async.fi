# http://stackoverflow.com/a/7839576/583349
def get_client_address(environ):
    try:
        return environ['HTTP_X_FORWARDED_FOR']
        #return environ['HTTP_X_FORWARDED_FOR'].split(',')[-1].strip()
    except KeyError:
        return environ['REMOTE_ADDR']

def app(env, start_response):
    dump = '\n'.join(["{}: {}".format(key, env[key]) for key in env])
    start_response('200 OK', [('Content-Type','text/plain')])
    return [dump.encode()]

    #client_address = str(get_client_address(env))
    #start_response('200 OK', [('Content-Type','text/plain'), ('X-Your-IP-Address', client_address)])
    #return [client_address.encode()]
