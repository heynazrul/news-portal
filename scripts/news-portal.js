const fetchCategories = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category));
};

const displayCategories = (data) => {
  // capture categories container to append all the categories links
  const categoriesContainer = document.getElementById('categories-container');
  data.forEach((category) => {
    categoriesContainer.innerHTML += `
        <a class="nav-link" href="#" onclick="fetchCategoryNews('${category.category_id}','${category.category_name}')">
        ${category.category_name}</a>
    `;
  });
};

// fetch all newses available in particular category
const fetchCategoryNews = (category_id, category_name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllNews(data.data, category_name));
};

const displayAllNews = (data, category_name) => {
  const newsCount = document.getElementById('news-count');
  const categoryName = document.getElementById('category-name');
  newsCount.innerText = data.length;
  categoryName.innerText = category_name;
  const newsContainer = document.getElementById('all-news');
  newsContainer.innerHTML = '';
  data.forEach((singleNews) => {
    const { image_url, details, author, total_view } = singleNews;

    newsContainer.innerHTML += `
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${image_url}" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8 d-flex flex-column">
          <div class="card-body">
            <h5 class="card-title">${singleNews.title}</h5>
            <p class="card-text">
              ${details.slice(0, 300)}...
            </p>
          </div>
          <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <img src=${author.img} class="img-fluid rounded-circle" alt="..." height="40" width="40" />
              <div>
                <p class="p-0 m-0">${author.name}</p>
                <p class="p-0 m-0">${author.published_date}</p>
              </div>
            </div>  
            <div class="d-flex align-items-center gap-2">
                <i class="fas fa-eye"></i>
                <p class="p-0 m-0">${total_view}</p>
            </div>
            <div>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <div>
                <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  });
};
