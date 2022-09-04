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
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''
    newss.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${news.image_url}" class="img-fluid rounded-start w400 h-400" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text">${news.details}</p>
        <div class"d-flex flex-row">
          
          <div>
          
          </div>
        
        <div class="d-flex flex-row mb-3 justify-content-around">
          <div class="p-2">
          <div class=d-inline>
           <img class="d-inline img-fluid rounded" width="50" height="50" src="${news.author.img}">
           <p class="d-inline px-2">${news.author.name ? news.author.name : 'No Author'}</p>
          </div>
          </div>
          <div class="p-2 pt-3"><p><small class="text-muted">Total Views: ${news.total_view}</small></p></div>
          <div class="p-2">
          <button onclick="loadNewsDetails('${news._id}')" type="button" class="btn btn-primary pt-3" data-bs-toggle="modal" data-bs-target="#newsDetailModal">
                Load Details
            </button>
          </div>
        </div>
        
        </div>
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

const loadNewsDetails = id2 => {
    const url3 = `https://openapi.programming-hero.com/api/news/${id2}`;
    fetch(url3)
        .then(res3 => res3.json())
        .then(data3 => displayNewsDetails(data3.data))
        .catch(error => console.log(error))
}

const displayNewsDetails = newsInModals => {
    console.log(newsInModals);
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
// loadNews();

loadCategoryFetch();

