// Use strict mode to catch common coding mistakes
'use strict';

// Define a data structure for posts
const postsData = {
    allPosts: [],
    filteredPosts: [],
    addPost: function(post) {
        this.allPosts.push(post);
    },
    removePost: function(index) {
        this.allPosts.splice(index, 1);
    },
    getPosts: function() {
        return this.filteredPosts.length > 0 ? this.filteredPosts : this.allPosts;
    }
};

let currentIndex = 0;

// Use async/await for asynchronous operations
async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const jsonData = await response.json();

        // Populate the data structure
        jsonData.forEach(post => postsData.addPost(post));

        updateTable();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    // Retrieve posts from the data structure
    const posts = postsData.getPosts();

    for (let i = currentIndex; i < currentIndex + 10 && i < posts.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${posts[i].id}</td>
            <td>${posts[i].title}</td>
            <td>${posts[i].body}</td>
            <td><button onclick="deleteItem(${i})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    }

    const showMoreBtn = document.getElementById('showMoreBtn');
    const showLessBtn = document.getElementById('showLessBtn');
    showMoreBtn.style.display = currentIndex + 10 < posts.length ? 'block' : 'none';
    showLessBtn.style.display = currentIndex > 0 ? 'block' : 'none';
}

function showMore() {
    currentIndex += 10;
    updateTable();
}

function showLess() {
    currentIndex -= 10;
    updateTable();
}

function deleteItem(index) {
    // Remove the post from the data structure
    postsData.removePost(index);
    updateTable();
}

function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    // Filter posts based on the search input
    postsData.filteredPosts = postsData.allPosts.filter(post =>
        post.title.toLowerCase().includes(searchInput) ||
        post.body.toLowerCase().includes(searchInput)
    );

    currentIndex = 0;
    updateTable();
}

// Use a defer attribute to ensure the script is executed after the document is parsed
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});
