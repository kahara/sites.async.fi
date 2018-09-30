var Face = (function (document, moment) {

    var body = document.getElementsByTagName('body')[0];

    body.style.fontSize = 0.375 * body.offsetWidth + '%';

    return {
	create: function(row, column, timezone, format, rows, columns) {
	    if(timezone === undefined) {
		return undefined;
	    }

	    console.log('create face', row, column, timezone);

	    if(!moment.tz.zone(timezone)) {
		return undefined;
	    }

	    var face = {
		row: row,
		column: column,
		timezone: timezone,
		timezone_string: timezone.split('/')[1],
		time_string: undefined
	    };

	    var element_root = document.createElement('div');
	    element_root.style.height = Math.floor(100/rows) + '%';
	    element_root.style.width = Math.floor(100/columns) + '%';
	    element_root.style.margin = '0px';
	    element_root.style.border = '0px';
	    element_root.style.padding = '0px';
	    element_root.style.float = 'left';

	    console.log(element_root.style);

	    var element_timezone = document.createElement('p');
	    element_timezone.style.fontSize = '65%';
	    element_timezone.style.paddingTop = '25%';
	    element_timezone.style.paddingLeft = '15%';

	    var textnode_timezone = document.createTextNode(face['timezone_string']);
	    element_timezone.appendChild(textnode_timezone);
	    element_root.appendChild(element_timezone);
	    
	    var element_time = document.createElement('p');
	    element_time.style.paddingLeft = '15%';
	    var textnode_time = document.createTextNode('…');
	    element_time.appendChild(textnode_time);
	    element_root.appendChild(element_time);

	    body.appendChild(element_root);
	    face['element_root'] = element_root;
	    face['textnode_time'] = textnode_time;

	    face['render'] = function() {
		try {
		    var time = moment.tz(moment(), face['timezone']).format(format);
		    if(time != face['time_string']) {
			face['time_string'] = time;
			face['textnode_time'].nodeValue = time;
		    }
		} catch(e) {}

		window.requestAnimationFrame(face.render);
	    }

	    return face;
	}
    };
})(document, moment);
