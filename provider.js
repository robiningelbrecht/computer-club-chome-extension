const response = await fetch('https://computerclub.forum/latest.json', {
    method: "GET",
    cache: "no-cache",
});
const json = await response.json();



const response2 = await fetch('https://feeds.soundcloud.com/users/soundcloud:users:473486739/sounds.rss', {
    method: "GET",
    cache: "no-cache",
    headers: {
        "Content-Type": "application/json",
    },
});
const rss = new window.DOMParser().parseFromString(await response2.text(), "text/xml");
rss.querySelectorAll("item").forEach(el => {
    const title = el.querySelector("title").innerHTML;
    const url = el.querySelector("link").innerHTML;
    const description = el.querySelector("description").innerHTML;
    const pubDate = el.querySelector("pubDate").innerHTML;
    const duration = el.querySelector("duration").innerHTML;
});