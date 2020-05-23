<script>
  import { onMount } from 'svelte';
  import marked from 'marked';
  export let name, token;

  let posts = [];

  onMount(async () => {
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: "{ allPosts { title body _publishedAt } }",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        posts = res.data.allPosts;
      })
  });

  function formatDate(date) {
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  }
</script>

<main>
  <h1>{name}
  
  <span>by Jason Torres</span>
  </h1>

  {#each posts as { title, body, _publishedAt }, i}
  <section>
    <h2>{title}</h2>
    <p>{@html marked(body)}</p>
    <p>Posted: {formatDate(new Date(_publishedAt))}</p>
  </section>
  {:else}
  <section><center>Loading posts</center></section>
  {/each}
</main>

<footer>
&copy; Jason Torres of <a href='https://www.mashupgarage.com'>Mashup Garage</a>. 
<br/>
This site is built on Svelte, NewCSS, and DatoCMS. Source code is available at <a href="https://github.com/jasontorres/til">Github.</a>
</footer>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    font-size: 16px;
  }

  section {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8em;
    color: #1d1d1dd6;
  }

  section > p {
    text-align: justify;
  }

  h1 {
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    color: black;
    margin-bottom: 16px;
  }

  h1 > span {
    margin-top: 8px;
    font-size: 16px;
    display: block;
  }

  h2 {
    font-weight: 100;
    max-width: 90%;
    line-height: 1.4em;
    margin: 0 auto;
    margin-bottom: 16px;
  }

  footer {
    margin: 48px auto;
    text-align: center;
    color: #515151;
    font-size: 14px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
