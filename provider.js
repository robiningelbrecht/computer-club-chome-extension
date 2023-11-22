const response = await fetch('https://computerclub.forum/latest.json', {
    method: "GET",
    cache: "no-cache",
});
const json = await response.json();

// https://computerclub.mailcoach.app/feed/ad8001d0-bb6b-48d6-ba7d-eecbff10e010

const rssResponse = await fetch('https://computerclub.online/afleveringen/?format=rss', {
    method: "GET",
    cache: "no-cache",
});
const rss = new window.DOMParser().parseFromString(await rssResponse.text(), "text/xml");
rss.querySelectorAll("item").forEach(el => {
    const title = el.querySelector("title").innerHTML;
    const link = el.querySelector("link").innerHTML;
    const description = el.querySelector("description").innerHTML;
    const pubDate = el.querySelector("pubDate").innerHTML;
    const image = el.querySelector("content").getAttribute('url');
});