# Tokopedia: Assessment For Software Engineer - Web Platform

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Requirements:
1. Build a web app using React.js (allowed to use Create React App, Create Next
App, or your own starter template) that has 3 pages, Pokemon List, Pokemon
Detail, and My Pokemon List. Your web app UI/UX should be mobile-first &
single page application (SPA) and follow requirements listed below.
2. You can use Rest-API from https://pokeapi.co/ as your data source. But using
GraphQL (graphql-pokeapi) is a big plus.
3. Pokemon List page; should show a list of Pokemons’ names and the owned
total. When a Pokemon is clicked, it should go to that Pokemon Detail page.
4. Pokemon Detail page; should show a picture of the Pokemon with its moves
and types (this information is from the API, feel free to add more information
on the Pokemon if you want to). The mandatory thing is that there should be
a button to catch the Pokemon, (success probability is 50%), if success then
the user can give the Pokemon a nickname and add that Pokemon to `My
Pokemon List’. You can catch the same pokemon multiple times but need to
give a different nickname for each pokemon.
5. My Pokemon List page; should show a list (like Pokemon List page, but with
each of their nicknames as well) of all Pokemons you have caught. It should
also be possible to remove/release a Pokemon from the list on this page. The
pokemons in this list persist even after a full page reload.
6. Make your web-app as performant as possible. You can use tools such as
Lighthouse to help you audit your web-app.
7. Kindly provide hosted project repository (can be GitHub, GitLab, or
Bitbucket) and deployed web-app (you can use free platform solutions such
as Vercel, Surge, Github Pages, Firebase, Netlify or other)