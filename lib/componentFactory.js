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

            var classes = ['button']

            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }
            var bgcolor = (element.attr('bgcolor'));
            var radius = (element.attr('radius'));
            var width = (element.attr('width'));
            var border = (element.attr('border'));
            var color = (element.attr('color'));

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

            var cell = (element.attr('cell')) || '16px';

            return format('<div %s class="%s" style="display:inline-block; width:100%; max-width:512px; vertical-align:top;"><table width="100%"><tr><td style="text-align:left; padding:'+cell+'">%s</td></tr></table></div>', attrs, classes.join(' '), inner);

        // <hr>
        case this.components.hr:

            return format('<table width="100%"><tr><td height="16"></td></tr><tr><td class="hr" style="font-size:0; line-height:0;"></td></tr><tr><td height="16"></td></table>');

        // <icon>
        case this.components.icon:
            var classes = ['icon'];
            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }

            var href = element.attr('href');
            var src = element.attr('src');
            var width = element.attr('width');

            return format('<a %s class="%s" href="'+href+'" style="border-bottom:none;"><img alt="" width="'+width+'" src="'+src+'"></a>', attrs, classes.join(' '), inner);

        // <row>
        case this.components.row:
            var classes = ['row'];
            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }

            return format('<tr><td %s class="%s" style="text-align:center; font-size:0;">%s</td></tr>', attrs, classes.join(' '), inner);

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
            if (element.attr('class')) {
                classes = classes.concat(element.attr('class').split(' '));
            }
            var width = (element.attr('width'));

            return format('<!--[if (gte mso 9)|(IE)]><table width="' + width + '" align="center"><tr><td><![endif]--><table width="' + width + '" %s style="width:100%; Margin:0 auto; max-width:' + width + 'px;" align="center" class="%s">%s</table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->', attrs, classes.join(' '), inner);

        default:
            // If it's not a custom component, return it as-is
            return format('<tr><td>%s</td></tr>', $.html(element, this.cheerioOpts));
    }
}
