<script context="module">
  import { onMount } from "svelte";
  import fetch from "node-fetch";
  import marked from "marked";
  import prismjs from "prismjs";
  import { siteName, datoToken } from "../../config";


  let posts = [];

  export const preload = async (page, session) => {
    await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${datoToken}`
      },
      body: JSON.stringify({
        query: "{ allPosts(orderBy: createdAt_DESC) { title body slug _publishedAt } }"
      })
    })
      .then(res => res.json())
      .then(res => {
        posts = res.data.allPosts;
      });
  };

  function formatDate(date) {
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }

  const renderer = new marked.Renderer();
  renderer.code = function(code, lang, escaped) {
    code = this.options.highlight(code, lang);
    if (!lang) {
      return `<pre><code>${code}</code></pre>`;
    }

    var langClass = "language-" + lang;
    return `<pre class="${langClass}"><code class="${langClass}">${code}</code></pre>`;
  };

  marked.setOptions({
    renderer,
    highlight: function(code, lang) {
      try {
        return prismjs.highlight(code, prismjs.languages[lang], lang);
      } catch {
        return code;
      }
    }
  });

</script>

<style>

</style>

<main>
  <h1>
    <a href="/">{siteName}</a>
    <span>by Jason Torres</span>
  </h1>

  {#each posts as { title, body, slug, _publishedAt }, i}
    <section>
      <a hrel="prefetch" href="post/{slug}">
        <h2>{title}</h2>
      </a>
      <p>
        {@html marked(body)}
      </p>
      <p>Posted: {formatDate(new Date(_publishedAt))}</p>
    </section>
    <hr />
  {:else}
    <section>
      <center>Loading posts</center>
    </section>
  {/each}

</main>

<footer>
  &copy; Jason Torres of
  <a href="https://www.mashupgarage.com">Mashup Garage</a>
  .
  <br />
  This site is built on Svelte, NewCSS, and DatoCMS. Source code is available at
  <a href="https://github.com/jasontorres/til">Github.</a>
</footer>
