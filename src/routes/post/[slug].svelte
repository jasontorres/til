<script context="module">
  import { onMount } from "svelte";
  import fetch from "node-fetch";
  import marked from "marked";

  import { siteName, datoToken } from "../../../config";

  export async function preload(page, session) {
    const { slug } = page.params;
    const result = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${datoToken}`
      },
      body: JSON.stringify({
        query: `query getPost {
        post(filter: {slug: {eq: "${slug}"}}) {
          body
          id
          slug
          title
          updatedAt
          createdAt
          published
          _publishedAt
          _seoMetaTags(locale: en) {
            attributes
            content
            tag
          }
        }
      }`
      })
    }).then(res => res.json());

    const post = result.data.post;

    return { post };
  }

  function formatDate(date) {
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }
</script>

<script>
  export let post;
</script>

<!-- <svelte:head>
  <title>{post.title}</title>
</svelte:head>
 -->
<main>
  <h1>
    <a href="/">{siteName}</a>
    <span>by Jason Torres</span>
  </h1>

  <section>
    <a hrel="prefetch" href="post/{post.slug}">
      <h2>{post.title}</h2>
    </a>
    <p>
      {@html marked(post.body)}
    </p>
    <p>Posted: {formatDate(new Date(post._publishedAt))}</p>
  </section>

</main>

<footer>
  &copy; Jason Torres of
  <a href="https://www.mashupgarage.com">Mashup Garage</a>
  .
  <br />
  This site is built on Svelte, NewCSS, and DatoCMS. Source code is available at
  <a href="https://github.com/jasontorres/til">Github.</a>
</footer>
