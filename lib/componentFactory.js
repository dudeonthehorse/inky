var format = require('util').format;
var $ = require('cheerio');
var getAttrs = require('./util/getAttrs');

/**
 * Returns output for desired custom element
 * @param {object} element - Element as a Cheerio object.
 * @returns {string} HTML converted from a custom element to table syntax.
 */
module.exports = function(element) {
	var inner = element.html();
	var attrs = getAttrs(element);

	switch (element[0].name) {

		// <row>
		case this.components.row:
			var classes = ['row'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<tr><td %s class="%s">%s</td></tr>', attrs, classes.join(' '), inner);

			// <column>
		case this.components.column:
			var classes = ['column'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<div %s class="%s"><table width="100%"><tr><td class="cell">%s</td></tr></table></div>', attrs, classes.join(' '), inner);

			// <button>
		case this.components.button:
			var expander = '';

			// Prepare optional target attribute for the <a> element
			var target = '';
			if (element.attr('target')) {
				target = ' target=' + element.attr('target');
			}

			var color;
			color = (element.attr('color'));

			// If we have the href attribute we can create an anchor for the inner of the button;
			if (element.attr('href')) {
				inner = format('<a style="color:' + color + ' !important;" href="%s"%s><span style="color:' + color + '; border-bottom: none;">%s</a>', element.attr('href'), target, inner);
			}

			// The .button class is always there, along with any others on the <button> element
			var classes = ['button'];
			var bgcolor;
			var radius;
			var width;

			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}
			bgcolor = (element.attr('bgcolor'));
			radius = (element.attr('radius'));
			width = (element.attr('width'));

			return format('<table width="' + width + '" class="%s"><tr><td align="center" style="border-radius:' + radius + ';" bgcolor="' + bgcolor + '">%s</td></tr></table>', classes.join(' '), inner);

			// <cover>
		case this.components.cover:
			var classes = ['cover'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<tr><td %s class="%s">%s</td></tr>', attrs, classes.join(' '), inner);

			// <wrapper>
		case this.components.wrapper:
			var classes = ['wrapper'];
			var width;
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}
			width = (element.attr('width'));

			return format('<!--[if (gte mso 9)|(IE)]><table width="' + width + '" align="center"><tr><td><![endif]--><table width="' + width + '" %s style="max-width:' + width + 'px;" align="center" class="%s">%s</table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->', attrs, classes.join(' '), inner);

		default:
			// If it's not a custom component, return it as-is
			return format('<tr><td>%s</td></tr>', $.html(element, this.cheerioOpts));
	}
}
