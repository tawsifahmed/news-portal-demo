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

// const newsDetailsFetch = () => {
//     const url1 = `https://openapi.programming-hero.com/api/news/category/01`;
//     fetch(url1)
//         .then(res1 => res1.json())
//         .then(data1 => displayNews(data1.data))
//         .catch(error => console.log(error))
// }

const displayCategories = categories => {
    // console.log(categories);
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('a');
        categoryDiv.classList.add('d-inline');
        // console.log(category);
        categoryDiv.innerHTML = `
        
        <button onclick="loadNews('${category.category_id}')" class="justify-content-center p-3 btn btn-link">${category.category_name}</button >
            `
            // toggleSpinner(true)
            ;

        // start loader

        categoriesContainer.appendChild(categoryDiv);

    })
}


const loadNews = id => {
    toggleSpinner(true);
    const url2 = `https://openapi.programming-hero.com/api/news/category/${id}`;
    console.log(url2);
    fetch(url2)
        .then(res2 => res2.json())
        .then(data2 => displayNews(data2.data))
        .catch(error => console.log(error))

}

const displayNews = newss => {
    console.log(newss);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''
    newss.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${news.image_url}" class="img-fluid rounded-start w-100 h-100" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text">${news.details}</p>
        <img src="">
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
        `;
        newsContainer.appendChild(newsDiv);
        // stop loader
        toggleSpinner(false);
    })
}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
// loadNews();

loadCategoryFetch();

newsDetailsFetch();