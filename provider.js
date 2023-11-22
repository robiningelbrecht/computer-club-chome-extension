const response = await fetch('https://computerclub.forum/latest.json', {
    method: "GET",
    cache: "no-cache",
});
const json = await response.json();

// https://computerclub.mailcoach.app/feed/ad8001d0-bb6b-48d6-ba7d-eecbff10e010

const response2 = await fetch('https://computerclub.online/afleveringen/?format=rss', {
    method: "GET",
    cache: "no-cache",
});
const rss = new window.DOMParser().parseFromString(await response2.text(), "text/xml");
rss.querySelectorAll("item").forEach(el => {
    const title = el.querySelector("title").innerHTML;
    const url = el.querySelector("link").innerHTML;
    const description = el.querySelector("description").innerHTML;
    const pubDate = el.querySelector("pubDate").innerHTML;
});