<script>
    import Card from './Card.svelte';
    import Navi from './Navi.svelte';
	export let notes;
    console.log(notes.data)
    const genArticleLink = projectFolder => `/${projectFolder}/`;
</script>

<style>
.constainer {
    background-color: #dae4e9;
}
</style>

<div>
    <Navi></Navi>

    <div class="container my-12 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
            {#each notes.data as note}
                <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                    <Card
                    projectStatus={note.reviewCategory}
                    articleTitle={note.packageName}
                    articleLink={genArticleLink(note.projectFolder)}>
                    </Card>
                </div>
            {/each}
        </div>
    </div>

</div>