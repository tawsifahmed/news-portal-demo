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
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('a');
        categoryDiv.classList.add('d-inline');
        categoryDiv.innerHTML = `
        <button onclick="loadNews('${category.category_id}')" class="justify-content-center p-3 btn btn-link">${category.category_name}</button >
            `;
        categoriesContainer.appendChild(categoryDiv);

    })
}

const loadNews = id => {
    toggleSpinner(true);
    const url2 = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url2)
        .then(res2 => res2.json())
        .then(data2 => displayNews(data2.data))
        .catch(error => console.log(error))

}

const displayNews = newss => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const newssArray = Object.keys(newss);

    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = `
    <div class="container">
       <div class="alert alert-light w-50 shadow-sm" role="alert">
        ${newssArray.length} Search Result Found
       </div> 
       <p class="fs-6 mb-4">Sort By: <span class="bg-white rounded shadow-none mx-3 p-2">Highest</span></p>
    </div>
    `;
    toggleSpinner(false);

    newss.sort((a, b) => {
        return b.total_view - a.total_view
    });

    newss.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
    <div class="card mb-3 shadow-sm border border-white">
    <div class="row g-0 align-items-center">
        <div class="col-md-4">
            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text mb-4">${news.details.slice(0, 200)}...</p>
                <div class"d-flex flex-row">

                <div class="d-flex flex-row mt-1 justify-content-around">
                    <div class="p-2">
                        <div class=d-inline>
                            <img class="d-inline img-fluid rounded" width="35" height="35" src="${news.author.img}">
                                <p class="d-inline px-2">${news.author.name ? news.author.name : 'No Author Found'}</p>
                        </div>
                    </div>
                    <div class="p-2 pt-3"><p><small class="text-muted">Total Views: ${news.total_view ? news.total_view : 'No views'}</small></p></div>
                    <div class="p-2">
                        <button onclick="loadNewsDetails('${news._id}')" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newsDetailModal">
                            Load Details
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
  </div >
</div >
    `;
        newsContainer.appendChild(newsDiv);
    })

}

const loadNewsDetails = id2 => {
    const url3 = `https://openapi.programming-hero.com/api/news/${id2}`;
    fetch(url3)
        .then(res3 => res3.json())
        .then(data3 => displayNewsDetails(data3.data))
        .catch(error => console.log(error))
}

const displayNewsDetails = newsInModals => {
    const modalTitle = document.getElementById('newsDetailModalLabel');
    const modalDetails = document.getElementById('modalDetail');
    newsInModals.forEach(newsInModal => {
        modalTitle.innerText = newsInModal.title;
        modalDetails.innerText = newsInModal.details;
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

loadCategoryFetch();

