const { oneLine } = require('~lib/common-tags')
const chalkFactory = require('~lib/chalk')

const logger = chalkFactory('shortcodes: crosslink')

/**
 * Accordion component
 *
 * @param      {String}  content  content to render in the crosslink body
 * @param      {String}  heading  content to render in the crosslink heading
 * @param      {String}  url      where the link button goes
 *
 * @return     {String}  An HTML <details> element with <summary> and <section>
 */
module.exports = function (eleventyConfig, { page }) {
  const markdownify = eleventyConfig.getFilter('markdownify')
  const slugify = eleventyConfig.getFilter('slugify')

  return (content, heading, url) => {
    if (!content || !heading) {
      logger.warn(`An accordion section on "${page.url}" does not include the required heading parameter, no accordion was created`)
      return ''
    }

    // Define slug
    const slug = slugify(heading)

    const printComponent = `
    <div></div>
    `

    const htmlComponent = `
      <aside class="crosslink-box" data-outputs-include="html">
        <h3>
          ${markdownify(heading, { inline: false })}
        </h3>
        <div class="crosslink-body">${markdownify(content, { inline: false })}</div>
        <div>
          <a class="button" href="${encodeURIComponent(url)}">Learn more &rarr;</a>
        </div>
      </aside>
    ` 

    return oneLine`
      ${printComponent}
      ${htmlComponent}
    `
  }
}
