var Clock = (function (window, _, URI, Face) {

    const defaults = {
	rows: ['integer', undefined, 2],
	columns: ['integer', undefined, 3],
	faces: ['string', 'array', ['Etc/UTC', 'Europe/Stockholm', 'Europe/Helsinki', 'Europe/London', 'Europe/Berlin', 'Europe/Istanbul']],
	format: ['string', undefined, 'H:mm:ss']
    };

    var settings = {};

    var faces = [];

    return {
	init: function() {
	    var qs = new URI(location.href).query(true);
	    var keys = _.keys(qs);

	    _.forEach(_.keys(defaults), function(key) {
		if(_.contains(keys, key)) {
		    settings[key] = function (k, v, t, a) {
			if(a) {
			    var values = [];
			    _.forEach(v.split(','), function(value) {
				if(t === 'integer') {
				    values.push(parseInt(value));
				} else {
				    values.push(value);
				}
			    });
			    return values;

			} else {
			    if(t === 'integer') {
				return parseInt(v);
			    } else {
				return v;
			    }
			}

		    }(key, qs[key], defaults[key][0], defaults[key][1] != undefined);
		} else {
		    settings[key] = defaults[key][2];
		}
	    });
	    console.log('settings', settings);

	    for(i=0; i < settings['rows']; i++) {
		console.log(i);
		for(j=0; j < settings['columns']; j++) {
		    var face = Face.create(i, j, settings['faces'].shift(), settings['format'], settings['rows'], settings['columns']);
		    if(face !== undefined) {
			faces.push(face);
		    }
		}
	    }

	    console.log(faces);

	    _.forEach(faces, function(face) {
		window.requestAnimationFrame(face.render);
	    });
	}
    }

})(window, _, URI, Face);
