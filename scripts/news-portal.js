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
        <a class="nav-link" href="#" onclick="fetchCategoryNews('${category.category_id}','${category.category_name}')">${category.category_name}</a>
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
  console.log(data);

  const newsCount = document.getElementById('news-count');
  const categoryName = document.getElementById('category-name');
  newsCount.innerText = data.length;
  categoryName.innerText = category_name;
};
