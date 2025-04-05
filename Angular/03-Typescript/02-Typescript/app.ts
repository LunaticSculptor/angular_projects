interface IPost {
    userId?: number;
    id?: number;
    title?: string;
    body?: string;
}

const url = "https://jsonplaceholder.typicode.com/posts";

let allPosts: IPost[];

const fetchData = () => {
fetch(url)
    .then((res) => {
    res.json().then((data: IPost[]) => {
        allPosts = data;
        updateAllPosts();
        printPostData();
    });
    })
    .catch((error) => console.error("Error fetching data:", error));
};

fetchData();

let updatedPosts;

const updateAllPosts = () => {
    allPosts.forEach((post: IPost) => {
        delete post.userId;
        delete post.body;
    });
};

const printPostData = () => {
    console.log(allPosts);
};

export {};