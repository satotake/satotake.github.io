<script>
  const rand = parseInt(Math.random() * 10);
  export let articleImage = 'https://picsum.photos/600/400/?random' + rand;
  export let articleTitle = 'Article Title';
  export let authorName = 'Anonymous';
  export let authorImage = 'https://picsum.photos/32/32/?random' + rand;
  export let date = 1571058774669; // first published date;
  export let articleLink = '#';
  export let projectStatus = 'production';
  $: formattedDate = new Date(date).toLocaleDateString();

  const projectStatusBaseClass = `
  block rounded-full text-xs font-light px-3 py-2 leading-none flex items-center text-white
  `;
  const statusColor = {
    prototypes: 'orange',
    production: 'green',
  };
  $: color = statusColor[projectStatus] || 'transparent';
  $: projectStatusClass = `${projectStatusBaseClass} bg-${color}-300`;
</script>

<article class="overflow-hidden rounded-lg shadow-lg">

    <a href={articleLink}>
        <img alt="Placeholder" class="block h-auto w-full" src={articleImage}>
    </a>

    <header class="flex items-center justify-between leading-tight p-2 md:p-4">
        <h1 class="text-lg">
            <a class="no-underline hover:underline text-black" href={articleLink}>
                {articleTitle}
            </a>
        </h1>
        <p class="text-grey-darker text-sm">
            {formattedDate}
        </p>
    </header>

    <footer class="flex items-center justify-between leading-none p-2 md:p-4">
        <a class="flex items-center no-underline hover:underline text-black" href={articleLink}>
            <img alt="Placeholder" class="block rounded-full" src={authorImage}>
            <p class="ml-2 text-sm">
                {authorName}
            </p>
        </a>

        <a class="no-underline text-grey-darker hover:text-red-dark" href={articleLink}>
        </a>

        <div class="px+6 mt-6">
            <span class={projectStatusClass}>
              {projectStatus.toUpperCase()}
            </span>
        </div>
    </footer>


</article>