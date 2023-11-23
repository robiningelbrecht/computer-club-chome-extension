const fetchJson = async (url) => {
    const response = await fetch(url, {
        method: "GET",
        cache: "no-cache",
    });

    return await response.json();
};

const fetchRss = async (url) => {
    const response = await fetch(url, {
        method: "GET",
        cache: "no-cache",
    });

    return new window.DOMParser().parseFromString(await response.text(), "text/xml");
};

const formatDate = (date) => {
    return date.toLocaleDateString("nl-BE", { month: 'short', day: '2-digit' });
};

const getForumCategories = async () => {
    const json = await fetchJson('https://computerclub.forum/categories.json');
    const categories = [];

    json.category_list.categories.forEach(category => {
        categories[category.id] = category;
    });

    return categories;
};

const buildUserList = (unformattedUserList)=>{
    const users = [];

    unformattedUserList.forEach(user => {
        users[user.id] = user;
    });

    return users;
};

const buildUserAvatarUrlFromTemplate = (template)=> {
    return 'https://computerclub.forum'+template.replace('{size}', 64);
};

getForumCategories().then(async categories => {
    const latestTopics = await fetchJson('https://computerclub.forum/latest.json');
    const users = buildUserList(latestTopics.users);

    const $rootEl= document.querySelector('[data-uses-template="forum-topic"]');
    const template = $rootEl.querySelector("template#forum-topic");
    const templatePoster = $rootEl.querySelector("template#forum-topic--poster");
    $rootEl.innerHTML = '';

    latestTopics.topic_list.topics.forEach(topic => {
        const $topic = template.content.cloneNode(true);
        const $inner = $topic.querySelector('li');
        const category = categories[topic.category_id];
        const posters = topic.posters;
        const originalPoster = users[posters.shift().user_id];

        const otherPosters = posters.map((poster)=> {
            const user = users[poster.user_id];
            const $poster = templatePoster.content.cloneNode(true);
            return $poster.getRootNode().querySelector('img').outerHTML.replace('{{ posterAvatar }}', buildUserAvatarUrlFromTemplate(user.avatar_template));
        });

        $inner.innerHTML = $inner.innerHTML
            .replace("{{ title }}", topic.title)
            .replace('{{ createdAt }}', formatDate(new Date(topic.created_at)))
            .replace('{{ link }}', 'https://computerclub.forum/t/' + topic.slug)
            .replace('{{ commentCount }}', topic.posts_count - 1)
            .replace('{{ categoryName }}', category.name)
            .replace('{{ categoryColor }}', category.color)
            .replace('{{ originalPoster }}', originalPoster.username)
            .replace('{{ originalPosterAvatar }}', buildUserAvatarUrlFromTemplate(originalPoster.avatar_template))
            .replace('{{ posters }}', otherPosters.join(' '));
        $rootEl.appendChild($topic);
    });
});

fetchRss('https://computerclub.online/afleveringen/?format=rss').then(rss => {
    const $rootEl= document.querySelector('[data-uses-template="podcast-episode"]');
    const template = $rootEl.querySelector("template");
    $rootEl.innerHTML = '';

    rss.querySelectorAll("item").forEach(el => {
        const title = el.querySelector("title").textContent;
        const link = el.querySelector("link").textContent;
        const description = el.querySelector("description").textContent;
        const pubDate = new Date(el.querySelector("pubDate").textContent);
        const image = el.querySelector("content").getAttribute('url');

        const $episode = template.content.cloneNode(true);
        const $inner = $episode.querySelector('li');
        $inner.innerHTML = $inner.innerHTML
            .replace("{{ title }}", title)
            .replace('{{ link }}', link)
            .replace('{{ description }}', description)
            .replace('{{ date }}', formatDate(pubDate))
            .replace('{{ image }}', image);
        $rootEl.appendChild($episode);
    });
});

fetchRss('https://computerclub.mailcoach.app/feed/ad8001d0-bb6b-48d6-ba7d-eecbff10e010').then(rss => {
    const $rootEl= document.querySelector('[data-uses-template="newsletter"]');
    const template = $rootEl.querySelector("template");
    $rootEl.innerHTML = '';

    rss.querySelectorAll("entry").forEach(el => {
        const title = el.querySelector("title").textContent;
        const link = el.querySelector("link").getAttribute('href');
        const pubDate = new Date(el.querySelector("updated").textContent);

        const $newsletter = template.content.cloneNode(true);
        const $inner = $newsletter.querySelector('li');
        $inner.innerHTML = $inner.innerHTML
            .replace("{{ title }}", title)
            .replace('{{ link }}', link)
            .replace('{{ date }}', formatDate(pubDate));
        $rootEl.appendChild($newsletter);
    });
});
