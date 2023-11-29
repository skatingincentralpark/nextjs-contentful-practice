## Exploring the schema with GraphiQL

You can explore and inspect the schema of a space using the GraphiQL, an in-browser GraphQL IDE.

To open GraphiQL server visit the `https://graphql.contentful.com/content/v1/spaces/{SPACE}/explore?access_token={CDA_TOKEN}` URL in your browser. You must provide the CDA_TOKEN as a query parameter.

## Query Complexity Error

[Github Issue](https://github.com/vercel/next.js/discussions/33642)

https://www.contentful.com/developers/docs/references/graphql/#/introduction/query-complexity-limits

'Query cannot be executed. The maximum allowed complexity for a query is 11000 but it was 100200. Simplify the query e.g. by setting lower limits for collections.'

Fix: Update the settings for the content model Rich Text type to limit the number of the linked entities, blocks, etc. In the validation tab of the settings, I just checked all of the "Limit number of..." checkboxes and set the upper limit to 5.

## Styling Content With Prose

Something happening with Markdown component, overriding/not applying classNames. I have to do it in parent element with tailwind prose utility:

```tsx
<ParentElement
  className={`
        prose
        prose-img:w-full
    `}
>
  <Child />
</ParentElement>
```
