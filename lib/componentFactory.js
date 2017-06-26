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

        // <button>
        case this.components.button:
            var expander = '';

            // Prepare optional target attribute for the <a> element
            var target = '';
            if (element.attr('target')) {
                target = ' target=' + element.attr('target');
            }

            var classes = ['button'];
            var bgcolor;
            var radius;
            var width;
            var border;
            var color;
            color = (element.attr('color'));

            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }
            bgcolor = (element.attr('bgcolor'));
            radius = (element.attr('radius'));
            width = (element.attr('width'));
            border = (element.attr('border'));

            if (element.attr('href')) {
                inner = format('<a style="color:' + color + ' !important; border-radius: ' + radius + '" href="%s"%s><span style="color:' + color + '">%s</span></a>', element.attr('href'), target, inner);
            }

            return format('<div class="%s"><table width="' + width + '"><tr><td align="center" style="border-radius:' + radius + '; border:' + border + ';" bgcolor="' + bgcolor + '">%s</td></tr></table><div>', classes.join(' '), inner);

        // <column>
        case this.components.column:
            var classes = ['column'];
            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }

            return format('<div %s class="%s"><table width="100%"><tr><td class="cell">%s</td></tr></table></div>', attrs, classes.join(' '), inner);

        // <content>
        case this.components.content:
            var classes = ['row content'];
            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }

            return format('<tr><td %s class="%s"><column>%s</column></td></tr>', attrs, classes.join(' '), inner);

        // <cover>
        case this.components.cover:
            var classes = ['cover'];
            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }

            return format('<tr><td %s class="%s">%s</td></tr>', attrs, classes.join(' '), inner);

        // <footer>
        case this.components.footer:
            var classes = ['row footer'];
            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }

            return format('<tr><td %s class="%s"><column>%s</column></td></tr>', attrs, classes.join(' '), inner);

        // <header>
		case this.components.header:
			var classes = ['row header'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<tr><td %s class="%s"><column>%s</column></td></tr>', attrs, classes.join(' '), inner);

        // <hr>
        case this.components.hr:
            var classes = ['hr'];
            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }

            return format('<p %s class="%s"><img style="width:100%; height:1px;" src="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="></p>', attrs, classes.join(' '), inner);

        // <row>
        case this.components.row:
            var classes = ['row'];
            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }

            return format('<tr><td %s class="%s">%s</td></tr>', attrs, classes.join(' '), inner);

        // <section>
        case this.components.section:
            var classes = ['section'];
            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }

            return format('<table width="100%"><tr><td %s class="%s" align="center" style="text-align:center;">%s</td></tr></table>', attrs, classes.join(' '), inner);

        // <wrapper>
        case this.components.wrapper:
            var classes = ['wrapper'];
            var width;
            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }
            width = (element.attr('width'));

            return format('<!--[if (gte mso 9)|(IE)]><table width="' + width + '" align="center"><tr><td><![endif]--><table width="' + width + '" %s style="width:100%; Margin:0 auto; max-width:' + width + 'px;" align="center" class="%s">%s</table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->', attrs, classes.join(' '), inner);

        default:
            // If it's not a custom component, return it as-is
            return format('<tr><td>%s</td></tr>', $.html(element, this.cheerioOpts));
    }
}
