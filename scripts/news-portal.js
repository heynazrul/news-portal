let fetchData = [];
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
    .then((data) => {
      fetchData = data.data;
      displayAllNews(data.data, category_name);
    });
};

const displayAllNews = (data, category_name) => {
  const newsCount = document.getElementById('news-count');
  const categoryName = document.getElementById('category-name');
  newsCount.innerText = data.length;
  categoryName.innerText = category_name;
  const newsContainer = document.getElementById('all-news');
  newsContainer.innerHTML = '';
  data.forEach((singleNews) => {
    const { _id, title, image_url, details, author, total_view, others_info } = singleNews;

    newsContainer.innerHTML += `
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${image_url}" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8 d-flex flex-column">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <span class="badge text-bg-warning">${others_info.is_trending ? 'Trending' : ''}</span>
            <p class="card-text">
              ${details.slice(0, 300)}...
            </p>
          </div>
          <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <img src=${author.img} class="img-fluid rounded-circle" alt="..." height="40" width="40" />
              <div>
                <p class="p-0 m-0">${author.name ? author.name : 'Not available'}</p>
                <p class="p-0 m-0">${moment(author.published_date).format('MMMM d, YYYY')}</p>
              </div>
            </div>  
            <div class="d-flex align-items-center gap-2">
                <i class="fas fa-eye"></i>
                <p class="p-0 m-0">${total_view ? total_view : 0}</p>
            </div>
            <div>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <div>
              <button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#newsDetails"
              onclick="fetchNewsDetails('${_id}')">
              <i class="fas fa-arrow-right" ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  });
};

// fetch news details
const fetchNewsDetails = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showNewsDetails(data.data[0]));
};

const showNewsDetails = (newsDetail) => {
  const { _id, title, image_url, details, author, total_view } = newsDetail;
  const modalTitle = document.getElementById('newsDetailsLabel');
  const modalBody = document.getElementById('modal-body');
  modalTitle.innerText = title;
  modalBody.innerHTML = `
  <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-12">
          <img src="${image_url}" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-12 d-flex flex-column">
          <div class="card-body">
            <p class="card-text">
              ${details}
            </p>
          </div>
          <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <img src=${author.img} class="img-fluid rounded-circle" alt="..." height="40" width="40" />
              <div>
                <p class="p-0 m-0">${author.name}</p>
                <p class="p-0 m-0">${moment(author.published_date).format('MMMM d, YYYY')}</p>
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
          </div>
        </div>
      </div>
    </div>
  `;
};

const showTrending = () => {
  const trendingNews = fetchData.filter((singleData) => singleData.others_info.is_trending === true);
  const category_name = document.getElementById('category-name').innerText;
  displayAllNews(trendingNews, category_name);
};

const showTodaysPick = () => {
  const todaysPick = fetchData.filter((singleData) => singleData.others_info.is_todays_pick === true);
  const category_name = document.getElementById('category-name').innerText;
  displayAllNews(todaysPick, category_name);
};
