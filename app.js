document.getElementById('blog-section').addEventListener('click', function () {
    window.location.href = 'faq.html';
});

document.getElementById('news-section').addEventListener('click', function () {
    window.location.href = 'index.html';
});


const loadCategoryFetch = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}

const displayCategories = categories => {
    console.log(categories);
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('a');
        categoryDiv.classList.add('d-inline');

        categoryDiv.innerHTML = `
        
        <span class="justify-content-center p-4">${category.category_name}</span >
            `;
        categoriesContainer.appendChild(categoryDiv);
    })
}

loadCategoryFetch();