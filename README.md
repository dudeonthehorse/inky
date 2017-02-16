# Kinky

Kinky is an HTML-based templating language that converts simple HTML into complex, responsive email-ready HTML. Forked from [Inky](https://github.com/zurb/inky), to using at [Kilogram](https://github.com/dudeonthehorse/kilogram) templates.

Give Kinky simple HTML like this:

```html
<wrapper width="600">
  <row>
    <column>

    </column>
  </row>
</wrapper>
```

And get complicated, but battle-tested, email-ready HTML like this:

```html
<!--[if (gte mso 9)|(IE)]>
<table width="600" align="center">
<tr>
<td>
<![endif]-->
<table width="600" style="width:100%; max-width:600px;" class="wrapper" align="center">
  <tbody>
    <tr>
      <td class="row">
        <div class="column">
          <table width="100%">
            <tr>
              <td class="cell">

              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<!--[if (gte mso 9)|(IE)]>
</td>
</tr>
</table>
<![endif]-->
```

## Installation

```bash
npm install kinky --save-dev
```

## Usage

Knky can be used standalone, as a Gulp plugin, or with a CLI. You can also access the `Kinky` parser class directly.

### Standalone

```js
var kinky = require('kinky');

kinky({
  src: 'src/pages/**/*.html',
  dest: 'dist'
}, function() {
  console.log('Done parsing.');
});
```

### With Gulp

```js
var kinky = require('kinky')

function parse() {
  gulp.src('src/pages/**/*.html')
    .pipe(kinky())
    .pipe(gulp.dest('dist'));
}
```

## Plugin Settings

- `src` (String): Glob of files to process. You don't need to supply this when using Inky with Gulp.
- `dest` (String): Folder to output processed files to. You don't need to supply this when using Inky with Gulp.
- `components` (Object): Tag names for custom components. See [custom components](#custom-components) below to learn more.
- `cheerio` (Object): cheerio settings (for available options please refer to [cheerio project at github](https://github.com/cheeriojs/cheerio)).

## Custom Elements

Kinky simplifies the process of creating HTML emails by expanding out simple tags like `<row>` and `<column>` into full table syntax. The names of the tags can be changed with the `components` setting.

Here are the names of the defaults:

```js
{
  wrapper: 'wrapper',
  button: 'button',
  row: 'row',
  column: 'column',
  cover: 'cover'
  button: 'button',
}
```
