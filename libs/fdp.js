/**
 * Process pseudo json fdp file
 * 
 * @param string data pseudo-json structure containing the fdp (as extracted from file)
 * @return json structure
 */
exports.processFdPFile = function(data) {
	var data = data.replace(/\r\n/g, "\n");
	
	// get rid of \t
	var re = new RegExp('(:"[^"]*)\t([^"]*")', 'g');
	while (data.match(re)) {
		data = data.replace(re,"$1" + "\\t" + "$2");
		re.lastIndex = 0;
	}
	
	// get rid of \n
	var re = new RegExp('(:"[^"]*)\n([^"]*")', 'g');
	while (data.match(re)) {
		data = data.replace(re,"$1" + "\\n" + "$2");
		re.lastIndex = 0;
	}
	
	try {
		fdpData = JSON.parse(data);
		//~ titre = fdpData.extras[1].value;
		//~ console.log(titre);
		return fdpData;
	}
	catch (err) {
		console.log('Error');
		console.log(err);
	}
};

exports.mergeFields = function(fdp, tpl) {
	var datas = {};

	datas.template = fdp.template;
	datas.pages = [];

	// for each page in tpl
	for (var i = 0 ; i < tpl.pages.length ; i++) {
		var page     = {};
		page.id      = tpl.pages[i].pid;
		page.title   = tpl.pages[i].title;

		// notes
		page.notes   = '';
		if (tpl.pages[i].notes_id) {
			// for each "extras" in tpl
			for (var j = 0 ; j < fdp.extras.length ; j++) {
				if (tpl.pages[i].notes_id == fdp.extras[j].id) {
					page.notes = fdp.extras[j].value;
				}
			}
		}	

		// if there is fields in page
		page.fields  = [];
		if (tpl.pages[i].fields) {
			// for each field in page
			for (var j = 0 ; j < tpl.pages[i].fields.length ; j++) {
				// look for field in fdp
				var field = {
					id: tpl.pages[i].fields[j].id,
					type: tpl.pages[i].fields[j].type,
					name: tpl.pages[i].fields[j].name,
					value: ''
				}
				for (var k = 0 ; k < fdp.fields.length ; k++) {
					if (tpl.pages[i].fields[j].id == fdp.fields[k].id) {
						field = { 
							id: fdp.fields[k].id,
							type: tpl.pages[i].fields[j].type,
							name: tpl.pages[i].fields[j].name,
							value: fdp.fields[k].value
						};
					}
				}
				page.fields.push(field);
			}
		}

		// items page
		page.items   = [];
		if (tpl.pages[i].items_id) {
			// for each "extras" in tpl
			var items = '';
			for (var j = 0 ; j < fdp.extras.length ; j++) {
				if (tpl.pages[i].items_id == fdp.extras[j].id) {
					items = fdp.extras[j].value;
				}
			}

			if (items !== '') {
				page.items = items.split("\t");
			}
		}

		datas.pages.push(page);
	}

	return datas;
}
